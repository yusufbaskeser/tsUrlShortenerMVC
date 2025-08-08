import pino from 'pino';

const logger = pino();

export const logg = (str : void) => {
  logger.error(str);
};

