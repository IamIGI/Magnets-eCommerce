import { HttpStatusCode } from '../constants/error.constants';
import AppError from './appError.utils';

const VALIDATION = 'Validation';

function validateId(id: string | null, idName?: string) {
  console.log('validateId');
  console.log(id);
  if (id === ':id') {
    throw new AppError(HttpStatusCode.NotAcceptable, 'ID is empty', VALIDATION);
  }
  if (!id || id.length !== 24) {
    throw new AppError(
      HttpStatusCode.NotAcceptable,
      `${
        idName !== undefined ? `${idName} || ` : ''
      }Provided ID is not valid: ${id}`,
      VALIDATION
    );
  }
}

function isValidPayload<T>(
  payload: Partial<T>,
  requiredKeys: Array<keyof T>,
  payloadName?: string
): void {
  console.log(payload);
  if (
    !payload ||
    typeof payload !== 'object' ||
    JSON.stringify(payload) === '{}'
  ) {
    throw new AppError(
      HttpStatusCode.NotAcceptable,
      `${
        payloadName !== undefined ? `${payloadName} || ` : ''
      }No payload provided`,
      VALIDATION
    );
  }

  for (const key of requiredKeys) {
    // Check for missing keys
    if (!(key in payload)) {
      throw new AppError(
        HttpStatusCode.NotAcceptable,
        `${
          payloadName !== undefined ? `${payloadName} || ` : ''
        }Missing required key: ${String(key)}`,
        VALIDATION
      );
    }

    //Check for missing key value
    if (
      payload[key] === null ||
      payload[key] === undefined ||
      (typeof payload[key] === 'string' && payload[key].length === 0)
    ) {
      throw new AppError(
        HttpStatusCode.NotAcceptable,
        `${payloadName ? `${payloadName} || ` : ''}Key '${String(
          key
        )}' is empty.`,
        VALIDATION
      );
    }

    //Check for unnecessary keys
    if (requiredKeys.length < Object.keys(payload).length) {
      throw new AppError(
        HttpStatusCode.NotAcceptable,
        `Payload has too many keys. Required keys: ${requiredKeys}`,
        VALIDATION
      );
    }
  }
}

function isValidArraySize(
  keyName: string,
  value: any[],
  min: number,
  max: number,
  exactly: boolean = false
) {
  if (exactly) {
    console.log(value);
    if (value.length !== min && value.length !== max) {
      throw new AppError(
        HttpStatusCode.NotAcceptable,
        `Key ${keyName} have to has array length exactly ${min} or ${max}`,
        VALIDATION
      );
    }
  } else {
    if (value.length < min) {
      throw new AppError(
        HttpStatusCode.NotAcceptable,
        `Key ${keyName} have to has array of MIN length: ${min}`,
        VALIDATION
      );
    }

    if (value.length > max) {
      throw new AppError(
        HttpStatusCode.NotAcceptable,
        `Key ${keyName} have to has array of MAX length: ${max}`,
        VALIDATION
      );
    }
  }
}

export default {
  validateId,
  isValidPayload,
  isValidArraySize,
};
