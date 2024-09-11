import Joi from 'joi';

export const CountAccountsSchema = Joi.object({
  field: Joi.string().alphanum(),
  value: Joi.string().alphanum(),
});
