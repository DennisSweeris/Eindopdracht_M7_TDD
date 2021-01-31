const getYieldForPlant = (input, environmentFactors) => {
  if (!environmentFactors) return input.yield;
  for (let [key, value] of Object.entries(environmentFactors)) {
    let factor = input.factors[key];
    let factorValue = factor[value];
    input.yield = (input.yield * (100 + factorValue)) / 100;
  }
  return Math.floor(input.yield);
  // to avoid recieving decimal yields
  // only use fully grown plants
};

const getYieldForCrop = (input, environmentFactors) => {
  if (!environmentFactors) return input.yield * input.numCrops;
  for (let [key, value] of Object.entries(environmentFactors)) {
    let factor = input.factors[key];
    let factorValue = factor[value];
    input.yield = (input.yield * (100 + factorValue)) / 100;
  }
  return Math.floor(input.yield * input.numCrops);
};

const getTotalYield = ({ crops }) => {
  const totalYield = crops.map(crop => crop.crop.yield * crop.numCrops);
  if (totalYield === 0) return totalYield;
  else return totalYield.reduce((a, c) => a + c);
};

const getCostsForCrop = input => input.crop.cost * input.crop.numCrops;

// const getRevenueForCrop = input => input.crop.numCrops * input.crop.salePrice;
const getRevenueForCrop = (input, environmentFactors) => {
  if (!environmentFactors) {
    return input.crop.yield * input.crop.numCrops * input.crop.salePrice;
  } else
    return (
      getYieldForCrop(input, environmentFactors) *
      input.crop.numCrops *
      input.crop.salePrice
    );
};

const getProfitForCrop = (input, environmentFactors) => {
  if (!environmentFactors)
    return getRevenueForCrop(input) - getCostsForCrop(input);
  else
    return (
      getYieldForCrop(input, environmentFactors) * getRevenueForCrop(input) -
      getCostsForCrop(input)
    );
};

// todo
const getTotalProfit = ({ crops }) => {
  const getProfitForEachCrop = crops.map(crop => getProfitForCrop(crop));
  return getProfitForEachCrop.reduce((a, c) => a + c);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
