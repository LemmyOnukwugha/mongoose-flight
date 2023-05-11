const Flight = require("../models/flight.js");
const Ticket = require("../models/ticket");

function index(req, res) {
  Flight.find({}, function (err, flights) {
    if (err) return res.send(err.message);
    res.render("flights/index.ejs", { flights });
  }).sort("departs");
}

function newFlight(req, res) {
  var today = new Date();
  const departsDate = today.toISOString().slice(0, 16);
  console.log(departsDate);
  res.render("flights/new.ejs", { departsDate });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.send(err.message);
    res.redirect("/flights");
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if (err) return res.send(err.message);
    Ticket.find({ flight: flight.id }, function (err, tickets) {
      if (err) return res.send(err.message);
      res.render("flights/show.ejs", { flight, tickets });
    }).sort("-arrival"); //Why it does not sort
  });
}

function newDestination(req, res) {
  Flight.findById(req.params.id, function (err, flights) {
    if (err) return res.send(err.message);
    flights.destinations.push(req.body);
    flights.save();
    res.redirect(`/flights/${req.params.id}`);
  });
}

function deleteFlight(req, res) {
  const flightID = req.params.id.toString().trim();
  Flight.findByIdAndDelete({ _id: flightID }, function (err, flight) {
    res.redirect("/flights/");
  });
}

function deleteDestination(req, res) {
  const destinationIdID = req.params.id.toString().trim();
  Flight.destinations.findOneAndDelete(
    { _id: destinationIdID },
    function (err, flight) {
      res.redirect("/flights/");
    }
  );
}

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  newDestination,
  deleteDestination,
  deleteFlight,
};
