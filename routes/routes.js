const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.list);
router.get("/create", controller.create_get);
router.post("/create", controller.create_post);
router.post("/:id/delete", controller.delete);

module.exports = router;