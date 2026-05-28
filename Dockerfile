FROM node:20-alpine

WORKDIR /app

# Instalar dependencias del backend
COPY backend/package*.json ./backend/
RUN npm install --prefix backend

# Instalar dependencias del frontend
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

# Copiar código fuente completo
COPY backend ./backend
COPY frontend ./frontend

# Definir la URL de la API como variable de build para React
ENV REACT_APP_API_URL=https://swapi-mern-production.up.railway.app

# Build del frontend - React leerá REACT_APP_API_URL del ENV
RUN npm run build --prefix frontend

EXPOSE 8080

CMD ["node", "backend/index.js"]
