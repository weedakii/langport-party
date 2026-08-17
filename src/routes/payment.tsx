import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, SiteShell } from "@/components/site/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { programs } from "@/lib/data/programs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/payment")({
  validateSearch: (search: Record<string, unknown>) => ({
    program: typeof search['program'] === "string" ? (search['program'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Course Fees & Payment — Langport" },
      { name: "description", content: "Review your Langport course package, fees, discounts and payment options before you start." },
      { property: "og:title", content: "Course Fees & Payment — Langport" },
      { property: "og:description", content: "Review your Langport course package, fees, discounts and payment options before you start." },
    ],
  }),
  component: PaymentPage,
});

const methods = ["Instapay", "Bank transfer", "Cash", "Card"];

function PaymentPage() {
  const { t, pick } = useI18n();
  const { program: slug } = Route.useSearch();
  const program = programs.find((p) => p.slug === slug) ?? programs[0]!;
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(methods[0]!);
  const [history, setHistory] = useState<{ amount: string; method: string; date: string }[]>([]);

  return (
    <SiteShell>
      <PageHero title={t("pay.title")} subtitle={t("pay.sub")} />
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("pay.package")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label={t("pay.program")} value={pick(program.name)} />
            <Row label={t("pay.level")} value={program.recommendedLevel} />
            <Row label={t("pay.duration")} value={pick(program.duration)} />
            <Row label={t("pay.total")} value={pick(program.price)} />
            <Row label={t("pay.discount")} value="—" />
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">{t("pay.status")}</span>
              <Badge variant="secondary">{t("status.pending")}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{pick(program.howToJoin)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("pay.record")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setHistory((h) => [
                  { amount, method, date: new Date().toISOString().slice(0, 10) },
                  ...h,
                ]);
                setAmount("");
                toast.success(t("pay.record"));
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="amount">{t("pay.amount")}</Label>
                <Input id="amount" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="method">{t("pay.method")}</Label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {methods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full">{t("pay.save")}</Button>
            </form>

            <h3 className="mt-6 text-sm font-semibold">{t("pay.history")}</h3>
            {history.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">{t("common.none")}</p>
            ) : (
              <ul className="mt-2 divide-y divide-border text-sm">
                {history.map((h, i) => (
                  <li key={i} className="flex items-center justify-between py-2">
                    <span>{h.date} · {h.method}</span>
                    <span className="font-semibold">{h.amount} {t("common.egp")}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SiteShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-end font-medium">{value}</span>
    </div>
  );
}
