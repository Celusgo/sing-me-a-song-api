import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// app.post("/recommendations", addMusic);
// app.post("/recommendations/:id/upvote", addScore);
// app.post("/recommendations/:id/downvote", dislikeSong)
// app.get("/recommendations/random", getRandomSong)

export default app;
