# Backend Spine

Minimal Next.js 15 route-handler spine for the portfolio.

## Endpoints

- `GET /api/health`
- `POST /api/telemetry/ingest`
- `GET /api/bi/activation`
- `POST /api/bi/activation`
- `GET /api/content/flagship`

## Runtime Flags

Copy `.env.example` and configure only the features you actually have.

This spine starts in honest fallback modes until real telemetry persistence or BI credentials are provided.

## Notes

- Telemetry defaults to in-memory persistence.
- BI activation never exposes secrets to the client.
- Flagship content is served from a local canonical snapshot until a server-backed content source is introduced.
