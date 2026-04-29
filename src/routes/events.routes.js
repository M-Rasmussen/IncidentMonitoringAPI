const express = require("express");

const eventsController = require("../controllers/events.controller");
const validate = require("../middleware/validate");
const { createEventSchema } = require("../validators/event.validator");

const router = express.Router();

router.post("/", validate(createEventSchema), eventsController.createEvent);
router.get("/", eventsController.getEvents);

module.exports = router;