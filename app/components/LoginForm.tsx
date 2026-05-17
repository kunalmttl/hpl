'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      body: formData,
    });

    setIsLoading(false);

    if (response.ok) {
      router.push('/admin');
      return;
    }

    const result = await response.json().catch(() => ({ error: 'Login failed.' }));
    setError(result?.error || 'Login failed.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-slate-200/80 bg-slate-50 p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.4)] sm:p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Admin access</p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">Sign in to continue</h2>
        <p className="text-sm text-slate-600">Use your admin credentials to view enquiries and manage the dashboard.</p>
      </div>

      <div className="grid gap-4">
        <label htmlFor="username" className="text-sm font-semibold text-slate-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="admin"
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0e7c6e] focus:ring-2 focus:ring-[#0e7c6e]/20"
        />
      </div>

      <div className="grid gap-4">
        <label htmlFor="password" className="text-sm font-semibold text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0e7c6e] focus:ring-2 focus:ring-[#0e7c6e]/20"
        />
      </div>

      {error && (
        <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full justify-center rounded-3xl bg-[#0e7c6e] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0e7c6e]/20 transition hover:bg-[#0c6d60] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-center text-xs text-slate-500">
        Need help? Contact{' '}
        <a href="mailto:admin@hpl.com" className="font-semibold text-slate-700 hover:text-slate-900">
          admin@hpl.com
        </a>
      </p>
    </form>
  );
}
