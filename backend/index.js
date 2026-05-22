const express = require('express');
const cors = require('cors');

// 1️⃣ Crear app PRIMERO
const app = express();

// 2️⃣ Middlewares
app.use(cors());
app.use(express.json());

// 3️⃣ Importar rutas
const swapiRoutes = require('./routes/swapiRoutes')

// 4️⃣ Usar rutas
app.use('/api/swapi', swapiRoutes);

// 5️⃣ Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// 6️⃣ Levantar servidor
app.listen(5000, () => {
  console.log('Servidor en http://localhost:5000');
});