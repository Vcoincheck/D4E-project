import { UserModel } from '../../../models/User';
import { SessionModel } from '../../../models/Session';
import { CreateUserPayload } from '../../../models/types';

export async function POST(request: Request) {
  try {
    const body: CreateUserPayload = await request.json();

    if (!body.username || !body.email || !body.password) {
      return Response.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(body.email);
    if (existingUser) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const existingUsername = await UserModel.findByUsername(body.username);
    if (existingUsername) {
      return Response.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    // Create user
    const user = await UserModel.create(body);

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
      message: 'Registration successful'
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
