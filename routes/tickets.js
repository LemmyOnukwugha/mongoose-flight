var express = require("express");
var router = express.Router();
const ticketCtrl = require("../controllers/tickets");

router.get("/new/:id", ticketCtrl.new);
router.post("/create/:id", ticketCtrl.create);

module.exports = router;
