import connection from "../../src/database";
import { generateNewSong } from "./createSongBody";

export async function createSong () {
    const {name, youtubeLink} = generateNewSong();
    await connection.query(`
    INSERT INTO songs (name, link)
    VALUES ($1, $2)
    `, [name, youtubeLink]);
}