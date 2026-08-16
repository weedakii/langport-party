import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Globe, LogIn } from "lucide-react";
import { useState, type ReactNode } from "react";

import logo from "@/assets/langport-logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/programs", key: "nav.programs" },
  { to: "/find-your-level", key: "nav.findLevel" },
  { to: "/how-it-works", key: "nav.howItWorks" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function BrandMark({ light = false }: { light?: boolean }) {
  const { t } = useI18n();
  return (
    <span className="flex items-center gap-2.5">
      <img src={logo} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
      <span className="leading-tight">
        <span
          className={cn(
            "block text-lg font-extrabold tracking-tight",
            light ? "text-navy-foreground" : "text-foreground",
          )}
        >
          {t("brand.name")}
        </span>
        <span className="block text-[11px] text-muted-foreground">{t("brand.tagline")}</span>
      </span>
    </span>
  );
}

function LangToggle() {
  const { t, toggleLang } = useI18n();
  return (
    <Button variant="ghost" size="sm" onClick={toggleLang} className="gap-1.5">
      <Globe className="h-4 w-4" />
      {t("lang.switch")}
    </Button>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === item.to && "bg-secondary text-foreground",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ms-auto hidden items-center gap-2 lg:flex">
          <LangToggle />
          <Button asChild variant="outline" size="sm">
            <Link to="/login">
              <LogIn className="h-4 w-4" />
              {t("nav.login")}
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/register">{t("nav.join")}</Link>
          </Button>
        </div>

        <div className="ms-auto flex items-center gap-1 lg:hidden">
          <LangToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t("nav.menu")}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild variant="outline" onClick={() => setOpen(false)}>
                    <Link to="/login">{t("nav.login")}</Link>
                  </Button>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link to="/register">{t("nav.join")}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="navy-band mt-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" width={40} height={40} loading="lazy" className="h-9 w-9" />
            <span className="text-lg font-extrabold">{t("brand.name")}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm opacity-75">{t("home.hero.sub")}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
            {t("footer.quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="opacity-80 hover:opacity-100">
                  {t(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
            {t("footer.forStudents")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/login" className="opacity-80 hover:opacity-100">
                {t("nav.login")}
              </Link>
            </li>
            <li>
              <Link to="/portal" className="opacity-80 hover:opacity-100">
                {t("portal.dashboard")}
              </Link>
            </li>
            <li>
              <Link to="/portal/support" className="opacity-80 hover:opacity-100">
                {t("portal.support")}
              </Link>
            </li>
            <li>
              <Link to="/admin" className="opacity-80 hover:opacity-100">
                {t("nav.admin")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
            {t("footer.contact")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>hello@langport.com</li>
            <li dir="ltr">+20 100 000 0000</li>
            <li>Cairo, Egypt</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-xs opacity-70 sm:px-6">
          © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="navy-band">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-base opacity-80">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function Section({
  title,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20", className)}>
      {title ? (
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-3 text-muted-foreground">{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}