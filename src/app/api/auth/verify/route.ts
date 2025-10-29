import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Function to hash a password
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;
    const sessionVerify = cookieStore.get('admin_session_verify')?.value;

    if (!sessionToken || !sessionVerify) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Verify that token matches stored hash
    const tokenHash = hashPassword(sessionToken);
    
    if (tokenHash === sessionVerify) {
      return NextResponse.json({
        authenticated: true,
      });
    } else {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}

