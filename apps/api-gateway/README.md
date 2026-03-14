# API Gateway

Stateless HTTP gateway that proxies requests to backend services.

## Routes

- `GET /health` returns gateway health metadata.
- `/*` routes are proxied to services:
  - `/auth/*` -> `AUTH_SERVICE_URL` (default: `http://localhost:3000`)
  - `/payment/*` -> `PAYMENT_SERVICE_URL` (default: `http://localhost:3002`)

## Environment

```bash
GATEWAY_PORT=3001
AUTH_SERVICE_URL=http://localhost:3000
PAYMENT_SERVICE_URL=http://localhost:3002
PROXY_LOG_LEVEL=warn
```

## Commands

```bash
npm run dev --workspace @bm/api-gateway
npm run build --workspace @bm/api-gateway
npm run start --workspace @bm/api-gateway
```
