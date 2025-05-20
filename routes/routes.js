const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.getUserList);

router.get("/signup", controller.getSignupForm);
router.post("/signup", controller.postSignup);

router.get("/login", controller.getLoginForm);
router.post("/login", controller.postLogin);

router.post("/:id/delete", controller.postDeleteUser);

module.exports = router;
