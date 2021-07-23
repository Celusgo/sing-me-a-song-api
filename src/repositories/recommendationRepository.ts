import connection from "../database";

async function searchForExistingSong(name:string){
    const request = await connection.query(
    `
    SELECT FROM songs
    WHERE name = $1
    `, [name]);

    return request.rows;
}

async function insertSong (name:string, youtubeLink:string) {
    await connection.query(`
    INSERT INTO songs (name, link)
    VALUES ($1, $2)
    `, [name, youtubeLink]);
};

export { insertSong, searchForExistingSong };