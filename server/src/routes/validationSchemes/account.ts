import Joi from 'joi';

export const AddAccountSchema = Joi.object({
  number: Joi.string().required(),
  name: Joi.string().required(),
  iban: Joi.string().max(34),
  amount: Joi.number(),
  type: Joi.string().valid('SENDING', 'RECEIVING').required(),
});
