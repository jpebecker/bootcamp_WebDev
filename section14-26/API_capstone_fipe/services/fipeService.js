// All communication with the FIPE public API (fipe.parallelum.com.br) lives here.
// Keeping it isolated means routes never talk to Axios directly, and if the
// FIPE API ever changes, only this file needs to change.

const axios = require('axios');

const BASE_URL = process.env.FIPE_BASE_URL || 'https://fipe.parallelum.com.br/api/v2';
const VEHICLE_TYPE = 'cars'; // this project focuses on cars specifically

const fipeClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

// Returns the full list of car brands, e.g. [{ code: '21', name: 'Fiat' }, ...]
async function getBrands() {
  const response = await fipeClient.get(`/${VEHICLE_TYPE}/brands`);
  return response.data;
}

// Returns every model registered under a given brand id.
async function getModels(brandId) {
  const response = await fipeClient.get(`/${VEHICLE_TYPE}/brands/${brandId}/models`);
  return response.data;
}

// Returns the model years/fuel variants available for a given brand + model.
async function getYears(brandId, modelId) {
  const response = await fipeClient.get(
    `/${VEHICLE_TYPE}/brands/${brandId}/models/${modelId}/years`
  );
  return response.data;
}

// Returns the final FIPE record (price, reference month, fuel, etc.) for a
// fully specified brand + model + year.
async function getVehicleDetails(brandId, modelId, yearId) {
  const response = await fipeClient.get(
    `/${VEHICLE_TYPE}/brands/${brandId}/models/${modelId}/years/${yearId}`
  );
  return response.data;
}

module.exports = {
  getBrands,
  getModels,
  getYears,
  getVehicleDetails,
};
