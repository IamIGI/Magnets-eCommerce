import bcrypt from 'bcrypt';

const hashValue = async (
  value: string,
  saltRounds: number = 10
): Promise<string> => await bcrypt.hash(value, saltRounds);

const compareValue = async (value: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(value, hash).catch(() => false);

export default {
  hashValue,
  compareValue,
};
