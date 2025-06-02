const express = require("express");
const router = express.Router();

import { dbPool } from "../db_connector.js";
import checkReq from "../commentChecker.js";

router.post("/", (req, res) => {
  const { comment_text, anime_id, user_id } = req.body;
  checkReq(comment_text, anime_id, user_id);

  try {
    dbPool.query(
      "INSERT INTO Comments (comment_text, anime_id, user_id) VALUES (?, ?, ?)",
      [comment_text, anime_id, user_id],
      (insertError) => {
        if (insertError) {
          console.error("Error inserting comment:", insertError);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Comment added successfully" });
      }
    );
  } catch (error) {
    console.error("Error in POST /api/comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", (req, res) => {
  const anime_id = req.query.anime_id;
  const user_id = req.query.user_id;
  if (isNaN(anime_id) || isNaN(user_id) || anime_id <= 0 || user_id <= 0) {
    return res.status(400).json({ error: "Invalid anime or user ID" });
  }

  try {
    dbPool.query(
      "SELECT * FROM Comments WHERE anime_id = ? AND user_id = ?",
      [anime_id, user_id],
      (error, results) => {
        if (error) {
          console.error("Error fetching comments:", error);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error("Error in GET /api/comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/", (req, res) => {
  const { comment_text, anime_id, user_id } = req.body;
  checkReq(comment_text, anime_id, user_id);
  try {
    dbPool.query(
      "UPDATE Comments SET comment_text = ? , created_at = ? WHERE anime_id = ? AND user_id = ?",
      [comment_text, new Date(), anime_id, user_id],
      (error) => {
        if (error) {
          console.error("Error updating comment:", error);
          return res.status(500).json({ error: "Database error" });
        }
        return res
          .status(200)
          .json({ message: "Comment updated successfully" });
      }
    );
  } catch (error) {
    console.error("Error in PUT /api/comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/", (req, res) => {
  const { anime_id, user_id } = req.body;
  if (isNaN(anime_id) || isNaN(user_id) || anime_id <= 0 || user_id <= 0) {
    return res.status(400).json({ error: "Invalid anime or user ID" });
  }

  try {
    dbPool.query(
      "DELETE FROM Comments WHERE anime_id = ? AND user_id = ?",
      [anime_id, user_id],
      (error) => {
        if (error) {
          console.error("Error deleting comment:", error);
          return res.status(500).json({ error: "Database error" });
        }
        return res
          .status(200)
          .json({ message: "Comment deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error in DELETE /api/comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
