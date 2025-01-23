import { createCustomError } from '../handlers/error.handler';
import { HttpStatusCode } from '../types/error.type';

const VALIDATION = 'VALIDATION';

function validateId(id: string | null, idName?: string) {
  if (!id || id.length !== 24) {
    console.log('t1');
    console.log(idName !== undefined, idName);
    console.log(
      `${
        idName !== undefined ? `${idName} || ` : ''
      }Provided ID is not valid: ${id}`
    );
    throw createCustomError(
      HttpStatusCode.NotAcceptable,
      'VALIDATION',
      `${
        idName !== undefined ? `${idName} || ` : ''
      }Provided ID is not valid: ${id}`
    );
  }
}

function isValidPayload<T>(
  payload: Partial<T>,
  requiredKeys: Array<keyof T>,
  payloadName?: string
): void {
  if (!payload || typeof payload !== 'object') {
    throw createCustomError(
      HttpStatusCode.NotAcceptable,
      VALIDATION,
      `${
        payloadName !== undefined ? `${payloadName} || ` : ''
      }No payload provided`
    );
  }

  for (const key of requiredKeys) {
    // Check for missing keys
    if (!(key in payload)) {
      throw createCustomError(
        HttpStatusCode.NotAcceptable,
        VALIDATION,
        `${
          payloadName !== undefined ? `${payloadName} || ` : ''
        }Missing required key: ${String(key)}`
      );
    }

    //Check for missing key value
    if (
      payload[key] === null ||
      payload[key] === undefined ||
      (typeof payload[key] === 'string' && payload[key].length === 0)
    ) {
      throw createCustomError(
        HttpStatusCode.NotAcceptable,
        VALIDATION,
        `${payloadName ? `${payloadName} || ` : ''}Key '${String(
          key
        )}' is empty.`
      );
    }

    //Check for unnecessary keys
    if (requiredKeys.length < Object.keys(payload).length) {
      throw createCustomError(
        HttpStatusCode.NotAcceptable,
        VALIDATION,
        `Payload has too many keys. Required keys: ${requiredKeys}`
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
      throw createCustomError(
        HttpStatusCode.NotAcceptable,
        VALIDATION,
        `Key ${keyName} have to has array length exactly ${min} or ${max}`
      );
    }
  } else {
    if (value.length < min) {
      throw createCustomError(
        HttpStatusCode.NotAcceptable,
        VALIDATION,
        `Key ${keyName} have to has array of MIN length: ${min}`
      );
    }

    if (value.length > max) {
      throw createCustomError(
        HttpStatusCode.NotAcceptable,
        VALIDATION,
        `Key ${keyName} have to has array of MAX length: ${max}`
      );
    }
  }
}

export default {
  validateId,
  isValidPayload,
  isValidArraySize,
};
