import connection from "../database";

async function searchForExistingSong(name: string) {
    const request = await connection.query(`
    SELECT FROM songs
    WHERE name = $1
    `, [name]);

    return request.rows[0];
};

async function insertSong(name: string, youtubeLink: string) {
    await connection.query(`
    INSERT INTO songs (name, link)
    VALUES ($1, $2)
    `, [name, youtubeLink]);
};

async function searchSongById(id: number) {
    const request = await connection.query(`
    SELECT * FROM songs
    WHERE id = $1
    `, [id]);

    return request.rows[0];
}

export { insertSong, searchForExistingSong, searchSongById };