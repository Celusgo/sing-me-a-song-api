import express from "express";
import cors from "cors";
import { addNewSong, randomSong, topSongs } from "./controllers/recommendationController";
import { upVote, downVote } from "./controllers/scoreController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addNewSong);
app.post("/recommendations/:id/upvote", upVote);
app.post("/recommendations/:id/downvote", downVote);
app.get("/recommendations/random", randomSong);
app.get("/recommendations/top/:amount", topSongs);

export default app;
