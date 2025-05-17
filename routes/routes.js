const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.listUsers);
router.get("/createUser", controller.getCreateUserForm);
router.post("/createUser", controller.postCreateUser);
router.post("/:id/delete", controller.deleteUser);

module.exports = router;
