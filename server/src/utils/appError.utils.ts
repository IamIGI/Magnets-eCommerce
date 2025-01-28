import { AppErrorCode, HttpStatusCode } from '../constants/error.constants';
import { Services } from './appErrorAssert.utils';

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public service?: Services,
    public appErrorCode?: AppErrorCode
  ) {
    super(message);
  }
}

export default AppError;
