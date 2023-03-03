import * as Joi from 'joi';

const TYPE_ORM_LOGGING = [
  'query',
  'error',
  'schema',
  'warn',
  'info',
  'log',
  'all',
];

const DB_TYPE = ['mysql', 'postgres'];

export const validationSchema = Joi.object({
  PORT: Joi.number().default(false),
  HOST: Joi.string().default('localhost'),

  DB_TYPE: Joi.string()
    .required()
    .valid(...DB_TYPE),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  TYPEORM_LOGGING: [Joi.boolean(), Joi.string().valid(...TYPE_ORM_LOGGING)],
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),

  RABBIT_MQ_URI: Joi.string().required(),
  RABBIT_MQ_LOGS_CONSUMER: Joi.string().required(),
  RABBIT_MQ_TODO_CONSUMER: Joi.string().required(),
});
