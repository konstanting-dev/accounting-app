import { HttpException } from 'src/exceptions/exception';
import { ApiError } from 'src/types';

export const throwHttpException = async (response: Response) => {
  const { code, error } = (await response.json()) as ApiError;

  throw new HttpException(code, error);
};
