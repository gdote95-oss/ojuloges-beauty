import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner sign in — Ojuloge's Beauty" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin" });
  }

  async function handleGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    if (result.error) {
      setError(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-6 text-primary-foreground">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl">Owner sign in</h1>
        <p className="mt-2 text-sm text-primary-foreground/60">
          Private — only Ojuloge can access the dashboard.
        </p>

        <button
          onClick={handleGoogle}
          className="mt-8 w-full border border-primary-foreground/20 px-4 py-3 text-xs uppercase tracking-widest text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-primary-foreground/40">
          <div className="h-px flex-1 bg-primary-foreground/15" /> or <div className="h-px flex-1 bg-primary-foreground/15" />
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-3">
          <input
            type="email" required placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-primary-foreground/15 bg-transparent px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none"
          />
          <input
            type="password" required placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-primary-foreground/15 bg-transparent px-4 py-3 text-sm placeholder:text-primary-foreground/40 focus:border-accent focus:outline-none"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-secondary disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
