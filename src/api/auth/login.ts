import { UserModel } from '../../../models/User';
import { SessionModel } from '../../../models/Session';
import { LoginPayload } from '../../../models/types';

export async function POST(request: Request) {
  try {
    const body: LoginPayload = await request.json();

    if (!body.email || !body.password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await UserModel.findByEmail(body.email);
    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    if (!UserModel.verifyPassword(body.password, user.password_hash || '')) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate tokens
    const token = UserModel.generateToken();
    const refreshToken = UserModel.generateToken();

    // Create session
    await SessionModel.createSession(user.id, token, refreshToken);

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;

    return Response.json({
      user: userWithoutPassword,
      token,
      refreshToken,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
