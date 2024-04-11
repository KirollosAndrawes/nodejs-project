const express = require('express');
const router = express.Router()

const controllers = require('../controllers/userControllers');

/* ===={ Start Render Pages }==== */

router.get("/", controllers.getAllData);

router.get("/edit/:id", controllers.editData)

router.get("/view/:id", controllers.showUser)

/* ===={ Start Post Request }==== */

router.post("/search", controllers.searchUser)

/* ===={ Start PUT Request  }==== */

router.put("/edit/:id", controllers.updateUserData);

/* ===={ Start delete Request  }==== */

router.delete('/edit/:id', controllers.deleteUserData);

/* ===={ Start Exports  }==== */
module.exports = router;