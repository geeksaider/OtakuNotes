const express = require("express");
const router = express.Router();

import { dbPool } from "../db_connector.js";

router.get("/", (req, res) => {
  const { anime_id, user_id } = req.body;

  try {
    dbPool.query(
      "SELECT * FROM Progress WHERE anime_id = ? AND user_id = ?",
      [anime_id, user_id],
      (error, results) => {
        if (error) {
          console.error("Error fetching progress:", error);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error("Error in GET /api/progress:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", (req, res) => {
  const { progress, anime_id, user_id } = req.body;

  try {
    dbPool.query(
      "INSERT INTO Progress (progress, anime_id, user_id) VALUES (?, ?, ?)",
      [progress, anime_id, user_id],
      (insertError) => {
        if (insertError) {
          console.error("Error inserting progress:", insertError);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Progress added successfully" });
      }
    );
  } catch (error) {
    console.error("Error in POST /api/progress:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/", (req, res) => {
  const { progress, anime_id, user_id } = req.body;

  try {
    dbPool.query(
      "UPDATE Progress SET progress = ? WHERE anime_id = ? AND user_id = ?",
      [progress, anime_id, user_id],
      (updateError) => {
        if (updateError) {
          console.error("Error updating progress:", updateError);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Progress updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error in PUT /api/progress:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
