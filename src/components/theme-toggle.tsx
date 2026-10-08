import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeContext = createContext({ dark: false, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let preference: string | null = null;
    try { preference = localStorage.getItem("ojuloge-theme"); } catch { /* Storage can be unavailable. */ }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (value: boolean) => {
      setDark(value);
      document.documentElement.classList.toggle("dark", value);
    };
    apply(preference ? preference === "dark" : media.matches);
    const followSystem = () => { if (!preference) apply(media.matches); };
    const sync = (event: StorageEvent) => {
      if (event.key === "ojuloge-theme") {
        preference = event.newValue;
        apply(preference ? preference === "dark" : media.matches);
      }
    };
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", sync);
    const remember = (event: Event) => {
      preference = (event as CustomEvent<string>).detail;
    };
    window.addEventListener("ojuloge-theme", remember);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", sync);
      window.removeEventListener("ojuloge-theme", remember);
    };
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    const value = next ? "dark" : "light";
    try { localStorage.setItem("ojuloge-theme", value); } catch { /* Still works without storage. */ }
    window.dispatchEvent(new CustomEvent("ojuloge-theme", { detail: value }));
  }
  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}

export function ThemeToggle() {
  const { dark, toggle } = useContext(ThemeContext);
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label}
      aria-pressed={dark} className="h-10 w-10 shrink-0 rounded-full border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}