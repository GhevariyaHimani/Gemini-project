const express = require("express");
const validetoken = require("../middelware/validatetoken");
const {getallchat, getchat} = require("../controllers/chatcontroller");
const { route } = require("./userroute");
const router = express.Router();

router.use(validetoken);
router.route("/").get(getallchat)

router.route("/:id").get(getchat)

module.exports = router;