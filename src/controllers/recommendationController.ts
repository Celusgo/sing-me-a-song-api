import { Request, Response } from 'express';
import { newSongSchema } from '../schemas/newSongSchema';
import { insertSong, searchForExistingSong } from '../repositories/recommendationRepository';

async function addNewSong(req: Request, res: Response) {
    const { name, youtubeLink }: { name: string; youtubeLink: string } = req.body;

    const validate = newSongSchema.validate(req.body);

    if (validate.error) return res.sendStatus(400);

    try {
        const checkIfExists = await searchForExistingSong(name);

        if (checkIfExists) return res.sendStatus(409);

        await insertSong(name, youtubeLink);
        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export { addNewSong };