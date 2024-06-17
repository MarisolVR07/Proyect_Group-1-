import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import  cookie  from 'cookie';

export function middleware(request: any) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.auth_token;

  if (!token) {
    return NextResponse.redirect('/');
  }

  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect('/');
  }
}

export const config = {
  matcher: ['/views/*', '/views/protected-route'],
};
