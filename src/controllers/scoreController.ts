import { Response, Request } from 'express';
import { idSchema } from '../schemas/songIdSchema';
import { searchSongById } from '../repositories/recommendationRepository';
import { thumbsUp, thumbsDown } from '../repositories/scoreRepository';

async function upVote (req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const validate = idSchema.validate({ id });

    if (validate.error) return res.sendStatus(400);

    try {
        const findSong = await searchSongById(id);
        
        if (!findSong) return res.sendStatus(400);

        await thumbsUp(id);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

async function downVote (req:Request, res:Response) {
    const id:number = Number(req.params.id);

    const validate = idSchema.validate({id});
    
    if(validate.error) return res.sendStatus(400);

    try {
        const findSong = await searchSongById(id);

        if(!findSong) return res.sendStatus(400);
        
        await thumbsDown(id);

        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export { upVote, downVote };