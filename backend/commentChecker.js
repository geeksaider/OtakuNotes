export default function (comment_text, anime_id, user_id) {
  if (!comment_text || !anime_id || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (comment_text.length > 500) {
    return res
      .status(400)
      .json({ error: "Comment text must be between 1 and 500 characters" });
  }
  if (anime_id <= 0 || user_id <= 0) {
    return res.status(400).json({ error: "Invalid anime or user ID" });
  }
}
