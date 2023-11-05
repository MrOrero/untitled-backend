import * as jwt from 'jsonwebtoken';

export const createEmployeeToken = (id: string, type: string, role: string) => {
  const token = jwt.sign({ id, type, role }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  return token;
};
