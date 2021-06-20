const express = require("express");
const db = require("./db/models");
const eventRoute = require("./routers/events");

const app = express();
app.use(express.json());

app.use("/events", eventRoute);

db.sequelize.sync();

app.listen(8000);
