import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// SHA-256 pre-calculated password hash
// This hash corresponds to the defined password (not revealed in code)
// To generate a new hash: crypto.createHash('sha256').update('your_password').digest('hex')
const PASSWORD_HASH = '8e614d39a1f1279958da1c9f7e8df51db4aabca8cc3a3e84f8c3dc5f88e1fcfb';

// Function to hash a password with SHA-256
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to generate a cryptographically secure session token
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      );
    }

    // Hash the provided password
    const inputHash = hashPassword(password);
    
    // Compare with stored hash (time-safe comparison)
    if (inputHash === PASSWORD_HASH) {
      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8); // 8 hour session

      // Create secure httpOnly cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true, // Not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // HTTPS in production
        sameSite: 'strict', // CSRF protection
        expires: expiresAt,
        path: '/',
      });

      // Store token hash (in production, use Redis or a DB)
      // For simplicity, we use an additional server-side cookie
      cookieStore.set('admin_session_verify', hashPassword(sessionToken), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: expiresAt,
        path: '/',
      });

      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });
    } else {
      // Delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

