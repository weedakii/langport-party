import { createFileRoute } from "@tanstack/react-router";

import { PageHero, Section, SiteShell } from "@/components/site/site-shell";
import { Card, CardContent } from "@/components/ui/card";
import { instructors } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Langport — Our Mission & Approach" },
      {
        name: "description",
        content:
          "Langport for Educational Services: communicative English training, CEFR-aligned levels, experienced instructors and measurable progress.",
      },
      { property: "og:title", content: "About Langport" },
      { property: "og:description", content: "Our mission, approach and academic team." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  const blocks = [
    { title: t("about.mission"), body: t("about.mission.body") },
    { title: t("about.approach"), body: t("about.approach.body") },
    { title: t("about.team"), body: t("about.team.body") },
  ];

  return (
    <SiteShell>
      <PageHero title={t("about.title")} subtitle={t("about.sub")} />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.map((b) => (
            <Card key={b.title} className="h-full">
              <CardContent className="p-7">
                <h2 className="text-lg font-bold">{b.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{b.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      <Section title={t("admin.instructors")} className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((name) => (
            <Card key={name}>
              <CardContent className="flex items-center gap-3 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                  {name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <span className="font-semibold">{name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}