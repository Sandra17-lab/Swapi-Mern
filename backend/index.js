require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado 🚀"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
});