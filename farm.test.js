const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm.js");

describe("Get yield for plant", () => {
  test("Get yield for plant, no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
    };
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant, environment factor - sun", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(24);
  });

  test("Get yield for plant, environment factors - sun and wind", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(9.6);
  });
});

describe("Get yield for crop", () => {
  test("Get yield for crop, no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      numCrops: 10,
    };
    expect(getYieldForCrop(corn)).toBe(30);
  });

  test("Get yield for crop, environment factors 0", () => {
    const corn = {
      name: "corn",
      yield: 30,
      numCrops: 10,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environmentFactors = {
      sun: "medium",
      wind: "low",
    };
    expect(getYieldForCrop(corn, environmentFactors)).toBe(300);
  });

  test("Get yield for crop, environment factors - sun and wind", () => {
    const corn = {
      name: "corn",
      yield: 30,
      numCrops: 10,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getYieldForCrop(corn, environmentFactors)).toBe(180);
  });
});

describe("Get total yield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with multiple crops - yield(0)", () => {
    const corn = {
      name: "corn",
      yield: 0,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 0,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(0);
  });

  // Doesn't work due to invalid environment factors
  test("Calculate total yield with multiple crops, environment factors - sun and wind", () => {
    const corn = {
      name: "corn",
      yield: 2,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 2,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    const crops = [
      { crop: corn, numCrops: 5 }, // 6
      { crop: pumpkin, numCrops: 2 }, // 2.4
    ];
    expect(getTotalYield({ crops }, environmentFactors)).toBe(8.4);
  });

  test("Calculate total yield for crop - 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield for crop - nothing defined", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: undefined || null || "" || false }];
    expect(getTotalYield({ crops })).toEqual(0);
  });
});

describe("Get costs per crop", () => {
  test("Get costs for crop - single", () => {
    const corn = {
      name: "corn",
      cost: 1,
      numCrops: 5,
    };
    const input = {
      crop: corn,
    };
    expect(getCostsForCrop(input)).toBe(5);
  });

  test("Get costs for crop - 0", () => {
    const corn = {
      name: "corn",
      cost: 1,
      numCrops: 0,
    };
    const input = {
      crop: corn,
    };
    expect(getCostsForCrop(input)).toBe(0);
  });

  test("Get costs for crop - NaN", () => {
    const corn = {
      name: "corn",
      cost: 1,
      numCrops: NaN,
    };
    const input = {
      crop: corn,
    };
    expect(getCostsForCrop(input)).toBe(NaN);
  });
});

describe("Get revenue per crop", () => {
  test("Get revenue for a single crop", () => {
    const courgette = {
      name: "courgette",
      yield: 2,
      salePrice: 2,
      numCrops: 5,
    };
    const input = {
      crop: courgette,
    };
    expect(getRevenueForCrop(input)).toBe(20);
  });

  test("Get revenue for a single crop - numCrops(0)", () => {
    const banana = {
      name: "banana",
      yield: 0,
      salePrice: 2,
      numCrops: 0,
    };
    const input = {
      crop: banana,
    };
    expect(getRevenueForCrop(input)).toBe(0);
  });

  test("Get revenue for a single crop - empty string", () => {
    const banana = {
      name: "banana",
      yield: 2,
      salePrice: 2,
      numCrops: "",
    };
    const input = {
      crop: banana,
    };
    expect(getRevenueForCrop(input)).toBe(0);
  });

  test("Get revenue for a single crop, environment factors - sun and wind", () => {
    const banana = {
      name: "banana",
      yield: 2,
      salePrice: 2,
      numCrops: 10,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };

    const input = {
      crop: banana,
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(24);
  });
});

describe("Get profit per crop", () => {
  test("Get profit for crop", () => {
    const courgette = {
      name: "courgette",
      yield: 3,
      cost: 1,
      salePrice: 2,
      numCrops: 5,
    };
    const input = {
      crop: courgette,
    };
    expect(getProfitForCrop(input)).toBe(25);
  });

  test("Get profit for ZERO crops", () => {
    const courgette = {
      name: "courgette",
      yield: 2,
      cost: 1,
      salePrice: 2,
      numCrops: 0,
    };
    const input = {
      crop: courgette,
    };
    expect(getProfitForCrop(input)).toBe(0);
  });
});

describe("Get total profit", () => {
  test("Get profit for multiple crops, no factors", () => {
    const courgette = {
      name: "courgette",
      yield: 2,
      cost: 2,
      salePrice: 3,
      numCrops: 6,
    };
    const bananas = {
      name: "bananas",
      yield: 2,
      cost: 2,
      salePrice: 4,
      numCrops: 5,
    };
    const crops = [{ crop: courgette }, { crop: bananas }];
    expect(getTotalProfit({ crops })).toBe(54);
  });

  test("Get profit for multiple crops, environment factors - sun and wind", () => {
    const courgette = {
      name: "courgette",
      yield: 2,
      cost: 2,
      salePrice: 3,
      numCrops: 6,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const bananas = {
      name: "bananas",
      yield: 2,
      cost: 2,
      salePrice: 4,
      numCrops: 5,
      factors: {
        sun: {
          low: -20,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      wind: "high",
    };
    const crops = [{ crop: courgette }, { crop: bananas }];
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(54);
  });
});
