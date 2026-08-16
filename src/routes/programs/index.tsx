import { createFileRoute } from "@tanstack/react-router";

import { ProgramCard } from "@/components/site/program-card";
import { PageHero, Section, SiteShell } from "@/components/site/site-shell";
import { Card, CardContent } from "@/components/ui/card";
import { levels, programs } from "@/lib/data/programs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "English Programs — Langport" },
      {
        name: "description",
        content:
          "General English, Talkie conversation, IELTS, TOEFL, Business English, teenagers' programs, private training and workshops.",
      },
      { property: "og:title", content: "English Programs — Langport" },
      { property: "og:description", content: "Eight tracks built around CEFR levels and real practice." },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { t, pick } = useI18n();
  return (
    <SiteShell>
      <PageHero title={t("programs.title")} subtitle={t("programs.sub")} />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </Section>
      <Section title={t("admin.levels")} className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {levels.map((l) => (
            <Card key={l.code}>
              <CardContent className="p-5">
                <p className="font-bold">{pick(l.name)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{pick(l.description)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
