import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { TextEncoder } from 'text-encoding';

const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string | Uint8Array) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload;
};

export default async function middleware(
  req: {
    url: string;
    headers: { host: any };
    cookies: { get: (arg0: string | undefined) => any };
  },
  res: any
) {
  const nextUrl = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = nextUrl;

  // Check if the current page requires authentication
  const protectedPages = ['/dashboard'];
  const requiresAuthentication = protectedPages.some((page) => {
    if (pathname.startsWith(page)) {
      const subPath = pathname.substring(page.length);
      return !subPath || subPath.startsWith('/');
    }
    return false;
  });

  if (!requiresAuthentication || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  if (!jwt || !jwt.value) {
    nextUrl.pathname = '/login';
    return NextResponse.redirect(nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    nextUrl.pathname = '/login';
    return NextResponse.redirect(nextUrl);
  }
}
