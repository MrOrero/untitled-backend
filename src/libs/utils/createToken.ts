import jwt from 'jsonwebtoken';

export const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
