FROM node:20-alpine

WORKDIR /app

# Instalar dependencias del frontend
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

# Instalar dependencias del backend
COPY backend/package*.json ./backend/
RUN npm install --prefix backend

# Copiar código fuente
COPY frontend ./frontend
COPY backend ./backend

# Build del frontend
RUN npm run build --prefix frontend

EXPOSE 5000

CMD ["node", "backend/index.js"]
