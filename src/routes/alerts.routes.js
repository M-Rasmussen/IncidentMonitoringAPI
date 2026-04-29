const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([]);
});

router.patch("/:id/resolve", (req, res) => {
  res.json({
    id: Number(req.params.id),
    status: "resolved",
    resolvedAt: new Date().toISOString()
  });
});

module.exports = router;