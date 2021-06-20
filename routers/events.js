const express = require("express");

// let products = require("../data");
const {
  eventCreate,
  eventList,
  eventDelete,
  eventUpdate,
  eventDetails,
  eventSearch,
  eventFullyBooked,
} = require("../controllers/eventControllers");

const router = express.Router();
//another way to import
// const{eventControllers} = require("../controllers/eventControllers");
router.get("/fullyBookedEvent/", eventFullyBooked);

router.get("/", eventList);

//router.get("/:eventName", eventSearch);

router.get("/:eventId", eventDetails);

router.post("/", eventCreate);

router.delete("/", eventDelete);

router.put("/:eventId", eventUpdate);

module.exports = router;
