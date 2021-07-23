import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { generateNewSong } from "../factories/createSongBody";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach(async () => {
  await clearDatabase()
});

afterAll(async () => {
  await endConnection()
});

describe("POST /recommendations", () => {
  it('returns status 201 for valid params', async () => {
    const body = generateNewSong()

    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toEqual(201);
  });

  it('returns status 409 if song is already registered', async () => {
    const body = generateNewSong()

    await supertest(app).post("/recommendations").send(body);

    const response = await supertest(app).post("/recommendations").send(body);

    expect(response.status).toEqual(409);
  });

  it('returns status 400 if name is not a string', async () => {
    const body = generateNewSong()

    const response = await supertest(app).post("/recommendations").send({ ...body, name: 1 });

    expect(response.status).toEqual(400);
  });

  it('returns status 400 if youtubeLink is not a string', async () => {
    const body = generateNewSong()

    const response = await supertest(app).post("/recommendations").send({ ...body, youtubeLink: 1 });

    expect(response.status).toEqual(400);
  });

  it('returns status 400 if youtubeLink is a string but at the wrong format', async () => {
    const body = generateNewSong()

    const response = await supertest(app).post("/recommendations").send({ ...body, youtubeLink: "youtube" });

    expect(response.status).toEqual(400);
  });

  it('returns status 400 if name is empty', async () => {
    const body = generateNewSong()

    const response = await supertest(app).post("/recommendations").send({ ...body, name: "" });

    expect(response.status).toEqual(400);
  });

  it('returns status 400 if youtubeLink is empty', async () => {
    const body = generateNewSong()

    const response = await supertest(app).post("/recommendations").send({ ...body, youtubeLink: "" });

    expect(response.status).toEqual(400);
  });
});