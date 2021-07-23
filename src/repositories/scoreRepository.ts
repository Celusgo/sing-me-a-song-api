import connection from "../database";

async function thumbsUp(id: number) {
    await connection.query(`UPDATE songs
    SET score = score + 1
    WHERE id = $1
    `, [id]);
}

async function thumbsDown(id: number) {
    const request = await connection.query(`UPDATE songs
    SET score = score - 1
    WHERE id = $1
    RETURNING *
    `, [id]);

    if (request.rows.length === 0) {
        return null;
    }

    else if (request.rows[0].score < -5) {
        return await connection.query(`
        DELETE FROM songs WHERE id = $1
        `, [id]);
    }
}

export { thumbsUp, thumbsDown };