import * as jwt from 'jsonwebtoken';

export const createToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  return token;
};
