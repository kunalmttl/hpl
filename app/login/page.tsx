import LoginForm from '@/app/components/LoginForm';

export const metadata = {
  title: 'Login - HPL Admin',
  description: 'Secure admin access to HPL enquiries and dashboard tools',
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,124,110,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-[#0e7c6e]/20 to-transparent blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/30 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="relative overflow-hidden rounded-4xl bg-slate-950/95 p-10 sm:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,124,110,0.45),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(14,124,110,0.16),transparent_36%)] opacity-90" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0e7c6e]" />
                    HPL Admin Portal
                  </span>

                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Welcome back.</h1>
                    <p className="max-w-lg text-sm leading-7 text-slate-300">
                      Sign in to manage enquiries, review leads, and monitor your HPL dashboard with secure credential access.
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300">
                    <p className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#0e7c6e]" />
                      Clean modern admin access without external auth providers.
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#0e7c6e]" />
                      Configurable credentials via environment variables for fast setup.
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#0e7c6e]" />
                      Built for HPL administrators with a premium minimal interface.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <p className="font-semibold text-white">Quick access</p>
                  <p className="mt-3 leading-6">
                    Use <span className="font-semibold text-[#0e7c6e]">admin</span> / <span className="font-semibold text-[#0e7c6e]">admin</span> if your environment is still using the default credentials.
                  </p>
                </div>
              </div>
            </section>

            <section className="flex items-center rounded-4xl bg-white p-8 shadow-2xl shadow-slate-950/10 sm:p-10">
              <div className="w-full">
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Admin Login</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Secure access for HPL staff</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Enter your admin credentials to continue. The login form below is fast, secure, and built for the HPL administration workflow.
                  </p>
                </div>

                <LoginForm />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
