import connection from "../../src/database";
import { generateNewSong } from "./createSongBody";

export async function createSong() {
    const { name, youtubeLink } = generateNewSong();
    const create = await connection.query(`
    INSERT INTO songs (name, link)
    VALUES ($1, $2)
    RETURNING *
    `, [name, youtubeLink]);

    const id:number = create.rows[0].id;

    return id;
}