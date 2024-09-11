import Joi from 'joi';

export const ListQuerySchema = Joi.object({
  page: Joi.number().required().min(1),
  perPage: Joi.number().required().max(100).min(1),
  field: Joi.string().alphanum(),
  value: Joi.string().alphanum(),
});
