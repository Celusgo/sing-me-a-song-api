import { Request, Response } from 'express';
import { newSongSchema } from '../schemas/newSongSchema';
import { amountSchema } from '../schemas/songIdSchema';
import { insertSong, searchForExistingSong, higherScoreSongs } from '../repositories/recommendationRepository';
import { giveRandomSong } from '../services/recommendationService';

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
};

async function randomSong (req:Request, res:Response) {
    try{
        const random = await giveRandomSong()
        if(!random) return res.sendStatus(404);
        res.status(200).send(random);
    }
    catch (err){
        console.log(err);
        res.sendStatus(500);
    }
};

async function topSongs(req: Request, res: Response) {
    const amount:number = Number(req.params.amount);

    if(!amount) return res.sendStatus(400);

    const validate = amountSchema.validate({amount});
    
    if(validate.error) return res.sendStatus(400);
    

    try{
        const request = await higherScoreSongs(amount)

        if(request.length === 0) return res.sendStatus(404);

        res.status(200).send(request);
    }
    catch(e){
        console.error(e);
        res.sendStatus(500);
    }
}

export { addNewSong, randomSong, topSongs };