import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHero, Section, SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Langport" },
      {
        name: "description",
        content:
          "Four steps from first visit to your first class at Langport: choose a program, find your level, register and pay, start learning.",
      },
      { property: "og:title", content: "How It Works — Langport" },
      { property: "og:description", content: "From placement test to your first live class." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  const { t } = useI18n();
  const steps = [1, 2, 3, 4];

  return (
    <SiteShell>
      <PageHero title={t("how.title")} subtitle={t("how.sub")} />
      <Section>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((n) => (
            <li key={n}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                    {n}
                  </span>
                  <h2 className="mt-4 text-base font-bold">{t(`how.${n}.title`)}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`how.${n}.body`)}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/find-your-level">{t("level.start")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/programs">{t("programs.viewAll")}</Link>
          </Button>
        </div>
      </Section>
    </SiteShell>
  );
}
