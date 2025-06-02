import express from "express";
import cors from "cors";

const app = express();
const commentRouter = require("./routes/commentRouter.js");
const scoreRouter = require("./routes/scoreRouter.js");
const titleStateRouter = require("./routes/stateRouter.js");
const progressRouter = require("./routes/progressRouter.js");

app.use(express.json(), cors());
app.use("/api/comments", commentRouter);
app.use("/api/scores", scoreRouter);
app.use("/api/title_status", titleStateRouter);
app.use("/api/progress", progressRouter);

const PORT = 3007;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
