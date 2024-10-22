const express = require("express");
const {registerUser, loginUser, chatAPI, chatwithoutlogin} = require("../controllers/usercontroller");
const validetoken = require("../middelware/validatetoken")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",  loginUser);

router.get("/chat",validetoken, chatAPI);
router.get("/chatswithoutlogin", chatwithoutlogin);

module.exports = router;
