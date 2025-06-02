const express = require("express");
const router = express.Router();

import { dbPool } from "../db_connector.js";

router.get("/", (req, res) => {
  const { anime_id, user_id } = req.query;

  dbPool.query(
    "SELECT * FROM Scores WHERE anime_id = ? AND user_id = ?",
    [anime_id, user_id],
    (error, results) => {
      if (error) {
        console.error("Error fetching scores:", error);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json(results);
    }
  );
});

router.post("/", (req, res) => {
  const { score, anime_id, user_id } = req.body;

  dbPool.query(
    "INSERT INTO Scores (score, anime_id, user_id) VALUES (?, ?, ?)",
    [score, anime_id, user_id],
    (insertError) => {
      if (insertError) {
        console.error("Error inserting score:", insertError);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Score added successfully" });
    }
  );
});

router.put("/", (req, res) => {
  const { score, anime_id, user_id } = req.body;

  try {
    dbPool.query(
      "UPDATE Scores SET score = ? WHERE anime_id = ? AND user_id = ?",
      [score, anime_id, user_id],
      (updateError) => {
        if (updateError) {
          console.error("Error updating score:", updateError);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Score updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error in PUT /api/scores:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
