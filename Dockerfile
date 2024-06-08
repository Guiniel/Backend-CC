# Etapa de construcción
FROM node:20.14.0-alpine3.19 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Etapa de producción
FROM node:20.14.0-alpine3.19

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo las dependencias de producción desde el builder
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copiar los archivos compilados desde el builder
COPY --from=builder /app/dist ./dist

# Copiar el archivo de configuración de NestJS
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
