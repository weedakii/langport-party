import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Section, SiteShell } from "@/components/site/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProgram } from "@/lib/data/programs";
import { useI18n } from "@/lib/i18n";
import type { BiList } from "@/lib/data/types";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.program.name.en ?? "Program";
    const tagline = loaderData?.program.tagline.en ?? "";
    return {
      meta: [
        { title: `${name} — Langport` },
        { name: "description", content: `${tagline} Level, duration, schedule, outcomes and pricing.` },
        { property: "og:title", content: `${name} — Langport` },
        { property: "og:description", content: tagline },
      ],
    };
  },
  component: ProgramPage,
});

function List({ items }: { items: BiList }) {
  const { pick } = useI18n();
  return (
    <ul className="space-y-2.5">
      {pick(items).map((item) => (
        <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProgramPage() {
  const { program } = Route.useLoaderData();
  const { t, pick } = useI18n();

  const facts = [
    { label: t("programs.recommendedLevel"), value: program.recommendedLevel },
    { label: t("programs.duration"), value: pick(program.duration) },
    { label: t("programs.schedule"), value: pick(program.schedule) },
    { label: t("programs.price"), value: pick(program.price) },
  ];

  return (
    <SiteShell>
      <section className="navy-band">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <span className="text-4xl" aria-hidden>
            {program.icon}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">{pick(program.name)}</h1>
          <p className="mt-4 max-w-2xl opacity-80">{pick(program.tagline)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {program.cta === "register" ? (
              <Button asChild size="lg">
                <Link to="/register" search={{ program: program.slug }}>
                  {t("programs.register")}
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/contact">{t("programs.contactUs")}</Link>
              </Button>
            )}
            <Button asChild size="lg" variant="secondary">
              <Link to="/find-your-level">{t("home.hero.cta2")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="p-7">
                <h2 className="text-lg font-bold">{t("programs.whoFor")}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{pick(program.whoFor)}</p>
                <h2 className="mt-7 text-lg font-bold">{t("programs.goal")}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{pick(program.goal)}</p>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-7">
                  <h2 className="text-lg font-bold">{t("programs.outcomes")}</h2>
                  <div className="mt-4">
                    <List items={program.outcomes} />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-7">
                  <h2 className="text-lg font-bold">{t("programs.content")}</h2>
                  <div className="mt-4">
                    <List items={program.content} />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="p-7">
                <h2 className="text-lg font-bold">{t("programs.included")}</h2>
                <div className="mt-4">
                  <List items={program.included} />
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-7">
                <dl className="space-y-4">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-start justify-between gap-4">
                      <dt className="text-sm text-muted-foreground">{f.label}</dt>
                      <dd className="text-end text-sm font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <Badge variant="secondary" className="mt-6">
                  {t("programs.howToJoin")}
                </Badge>
                <p className="mt-3 text-sm text-muted-foreground">{pick(program.howToJoin)}</p>
                <Button asChild className="mt-6 w-full">
                  <Link
                    to={program.cta === "register" ? "/register" : "/contact"}
                    search={program.cta === "register" ? { program: program.slug } : undefined}
                  >
                    {program.cta === "register" ? t("programs.register") : t("programs.contactUs")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </SiteShell>
  );
}
