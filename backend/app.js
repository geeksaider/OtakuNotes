import express from "express";
import cors from "cors";
import { dbPool } from "./db_connector.js";

const app = express();

app.use(express.json(), cors());

const PORT = 3007;

app.post("/api/comments", (req, res) => {
  const { comment_text, anime_id, user_id } = req.body;
  if (!comment_text || !anime_id || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (comment_text.length <= 0 || comment_text.length > 500) {
    return res
      .status(400)
      .json({ error: "Comment text must be between 1 and 500 characters" });
  }
  if (anime_id <= 0 || user_id <= 0) {
    return res.status(400).json({ error: "Invalid anime or user ID" });
  }

  try {
    dbPool.query(
      "SELECT * FROM Comments WHERE anime_id = ? AND user_id = ?",
      [anime_id, user_id],
      (error, results) => {
        if (error) {
          console.error("Error checking comment existence:", error);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
          dbPool.query(
            "UPDATE Comments SET comment_text = ? WHERE anime_id = ? AND user_id = ?",
            [comment_text, anime_id, user_id],
            (updateError) => {
              if (updateError) {
                console.error("Error updating comment:", updateError);
                return res.status(500).json({ error: "Database error" });
              }
              res.status(200).json({ message: "Comment updated successfully" });
            }
          );
        } else {
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
        }
      }
    );
  } catch (error) {
    console.error("Error in POST /api/comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/comments", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
