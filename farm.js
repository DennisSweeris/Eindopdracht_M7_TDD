const getYieldForPlant = (input, environmentFactors) => {
  if (!environmentFactors) return input.yield;
  for (let [key, value] of Object.entries(environmentFactors)) {
    let factor = input.factors[key];
    let factorValue = factor[value];
    input.yield = (input.yield * (100 + factorValue)) / 100;
  }
  return input.yield;
};
const getYieldForCrop = (input, environmentFactors) =>
  !environmentFactors
    ? input.yield * input.numCrops
    : getYieldForPlant(input, environmentFactors) * input.numCrops;

const getTotalYield = ({ crops }, environmentFactors) =>
  !environmentFactors
    ? crops.map(crop => crop.crop.yield * crop.numCrops).reduce((a, c) => a + c)
    : crops
        .map(crop => getYieldForCrop(crop, environmentFactors))
        .reduce((a, c) => a + c);

const getCostsForCrop = input => input.crop.cost * input.crop.numCrops;

const getRevenueForCrop = (input, environmentFactors) =>
  getYieldForCrop(input.crop, environmentFactors) * input.crop.salePrice;

const getProfitForCrop = (input, environmentFactors) =>
  !environmentFactors
    ? getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input)
    : getYieldForCrop(input, environmentFactors) *
        getRevenueForCrop(input, environmentFactors) -
      getCostsForCrop(input);

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
