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
export default {
  validateId,
  isValidPayload,
};
