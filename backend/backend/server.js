const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const swapiRoutes = require("./routes/swapiRoutes");

app.use("/api", swapiRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});