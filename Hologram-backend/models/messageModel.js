import Joi from "joi";

export const messageSchema = Joi.object({
  welcome: Joi.string().min(1).required(),
  fallback: Joi.string().min(1).required(),
  goodbye: Joi.string().optional(), // you can extend as needed
});
