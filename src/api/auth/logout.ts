import { SessionModel } from '../../../models/Session';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return Response.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Delete session
    await SessionModel.deleteSession(token);

    return Response.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
