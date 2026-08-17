import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Globe, LogOut, Menu, Bell } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { BrandMark } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { notificationsRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/lib/use-session";
import { cn } from "@/lib/utils";

export type NavItem = { to: string; key: string; icon: React.ComponentType<{ className?: string }> };

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              active && "bg-primary/10 text-primary",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  items,
  title,
  role,
  children,
}: {
  items: NavItem[];
  title: string;
  role: "student" | "admin";
  children: ReactNode;
}) {
  const { t, toggleLang } = useI18n();
  const { session, ready, logout } = useSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (ready && (!session || session.role !== role)) {
      void navigate({ to: "/login" });
    }
  }, [ready, session, role, navigate]);

  useEffect(() => {
    setUnread(notificationsRepo.all().filter((n) => !n.read).length);
  }, []);

  if (!ready || !session || session.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-e border-border bg-background px-3 py-4 lg:flex">
        <Link to="/" className="px-2">
          <BrandMark />
        </Link>
        <p className="mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <div className="mt-2 flex-1 overflow-y-auto">
          <NavList items={items} />
        </div>
        <Button variant="ghost" className="justify-start gap-3" onClick={() => { logout(); void navigate({ to: "/" }); }}>
          <LogOut className="h-4 w-4" />
          {t("auth.logout")}
        </Button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("nav.menu")}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] max-w-xs p-4">
              <SheetTitle className="sr-only">{title}</SheetTitle>
              <div className="mt-8">
                <NavList items={items} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{session.name}</p>
            <p className="truncate text-xs text-muted-foreground">{session.email}</p>
          </div>
          <div className="ms-auto flex items-center gap-1">
            <span className="relative inline-flex">
              <Button variant="ghost" size="icon" aria-label={t("portal.notifications")}>
                <Bell className="h-5 w-5" />
              </Button>
              {unread > 0 ? (
                <span className="pointer-events-none absolute end-1 top-1 h-2 w-2 rounded-full bg-primary" />
              ) : null}
            </span>
            <Button variant="ghost" size="sm" onClick={toggleLang} className="gap-1.5">
              <Globe className="h-4 w-4" />
              {t("lang.switch")}
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/">{t("admin.backToSite")}</Link>
            </Button>
          </div>
        </header>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
