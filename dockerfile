FROM node:20.14.0-alpine3.19 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.14.0-alpine3.19 

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3001

ENV MONGODB_URI="mongodb://usuario:contraseña@servidor:puerto/base_de_datos"

CMD ["node", "dist/main.js"]



