  
import connection from '../../src/database';

export async function clearDatabase () {
    await connection.query(`DELETE FROM songs`);
}

export async function endConnection () {
    await clearDatabase();
    await connection.end();
}