import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  GraduationCap,
  Layers,
  MessageSquare,
  Monitor,
  Users,
} from "lucide-react";

import { ProgramCard } from "@/components/site/program-card";
import { Section, SiteShell } from "@/components/site/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { levels, programs } from "@/lib/data/programs";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Langport — Learn English, Build Confidence" },
      {
        name: "description",
        content:
          "CEFR-based English programs, placement testing, registration and a student portal for schedules, materials, assignments and progress.",
      },
      { property: "og:title", content: "Langport — Learn English, Build Confidence" },
      {
        property: "og:description",
        content: "Find your level, choose a program and start learning with Langport.",
      },
    ],
  }),
  component: Index,
});

const whyIcons = [GraduationCap, Layers, BarChart3, MessageSquare, Users, Monitor];

function Index() {
  const { t } = useI18n();

  return (
    <SiteShell>
      <section className="navy-band relative overflow-hidden">
        <div className="hero-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1">
            {t("brand.name")} · {t("brand.tagline")}
          </Badge>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base opacity-80 sm:text-lg">{t("home.hero.sub")}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/programs">
                {t("home.hero.cta1")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/find-your-level">{t("home.hero.cta2")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-navy-foreground">
              <Link to="/login">{t("home.hero.cta3")}</Link>
            </Button>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6">
            {[
              { v: `${programs.length}`, k: "home.hero.stat1" },
              { v: `${levels.length}`, k: "home.hero.stat2" },
              { v: "96%", k: "home.hero.stat3" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-3xl font-extrabold sm:text-4xl">{s.v}</dt>
                <dd className="mt-1 text-xs opacity-70 sm:text-sm">{t(s.k)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section title={t("why.title")} subtitle={t("why.sub")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyIcons.map((Icon, i) => (
            <Card key={i} className="h-full">
              <CardContent className="p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{t(`why.${i + 1}.title`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`why.${i + 1}.body`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title={t("programs.title")} subtitle={t("programs.sub")} className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.slice(0, 4).map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/programs">
              {t("programs.viewAll")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section title={t("level.title")} subtitle={t("level.sub")} className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["level.step1", "level.step2", "level.step3", "level.step4"].map((k, i) => (
            <Card key={k}>
              <CardContent className="p-6">
                <span className="text-sm font-bold text-primary">0{i + 1}</span>
                <p className="mt-2 font-semibold">{t(k)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link to="/find-your-level">{t("level.start")}</Link>
          </Button>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="border-primary/40 bg-accent/40">
            <CardContent className="p-8">
              <h3 className="text-xl font-extrabold">{t("paths.new.title")}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{t("paths.new.body")}</p>
              <Button asChild className="mt-6">
                <Link to="/find-your-level">{t("paths.new.cta")}</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-extrabold">{t("paths.student.title")}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{t("paths.student.body")}</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/login">{t("paths.student.cta")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="navy-band rounded-3xl px-8 py-14 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-80">{t("cta.body")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/register">{t("nav.join")}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
