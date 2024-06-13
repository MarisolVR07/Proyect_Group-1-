import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtVerify} from 'jose';
const secretKey = new TextEncoder().encode("EmKKi2PNCmdn1qhvRsBDolXubPNcK7dl");

export  async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  console.log(token, token?.value)
  if (!token) {
    console.log("No hay")
    return NextResponse.redirect(new URL('/', request.url));
    
  }

  try {
    console.log(token)
    await jwtVerify(token.value, secretKey );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: "/views/:path*"
}



