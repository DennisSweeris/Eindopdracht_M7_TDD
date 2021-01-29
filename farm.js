// Get yield for plant with no environment factors
const getYieldForPlant = crop => crop.yield;

// Get yield for crop
const getYieldForCrop = input => getYieldForPlant(input.crop) * input.numCrops;

// Get total yield with multiple crops
const getTotalYield = ({ crops }) => {
  let total = 0;
  crops.forEach(crop => (total += getYieldForCrop(crop)));
  return total;
};

// Get cost per crop
const getCostsForCrop = input => input.crop.cost * input.crop.numCrops;

// Get revenue per crop
const getRevenueForCrop = input => input.crop.salePrice * input.crop.numCrops;

// Get profit per crop
const getProfitForCrop = input =>
  getRevenueForCrop(input) - getCostsForCrop(input);

// Get total profit with multiple crops
const getTotalProfit = ({ crops }) => {
  const getProfitForEachCrop = crops.map(crop => getProfitForCrop(crop));
  return getProfitForEachCrop.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
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
