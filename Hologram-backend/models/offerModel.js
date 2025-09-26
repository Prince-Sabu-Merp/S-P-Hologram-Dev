import Joi from "joi";

export const offerSchema = Joi.object({
  offersid: Joi.string().pattern(/^PROM-\d+$/).required(),
  name: Joi.string().min(3).required(),
  type: Joi.string().required(),
  description: Joi.array().items(Joi.string()).required(),
  price: Joi.alternatives()
    .try(Joi.number().positive(), Joi.string().pattern(/^\d+$/))
    .required(),
});
