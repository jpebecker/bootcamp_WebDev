// Client-side logic for the chained brand -> model -> year dropdowns.
// Each select is only enabled once its predecessor has a valid value,
// and options are fetched from our own backend (which proxies the FIPE API).

document.addEventListener('DOMContentLoaded', function () {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  const yearSelect = document.getElementById('year-select');
  const submitButton = document.getElementById('submit-button');

  function resetSelect(selectEl, placeholderText) {
    selectEl.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = placeholderText;
    selectEl.appendChild(placeholder);
    selectEl.disabled = true;
  }

  function fillSelect(selectEl, items, placeholderText) {
    resetSelect(selectEl, placeholderText);
    items.forEach(function (item) {
      const option = document.createElement('option');
      option.value = item.code;
      option.textContent = item.name;
      selectEl.appendChild(option);
    });
    selectEl.disabled = false;
  }

  brandSelect.addEventListener('change', async function () {
    resetSelect(modelSelect, 'Carregando modelos...');
    resetSelect(yearSelect, 'Escolha o modelo primeiro');
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/models/' + brandSelect.value);
      if (!response.ok) throw new Error('Falha ao carregar modelos');
      const models = await response.json();
      fillSelect(modelSelect, models, 'Selecione o modelo');
    } catch (err) {
      console.error(err);
      resetSelect(modelSelect, 'Erro ao carregar modelos');
    }
  });

  modelSelect.addEventListener('change', async function () {
    resetSelect(yearSelect, 'Carregando anos...');
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/years/' + brandSelect.value + '/' + modelSelect.value);
      if (!response.ok) throw new Error('Falha ao carregar anos');
      const years = await response.json();
      fillSelect(yearSelect, years, 'Selecione o ano');
    } catch (err) {
      console.error(err);
      resetSelect(yearSelect, 'Erro ao carregar anos');
    }
  });

  yearSelect.addEventListener('change', function () {
    submitButton.disabled = !yearSelect.value;
  });

  // The image search step can take up to ~30s (it scrapes a real search
  // results page), so let the user know instead of leaving the button
  // looking frozen while the page navigates.
  document.getElementById('search-form').addEventListener('submit', function () {
    submitButton.disabled = true;
    submitButton.textContent = 'Buscando preço e imagem... (pode levar até 30s)';
  });
});
