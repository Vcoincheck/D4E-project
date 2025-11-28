import { SessionModel } from '../../../models/Session';
import { UserModel } from '../../../models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return Response.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Find session by refresh token
    const session = await SessionModel.findByToken(refreshToken);
    if (!session) {
      return Response.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Generate new tokens
    const newToken = UserModel.generateToken();
    const newRefreshToken = UserModel.generateToken();

    // Update session
    const updatedSession = await SessionModel.refreshToken(
      refreshToken,
      newToken,
      newRefreshToken
    );

    if (!updatedSession) {
      return Response.json(
        { error: 'Failed to refresh token' },
        { status: 500 }
      );
    }

    // Get user
    const user = await UserModel.findById(session.user_id);
    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { password_hash, ...userWithoutPassword } = user;

    return Response.json({
      user: userWithoutPassword,
      token: newToken,
      refreshToken: newRefreshToken,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
