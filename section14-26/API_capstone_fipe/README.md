# ConsulteCarrosAi

Capstone project built with Express.js, Axios and EJS. The user picks a
brand, model and year of a car and the app returns its average market
price from the Brazilian FIPE table, plus a matching photo pulled from
Google Images.

## APIs used

- **FIPE API** (`https://fipe.parallelum.com.br/api/v2`) — free, no
  authentication required, used to look up brands, models, years and
  the final price.
- **SerpApi — Google Images engine** (`https://serpapi.com/search.json`)
  — used to find a real photo of the chosen car. Google does not offer
  a free official image search API anymore (the old Custom Search JSON
  API is closed to new signups and Bing's equivalent was retired in
  2025), so this project uses SerpApi, a third-party service that
  scrapes real Google Images results and returns them as JSON. It
  requires a personal API key; the free plan currently allows 250
  searches/month, which is enough for development and demos.

## Project structure

```
consultecarrosai/
├── server.js              # App entry point, middleware and error handling
├── routes/
│   └── index.js             # All route handlers
├── services/
│   ├── fipeService.js        # Axios calls to the FIPE API
│   └── imageService.js       # Axios calls to SerpApi (Google Images)
├── views/
│   ├── index.ejs               # Search form
│   ├── result.ejs               # Price + image result page
│   ├── error.ejs                 # Generic error page
│   └── partials/                   # Shared head/header/footer
└── public/
    ├── css/style.css               # Styling
    └── js/main.js                   # Chained brand -> model -> year dropdowns
```

## Setup

```bash
npm install
cp .env.example .env
```

Then sign up at [serpapi.com](https://serpapi.com), grab your API key
from the dashboard, and paste it into `.env` as `SERPAPI_KEY`.

```bash
npm start
```

The app runs at `http://localhost:3000` by default.

## How it works

1. `GET /` loads the list of brands from the FIPE API and renders the
   search form.
2. As the user picks a brand and then a model, the front-end calls two
   internal endpoints (`/api/models/:brandId` and
   `/api/years/:brandId/:modelId`) that proxy the FIPE API, so the
   dropdowns are always filled with valid options.
3. Submitting the form calls `POST /pesquisa`, which fetches the FIPE
   price and, separately, asks SerpApi for a Google Images result
   matching the brand and model. The two calls are independent: if the
   image search fails, the price is still shown, with a placeholder
   instead of a broken image.

## Notes on the FIPE response

The FIPE API's vehicle-details endpoint returns the vehicle's official
code under the field `codeFipe` (not `fipeCode`) — worth remembering if
you extend this project, since a mismatched field name renders as a
silently empty value in EJS rather than an error.

## Error handling

- Every external API call is wrapped in `try/catch`.
- FIPE failures render a friendly "vehicle not found" message.
- Image search failures (missing API key, quota exceeded, no results)
  never break the page — they just fall back to a placeholder.
- A global Express error handler and a 404 handler cover anything
  unexpected.

## Note on the image source

Unlike a stock-photo or open-license API, Google Images results are not
guaranteed to be freely reusable — they can belong to whoever published
them. The result page links back to the original source page (via the
`source`/`sourceUrl` fields returned by SerpApi) so the image's origin
is always visible, but this project uses the photos for illustrative,
non-commercial classroom purposes only.
