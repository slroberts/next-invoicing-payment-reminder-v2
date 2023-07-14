import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

export const hashPassword = (password: string | Buffer) =>
  bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string | Buffer,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: { id: string; email: string }) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  const { id, email } = user;

  return new SignJWT({ payload: { id, email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string | Uint8Array) => {
  const { payload } = await jwtVerify(
    jwt as string,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies: {
  get: (arg0: string | undefined) => any;
}) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  if (!jwt || !jwt.value) {
    // Handle the case when the JWT or its value is missing
    return null;
  }

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
