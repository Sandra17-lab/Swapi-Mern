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

# Pasar la URL como ARG para que React la incruste en el build
ARG REACT_APP_API_URL=https://swapi-mern-production.up.railway.app
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build del frontend
RUN npm run build --prefix frontend

EXPOSE 8080

CMD ["node", "backend/index.js"]
