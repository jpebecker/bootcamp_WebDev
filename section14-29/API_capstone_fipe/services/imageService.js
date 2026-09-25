// All communication with the image search API lives here.
//
// This uses SerpApi's Google Images engine, a third-party service that
// scrapes real Google Images results and returns them as JSON. It is not
// an official Google API (Google does not offer a free one anymore) and
// requires a personal API key with a limited free quota (250
// searches/month on the current free plan), configured via SERPAPI_KEY.

const axios = require('axios');

const BASE_URL = process.env.SERPAPI_BASE_URL || 'https://serpapi.com/search.json';
const API_KEY = process.env.SERPAPI_KEY;

const serpApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Searches Google Images (via SerpApi) for a photo matching the given
// car description (e.g. "Fiat Uno 2015") and returns a simplified object
// with just what the view needs, or null if nothing usable was found.
async function findCarImage(query) {
  if (!API_KEY) {
    console.error('SERPAPI_KEY is not set; skipping image search.');
    return null;
  }

  const response = await serpApiClient.get('', {
    params: {
      engine: 'google_images',
      q: query,
      api_key: API_KEY,
    },
  });

  if (response.data.error) {
    console.error('SerpApi returned an error:', response.data.error);
    return null;
  }

  const results = response.data.images_results || [];

  // Some results are missing a usable image or thumbnail; pick the
  // first fully usable one.
  const usable = results.find((item) => item.original && item.thumbnail);

  if (!usable) {
    return null;
  }

  return {
    url: usable.original,
    thumbnail: usable.thumbnail,
    title: usable.title || query,
    source: usable.source || null,
    sourceUrl: usable.link || usable.original,
  };
}

module.exports = {
  findCarImage,
};
