// Route definitions. Each handler stays thin: it calls the services and
// decides what to render, but never talks to Axios directly.

const express = require('express');
const router = express.Router();

const fipeService = require('../services/fipeService');
const imageService = require('../services/imageService');

// Home page: shows the search form, starting with the brand dropdown
// already populated. Models and years are loaded afterwards via AJAX,
// since each one depends on the previous choice.
router.get('/', async (req, res, next) => {
  try {
    const brands = await fipeService.getBrands();
    res.render('index', { brands, error: null });
  } catch (err) {
    console.error('Failed to load brands from FIPE API:', err.message);
    res.render('index', {
      brands: [],
      error: 'Não foi possível carregar a lista de marcas agora. Tente recarregar a página.',
    });
  }
});

// AJAX endpoint used by the front-end to populate the "modelo" dropdown
// after the user picks a brand.
router.get('/api/models/:brandId', async (req, res) => {
  try {
    const models = await fipeService.getModels(req.params.brandId);
    res.json(models);
  } catch (err) {
    console.error('Failed to load models from FIPE API:', err.message);
    res.status(502).json({ error: 'Não foi possível carregar os modelos.' });
  }
});

// AJAX endpoint used by the front-end to populate the "ano" dropdown
// after the user picks a model.
router.get('/api/years/:brandId/:modelId', async (req, res) => {
  try {
    const years = await fipeService.getYears(req.params.brandId, req.params.modelId);
    res.json(years);
  } catch (err) {
    console.error('Failed to load years from FIPE API:', err.message);
    res.status(502).json({ error: 'Não foi possível carregar os anos.' });
  }
});

// Main feature: given brand + model + year, fetch the FIPE price and a
// matching image, then render the result page. The two lookups run in
// parallel and are handled independently, so a failure in one does not
// take down the other.
router.post('/pesquisa', async (req, res, next) => {
  const { brandId, modelId, yearId } = req.body;

  if (!brandId || !modelId || !yearId) {
    return res.status(400).render('error', {
      title: 'Dados incompletos',
      message: 'Selecione marca, modelo e ano antes de pesquisar.',
    });
  }

  try {
    const vehicle = await fipeService.getVehicleDetails(brandId, modelId, yearId);

    const searchQuery = `${vehicle.brand} ${vehicle.model}`;
    let image = null;

    try {
      image = await imageService.findCarImage(searchQuery);
    } catch (imageErr) {
      // An image lookup failure should not break the whole page: the
      // price is still valuable information on its own.
      console.error('Failed to load image from image search API:', imageErr.message);
    }

    res.render('result', { vehicle, image });
  } catch (err) {
    console.error('Failed to load vehicle details from FIPE API:', err.message);
    res.status(502).render('error', {
      title: 'Veículo não encontrado',
      message: 'Não foi possível encontrar esse veículo na tabela FIPE. Verifique a seleção e tente novamente.',
    });
  }
});

module.exports = router;
