const express = require('express');
const router = express.Router()

const controllers = require('../controllers/userControllers');

/* ===={ Start Render Pages }==== */
router.get("/add", controllers.newUser)

/* ===={ Start Post Request }==== */
router.post("/add", controllers.addNewUser)

/* ===={ Start Exports  }==== */
module.exports = router;