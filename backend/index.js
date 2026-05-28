require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Asegurar que la carpeta data existe al arrancar
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 Carpeta data creada');
}

const app = express();

// Timeout para conexiones lentas
app.use((req, res, next) => {
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? true
    : 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Rutas API
const authRoutes = require('./routes/authRoutes');
const swapiRoutes = require('./routes/swapiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/swapi', swapiRoutes);

// Servir frontend en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    } else {
      next();
    }
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
