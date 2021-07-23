import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { createSong } from "../factories/insertSong";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach(async () => {
    await clearDatabase()
});

afterAll(async () => {
    await endConnection()
});

describe("GET /recommendations/random", () => {

    it('returns status 200 a random song is successfully given', async () => {
        await createSong();
        const response = await supertest(app).get("/recommendations/random");
        expect(response.status).toEqual(200);
    });

    it('returns status 404 if there are no songs on the list', async() => {
        const response = await supertest(app).get("/recommendations/random");
        expect(response.status).toEqual(404);
      });

  });