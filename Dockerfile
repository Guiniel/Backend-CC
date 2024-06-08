
FROM node:20.14.0-alpine3.19 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.14.0-alpine3.19
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json
EXPOSE 3001
CMD ["node", "dist/main"]
