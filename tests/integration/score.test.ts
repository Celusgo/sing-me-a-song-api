import '../../src/setup';
import supertest from "supertest";
import app from "../../src/app";
import { createSong } from "../factories/insertSong";
import { clearDatabase, endConnection } from "../utils/database";
import connection from '../../src/database';

beforeEach(async () => {
    await clearDatabase()
});

afterAll(async () => {
    await endConnection()
});

describe("POST /recommendations/:id/upvote", () => {
    it('returns 200 for valid params', async () => {

        let id = await createSong();
        
        const response = await supertest(app).post(`/recommendations/${id}/upvote`);
        
        expect(response.status).toEqual(200);
    });

    it('returns 400 if the type of params is not number', async () => {

        const response = await supertest(app).post(`/recommendations/stringparam/upvote`);
        
        expect(response.status).toEqual(400);
    });

    it('returns 400 if the song is not registered', async () => {

        let id = await createSong();
        
        const response = await supertest(app).post(`/recommendations/${id + 1}/upvote`);
        
        expect(response.status).toEqual(400);
    });

    it('returns 200 if the score is increased by one', async () => {

        let id = await createSong();
        
        const before = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);

        await supertest(app).post(`/recommendations/${id}/upvote`);

        const after = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
        
        expect(before.rows[0].score).toEqual(0);
        expect(after.rows[0].score).toEqual(1);
    });

});

describe("POST /recommendations/:id/downvote" ,() => {

    it('returns 200 for valid params', async () => {

        let id = await createSong();
        
        const response = await supertest(app).post(`/recommendations/${id}/downvote`);
        
        expect(response.status).toEqual(200);
    });

    it('returns 400 if the type of params is not number', async () => {

        const response = await supertest(app).post(`/recommendations/stringparam/downvote`);
        
        expect(response.status).toEqual(400);
    });

    it('returns 400 if the song is not registered', async () => {

        let id = await createSong();
        
        const response = await supertest(app).post(`/recommendations/${id + 1}/downvote`);
        
        expect(response.status).toEqual(400);
    });

    it('returns 200 if the score is decreased by one', async () => {

        let id = await createSong();
        
        const before = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);

        await supertest(app).post(`/recommendations/${id}/downvote`);

        const after = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
        
        expect(before.rows[0].score).toEqual(0);
        expect(after.rows[0].score).toEqual(-1);
    });

    it("verifies if the song was successfully deleted if it's score is lower than -5", async () => {

        let id = await createSong();
        
        const create = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);

        await supertest(app).post(`/recommendations/${id}/downvote`);
        await supertest(app).post(`/recommendations/${id}/downvote`);
        await supertest(app).post(`/recommendations/${id}/downvote`);
        await supertest(app).post(`/recommendations/${id}/downvote`);
        await supertest(app).post(`/recommendations/${id}/downvote`);

        const beforeDeletion = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
        
        await supertest(app).post(`/recommendations/${id}/downvote`);

        const deleted = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);

        expect(create.rows[0].score).toEqual(0);
        expect(beforeDeletion.rows[0].score).toEqual(-5);
        expect(deleted.rows.length).toEqual(0);
    });
});