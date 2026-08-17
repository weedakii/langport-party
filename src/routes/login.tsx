import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sessionRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student & Admin Login — Langport" },
      { name: "description", content: "Sign in to the Langport portal to view your schedule, materials, assignments and progress." },
      { property: "og:title", content: "Student & Admin Login — Langport" },
      { property: "og:description", content: "Sign in to the Langport portal to view your schedule, materials, assignments and progress." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const session = sessionRepo.login(identifier, password);
    if (!session) {
      setError(true);
      return;
    }
    void navigate({ to: session.role === "admin" ? "/admin" : "/portal" });
  }

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-md px-4 py-16 sm:py-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("auth.login.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("auth.login.sub")}</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="identifier">{t("auth.identifier")}</Label>
                <Input id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error ? <p className="text-sm text-destructive">{t("auth.invalid")}</p> : null}
              <Button type="submit" className="w-full">{t("auth.login")}</Button>
              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-primary hover:underline">{t("auth.forgot")}</Link>
                <Link to="/register" className="text-muted-foreground hover:underline">{t("nav.join")}</Link>
              </div>
            </form>
            <div className="mt-6 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
              <p>{t("auth.demo")}</p>
              <p className="mt-1">{t("auth.demoAdmin")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
