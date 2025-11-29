import { SessionModel } from '../models/Session';

export interface AuthRequest extends Request {
  userId?: number;
  token?: string;
}

export async function verifyToken(token: string): Promise<{ userId: number; token: string } | null> {
  try {
    const session = await SessionModel.findByToken(token);
    if (!session) return null;
    return { userId: session.user_id, token };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function getTokenFromHeader(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;
  return authHeader.replace('Bearer ', '');
}

export async function withAuth(
  request: Request,
  handler: (request: AuthRequest) => Promise<Response>
): Promise<Response> {
  const token = getTokenFromHeader(request);

  if (!token) {
    return Response.json(
      { error: 'No token provided' },
      { status: 401 }
    );
  }

  const auth = await verifyToken(token);
  if (!auth) {
    return Response.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  const authRequest = request as AuthRequest;
  authRequest.userId = auth.userId;
  authRequest.token = auth.token;

  return handler(authRequest);
}
