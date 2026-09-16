import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Owner dashboard — Ojuloge's Beauty" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Message = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  event_date: string | null;
  service: string | null;
  message: string;
  source: string;
  status: string;
};

type Counts = Record<string, number>;

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [counts, setCounts] = useState<Counts>({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? null);
      const { data: roleData } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      const admin = !!roleData;
      setIsAdmin(admin);
      if (!admin) {
        setLoading(false);
        return;
      }
      const [{ data: msgs }, { data: events }] = await Promise.all([
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200),
        supabase
          .from("interaction_events")
          .select("kind, created_at")
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ]);
      setMessages((msgs ?? []) as Message[]);
      const c: Counts = {};
      (events ?? []).forEach((e: { kind: string }) => {
        c[e.kind] = (c[e.kind] ?? 0) + 1;
      });
      setCounts(c);
      setLoading(false);
    })();
  }, []);

  async function setStatus(id: string, status: string) {
    await supabase.from("contact_messages").update({ status }).eq("id", id);
    setMessages((m) => m.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((m) => m.filter((row) => row.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
        <div>
          <h1 className="font-display text-2xl">Not authorised</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Signed in as {email}. This account doesn't have owner access.
          </p>
          <button onClick={signOut} className="mt-6 border border-foreground/20 px-4 py-2 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const newCount = messages.filter((m) => m.status === "new").length;

  const kpis = [
    { label: "New messages", value: newCount },
    { label: "WhatsApp taps · 7d", value: counts.whatsapp_click ?? 0 },
    { label: "Call taps · 7d", value: counts.call_click ?? 0 },
    { label: "Booksy clicks · 7d", value: counts.booksy_click ?? 0 },
    { label: "Instagram clicks · 7d", value: counts.instagram_click ?? 0 },
    { label: "Form sends · 7d", value: counts.form_submit ?? 0 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/10 bg-primary px-6 py-4 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/50">Owner dashboard</p>
            <h1 className="font-display text-xl">Ojuloge's Beauty</h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-primary-foreground/60">{email}</span>
            <button onClick={signOut} className="border border-primary-foreground/20 px-3 py-1.5 uppercase tracking-widest hover:bg-primary-foreground hover:text-primary">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {kpis.map((k) => (
            <div key={k.label} className="border border-foreground/10 p-4">
              <p className="text-[10px] uppercase tracking-widest text-foreground/50">{k.label}</p>
              <p className="mt-2 font-display text-3xl">{k.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-4 font-display text-2xl">Messages</h2>
        {messages.length === 0 ? (
          <p className="text-sm text-foreground/60">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <article key={m.id} className={`border p-5 ${m.status === "new" ? "border-accent" : "border-foreground/10"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg">
                      {m.name}{" "}
                      {m.status === "new" && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[9px] uppercase tracking-widest text-primary">New</span>}
                    </p>
                    <p className="mt-1 text-xs text-foreground/60">
                      {new Date(m.created_at).toLocaleString("en-GB")}
                      {m.service && <> · {m.service}</>}
                      {m.event_date && <> · Wants {new Date(m.event_date).toLocaleDateString("en-GB")}</>}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <a href={`tel:${m.phone}`} className="border border-foreground/15 px-3 py-1.5 hover:bg-foreground hover:text-background">📞 {m.phone}</a>
                    <a href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" className="border border-foreground/15 px-3 py-1.5 hover:bg-foreground hover:text-background">WhatsApp</a>
                    {m.email && <a href={`mailto:${m.email}`} className="border border-foreground/15 px-3 py-1.5 hover:bg-foreground hover:text-background">✉ {m.email}</a>}
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">{m.message}</p>
                <div className="mt-4 flex gap-2 text-[10px] uppercase tracking-widest">
                  {m.status !== "read" && <button onClick={() => setStatus(m.id, "read")} className="border border-foreground/15 px-3 py-1.5 hover:bg-foreground hover:text-background">Mark read</button>}
                  {m.status !== "archived" && <button onClick={() => setStatus(m.id, "archived")} className="border border-foreground/15 px-3 py-1.5 hover:bg-foreground hover:text-background">Archive</button>}
                  <button onClick={() => remove(m.id)} className="border border-destructive/40 px-3 py-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground">Delete</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
