import { NextResponse } from 'next/server';
import { login } from '@/app/actions/auth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await login(formData);

    if (result?.success) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('hpl_admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
      return response;
    }

    return NextResponse.json(
      { error: result?.error || 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('[Admin Login] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
