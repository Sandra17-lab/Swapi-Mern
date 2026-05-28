FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
RUN npm install --prefix backend

COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

COPY backend ./backend
COPY frontend ./frontend

# Cache bust: 4
RUN echo "4" > /tmp/cachebust && npm run build --prefix frontend

EXPOSE 8080

CMD ["node", "backend/index.js"]
