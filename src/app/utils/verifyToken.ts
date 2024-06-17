import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { useRouter } from 'next/router'
const secretKey = "EmKKi2PNCmdn1qhvRsBDolXubPNcK7dl";

export interface DecodedToken extends JwtPayload {
  userId: string;
  email: string;
}

export const verifyToken = (token: string): DecodedToken | null => {

  try {
    if (!token || token.split('.').length !== 3) {
      throw new Error('Token mal formado');
      
      
    }

    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return decoded;
  } catch (err) {
    console.error('Tipo de error:', typeof err);
    console.error('Instancia de JsonWebTokenError:', err instanceof JsonWebTokenError);
    if (err instanceof JsonWebTokenError) {
      console.error('JsonWebTokenError:', err.message);
      
    } else {
      console.error('Error de verificación del token:', err);
      
    }
    return null;
  }
};
