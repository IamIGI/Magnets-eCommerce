function validateId(id: string | null) {
  if (!id || id.length !== 24) {
    throw new Error(`Provided ID is not valid: ${id}`);
  }
}

function isValidPayload<T>(
  payload: Partial<T>,
  requiredKeys: Array<keyof T>
): void {
  if (!payload || typeof payload !== 'object') {
    throw new Error('No payload provided');
  }

  for (const key of requiredKeys) {
    // Check for missing keys
    if (!(key in payload)) {
      throw new Error(`Missing required key: ${String(key)}`);
    }

    //Check for missing key value
    if (
      payload[key] === null ||
      payload[key] === undefined ||
      (typeof payload[key] === 'string' && payload[key].length === 0)
    ) {
      throw new Error(`Key '${String(key)}' is null or undefined in payload. `);
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
      throw new Error(
        `Key ${keyName} have to has array length exactly ${min} or ${max}`
      );
    }
  } else {
    if (value.length < min) {
      throw new Error(`Key ${keyName} have to has array of MIN length: ${min}`);
    }
    if (value.length > max) {
      throw new Error(`Key ${keyName} have to has array of MAX length: ${max}`);
    }
  }
}

export default {
  validateId,
  isValidPayload,
  isValidArraySize,
};
