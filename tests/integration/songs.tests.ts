import supertest from "supertest";
import app from "../../src/app";
import { generateNewSong } from "../factories/createSongBody";
import { createSong } from "../factories/insertSong";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach (async() => {
    await clearDatabase()
  });
  
  afterAll(async() => {
    await endConnection()
  });

 