import { UserModel } from '../../../models/User';
import { SessionModel } from '../../../models/Session';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return Response.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token and get user
    const session = await SessionModel.findByToken(token);
    if (!session) {
      return Response.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(session.user_id);
    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;

    return Response.json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Get user error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
