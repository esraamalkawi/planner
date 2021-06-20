const { Event, sequelize } = require("../db/models");
const Sequelize = require("sequelize");
const { Events } = require("pg");

exports.eventCreate = async (req, res) => {
  try {
    // const eventsArray = req.body.map(async (event) => {
    const event = await Event.bulkCreate(req.body);
    //   return event;
    // });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message || "server error" });
  }
};

exports.eventDelete = async (req, res) => {
  //  const {eventId}= req.params
  try {
    // const ids = req.query.ids.split(",");
    // ids.forEach(async (eventId) => {
    // let foundEvent = await Event.findByPk(eventId);

    await Event.destroy({ where: { id: req.query.ids.split(",") } });
    res.status(204).end();
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};
const Op = Sequelize.Op;
exports.eventList = async (req, res) => {
  try {
    let events;
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      events = await Event.findAll({
        attributes: ["id", "name", "image"],
        order: [["startDate", "DESC"]],
      });
    } else {
      events = await Event.findAll({
        attributes: ["id", "name", "image"],
        where: {
          startDate: {
            [Op.gte]: req.body,
          },
        },

        order: [["startDate", "DESC"]],
      });
    }

    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      await foundEvent.update(req.body);
      res.status(200).json(req.body);
    } else
      res.status(404).json({ message: " a event with this ID doesn't exist." });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};

exports.eventDetails = async (req, res) => {
  try {
    const foundEvent = await Event.findByPk(req.params.eventId);
    if (foundEvent) {
      res.status(200).json(foundEvent);
    } else
      res.status(404).json({ message: " a event with this ID doesn't exist." });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};

exports.eventFullyBooked = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        bookedSeats: {
          [Op.eq]: sequelize.col("numOfSeats"),
        },
      },
    });
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};
exports.searchEventList = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        name: {
          [Op.eq]: req.query.name,
        },
      },
    });
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};
exports.pagination = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const events = await Event.findAll({
      limit,
      offset,
    });
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message ? error.message : "server error" });
  }
};
