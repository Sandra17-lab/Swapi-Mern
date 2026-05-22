const axios = require("axios");

const BASE_URL = "https://www.swapi.tech/api";

const getPeople = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/people`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo personajes",
      error: error.message,
    });
  }
};

const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${BASE_URL}/people/${id}`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo personaje",
      error: error.message,
    });
  }
};

module.exports = {
  getPeople,
  getPersonById,
};