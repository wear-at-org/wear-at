import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ x: 1, y: "a" });
});

export default router;
