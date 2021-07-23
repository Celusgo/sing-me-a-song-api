import express from "express";
import cors from "cors";
import { addNewSong } from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addNewSong);
// app.post("/recommendations/:id/upvote", addScore);
// app.post("/recommendations/:id/downvote", dislikeSong)
// app.get("/recommendations/random", getRandomSong)

export default app;
