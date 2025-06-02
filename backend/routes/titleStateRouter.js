import express from "express";
const router = express.Router();

import { dbPool } from "../db_connector.js";

router.get("/", (req, res) => {
  const { anime_id, user_id } = req.query;

  try {
    dbPool.query(
      "SELECT * FROM TitleState WHERE anime_id = ? AND user_id = ?",
      [anime_id, user_id],
      (error, results) => {
        if (error) {
          console.error("Error fetching title state:", error);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error("Error in GET /api/title_status:", error);
  }
});

router.post("/", (req, res) => {
  const { title_state, anime_id, user_id } = req.body;

  try {
    dbPool.query(
      "INSERT INTO TitleState (title_state, anime_id, user_id) VALUES (?, ?, ?)",
      [title_state, anime_id, user_id],
      (insertError) => {
        if (insertError) {
          console.error("Error inserting title state:", insertError);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Title state added successfully" });
      }
    );
  } catch (error) {
    console.error("Error in POST /api/title_status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/", (req, res) => {
  const { title_state, anime_id, user_id } = req.body;

  try {
    dbPool.query(
      "UPDATE TitleState SET title_state = ? WHERE anime_id = ? AND user_id = ?",
      [title_state, anime_id, user_id],
      (updateError) => {
        if (updateError) {
          console.error("Error updating title state:", updateError);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Title state updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error in PUT /api/title_status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
