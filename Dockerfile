# Build aşaması
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Port'u dışarı aç
EXPOSE 3000

# Uygulamayı çalıştır
CMD ["npm", "run", "start:prod"] 