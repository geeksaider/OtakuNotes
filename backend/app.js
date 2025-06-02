import express from "express";
import cors from "cors";

const app = express();
import commentRouter from "./routes/commentRouter.js";
import scoreRouter from "./routes/scoreRouter.js";
import titleStateRouter from "./routes/scoreRouter.js";
import progressRouter from "./routes/progressRouter.js";

app.use(express.json(), cors());
app.use("/api/comments", commentRouter);
app.use("/api/scores", scoreRouter);
app.use("/api/title_status", titleStateRouter);
app.use("/api/progress", progressRouter);

const PORT = 3007;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
