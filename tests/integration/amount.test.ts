import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { createSong, updateValues } from "../factories/insertSong";
import { clearDatabase, endConnection } from "../utils/database";
import connection from '../../src/database';

beforeEach(async () => {
    await clearDatabase()
});

afterAll(async () => {
    await endConnection()
});

describe("GET /recommendations/top/:amount", () => {
  
    it('returns status 200 for valid params', async () => {
        await createSong();
        const response = await supertest(app).get("/recommendations/top/1");
        expect(response.status).toEqual(200);
    });
   
    it('returns the right amount of songs specified in the params', async () => {
        await createSong();
        await createSong();
        await createSong();
        await createSong();
        await createSong();
       
        //Inserted 5 songs in the database, but only 4 should be returned

        const response = await supertest(app).get("/recommendations/top/4");
        expect(response.body.length).toEqual(4);
    });

    it('returns the songs in descending order according to their scores', async () =>{
        await createSong();
        await createSong();
        await createSong();
        
        await updateValues();

        //The score of the second score should be higher than the score of the third song, which score should be higher than the score of the first song

        const response = await supertest(app).get("/recommendations/top/3");

        expect(response.body[0].score > response.body[1].score && response.body[1].score > response.body[2].score).toBe(true);

    });
  });