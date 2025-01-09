function validateId(id: string | null) {
  if (!id || id.length !== 24) {
    throw new Error(`Provided ID is not valid: ${id}`);
  }
}

export default {
  validateId,
};
