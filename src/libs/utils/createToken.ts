import * as jwt from 'jsonwebtoken';

export const createToken = (id: string, type: string) => {
  const token = jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  return token;
};
