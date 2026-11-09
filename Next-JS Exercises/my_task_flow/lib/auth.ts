import jwt, { type JwtPayload } from 'jsonwebtoken';

const AUTH_COOKIE_NAME = 'mytaskflow_token';

// Always export with a getter (never a string inline)
export function getAuthCookieName(): string {
  return AUTH_COOKIE_NAME;
}

// Get secret safely with fallback for Dev
function getSecret(): string {
  const secret =
    process.env.AUTH_SECRET ||
    process.env.NEXT_PUBLIC_AUTH_SECRET || // optional fallback
    '';

  if (!secret || secret.length < 16) {
    throw new Error(
      'AUTH_SECRET is missing or too weak. Add a long random string to your .env file.'
    );
  }

  return secret;
}

// Create JWT
export function signToken(payload: { userId: string; email: string }): string {
  const secret = getSecret();
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

// Verify JWT with strong typing
export function verifyToken(
  token: string
): (JwtPayload & { userId: string; email: string }) | null {
  const secret = getSecret();

  try {
    return jwt.verify(token, secret) as JwtPayload & {
      userId: string;
      email: string;
    };
  } catch {
    return null; // Token expired or invalid
  }
}
