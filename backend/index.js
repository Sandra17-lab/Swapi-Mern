require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Timeout para conexiones lentas
app.use((req, res, next) => {
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

app.use(cors());
app.use(express.json());

// Rutas API
const authRoutes = require('./routes/authRoutes');
const swapiRoutes = require('./routes/swapiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/swapi', swapiRoutes);

// Servir frontend en producción (sin app.get('*') que rompe Express 5)
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

// Conectar MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Error conectando MongoDB:', err.message));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
