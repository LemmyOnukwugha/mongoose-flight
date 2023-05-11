const Flight = require("../models/flight.js");
const Ticket = require("../models/ticket");

function newTicket(req, res) {
  Flight.findById(req.params.id, function (err, flights) {
    console.log(req.params.id);
    if (err) return res.send(err.message);
    res.render("tickets/new.ejs", { flights });
  });
}

function create(req, res) {
  req.body.flight = req.params.id;
  Ticket.create(req.body, function (err, ticket) {
    res.redirect(`/flights/${req.params.id}`);
  });
}

module.exports = { new: newTicket, create };
