const express = require("express");
const router = express.Router();

const {
  getPeople,
  getPersonById,
} = require("../controllers/swapiController");

router.get("/people", getPeople);
router.get("/people/:id", getPersonById);

module.exports = router;