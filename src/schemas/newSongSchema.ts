import Joi from "joi";

const newSongSchema = Joi.object({
    name: Joi.string().min(1).required(),
    youtubeLink: Joi.string().uri().min(1).required()
});

export { newSongSchema };