const getYieldForPlant = (input, environmentFactors) => {
  if (!environmentFactors) return input.yield;
  for (let [key, value] of Object.entries(environmentFactors)) {
    let factor = input.factors[key];
    let factorValue = factor[value];
    input.yield = (input.yield * (100 + factorValue)) / 100;
  }
  return input.yield;
};
const getYieldForCrop = (input, environmentFactors) => {
  if (!environmentFactors) return input.yield * input.numCrops;
  else return getYieldForPlant(input, environmentFactors) * input.numCrops;
};

// TODO - Include environmentFactors
const getTotalYield = ({ crops }) =>
  crops.map(crop => crop.crop.yield * crop.numCrops).reduce((a, c) => a + c);

const getCostsForCrop = input => input.crop.cost * input.crop.numCrops;

const getRevenueForCrop = (input, environmentFactors) => {
  return getYieldForCrop(input.crop, environmentFactors) * input.crop.salePrice;
};

const getProfitForCrop = (input, environmentFactors) => {
  if (!environmentFactors)
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
  else
    return (
      getYieldForCrop(input, environmentFactors) * getRevenueForCrop(input, environmentFactors) -
      getCostsForCrop(input)
    );
};

const getTotalProfit = ({ crops }) =>
  crops.map(crop => getProfitForCrop(crop)).reduce((a, c) => a + c);

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
