const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res) => {
  res.status(201).json({
    id: 1,
    ...req.body,
    createdAt: new Date().toISOString()
  });
});

module.exports = router;