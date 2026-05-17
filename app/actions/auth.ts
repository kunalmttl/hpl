'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// In production, use environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const COOKIE_NAME = 'hpl_admin_auth';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24, // 24 hours
};

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // Simple validation
  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  // Check credentials (in production, use proper password hashing)
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return { success: true };
  }

  return { error: 'Invalid credentials' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect('/login');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(COOKIE_NAME);
  return !!authCookie;
}