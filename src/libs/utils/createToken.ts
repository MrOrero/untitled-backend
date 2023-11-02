import * as jwt from 'jsonwebtoken';

export const createToken = (payload: { companyId: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  return token;
};
