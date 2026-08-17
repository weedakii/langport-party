import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Your Password — Langport" },
      { name: "description", content: "Request a password reset link for your Langport student portal account." },
      { property: "og:title", content: "Reset Your Password — Langport" },
      { property: "og:description", content: "Request a password reset link for your Langport student portal account." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-md px-4 py-16 sm:py-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("auth.forgot.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("auth.forgot.sub")}</p>
          </CardHeader>
          <CardContent>
            {sent ? (
              <p className="rounded-lg bg-secondary p-4 text-sm">{t("auth.forgot.sent")}</p>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t("auth.identifier")}</Label>
                  <Input id="email" required />
                </div>
                <Button type="submit" className="w-full">{t("auth.forgot.send")}</Button>
              </form>
            )}
            <div className="mt-6 text-sm">
              <Link to="/login" className="text-primary hover:underline">{t("auth.backToLogin")}</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}
