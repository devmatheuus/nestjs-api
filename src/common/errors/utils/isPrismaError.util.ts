import { PrismaClientError } from '../types/PrismaClientError';

export const isPrimaError = (error: PrismaClientError): boolean => {
  const { code, clientVersion, meta } = error;

  return (
    typeof code === 'string' &&
    typeof clientVersion === 'string' &&
    (typeof meta === 'undefined' || typeof meta === 'object')
  );
};
