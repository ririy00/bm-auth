FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/auth-service/package.json ./apps/auth-service/package.json
COPY apps/api-gateway/package.json ./apps/api-gateway/package.json
COPY apps/payment-service/package.json ./apps/payment-service/package.json
COPY packages/auth-database/package.json ./packages/auth-database/package.json
COPY packages/payment-database/package.json ./packages/payment-database/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
COPY packages/utils/package.json ./packages/utils/package.json
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod", "--workspace", "@bm/auth-service"]
