const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// Get yield for plant
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

// Get yield for crop
describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

// Get total yield
describe("getTotalYield", () => {
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
      { crop: corn, numCrops: 5 }, // 15
      { crop: pumpkin, numCrops: 2 }, // 8
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }]; // 0
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield with nothing", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: undefined || null || "" || false }];
    expect(getTotalYield({ crops })).toEqual(0);
  });
});

// Get costs per crop
describe("getCostsForCrop", () => {
  test("Get costs for a single crop", () => {
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

  test("Get costs for a 0 crops", () => {
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
});

// Get revenue per crop with no environment factors
describe("getRevenueForCrop", () => {
  test("Get revenue for a single crop, no factors", () => {
    const courgette = {
      name: "courgette",
      salePrice: 2,
      numCrops: 5,
    };
    const input = {
      crop: courgette,
    };
    expect(getRevenueForCrop(input)).toBe(10);
  });

  test("Get revenue for a single crop with amount 0, no factors", () => {
    const banana = {
      name: "banana",
      salePrice: 2,
      numCrops: 0,
    };
    const input = {
      crop: banana,
    };
    expect(getRevenueForCrop(input)).toBe(0);
  });
});

// Get profit per crop with no environment factors
describe("getProfitForCrop", () => {
  test("Get profit for a single crop, no factors", () => {
    const courgette = {
      name: "courgette",
      cost: 1,
      salePrice: 2,
      numCrops: 5,
    };
    const input = {
      crop: courgette,
    };
    expect(getProfitForCrop(input)).toBe(5);
  });

  test("Get profit for a ZERO crops, no factors", () => {
    const courgette = {
      name: "courgette",
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

// Get total profit multiple crops with no environment factors
describe("getTotalProfit", () => {
  test("Get profit for multiple crops, no factors", () => {
    const courgette = {
      name: "courgette",
      cost: 2,
      salePrice: 3,
      numCrops: 6,
    };
    const bananas = {
      name: "bananas",
      cost: 2,
      salePrice: 4,
      numCrops: 5,
    };
    const crops = [
      { crop: courgette }, // 6
      { crop: bananas }, // 10
    ];
    expect(getTotalProfit({ crops })).toBe(16);
  });
});
