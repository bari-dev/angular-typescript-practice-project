import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET as string;

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
