import Joi from 'joi';

const idSchema = Joi.object({
    id: Joi.number().positive().required()
});

export { idSchema };