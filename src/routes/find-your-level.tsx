import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero, Section, SiteShell } from "@/components/site/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { levels, programs } from "@/lib/data/programs";
import { placementRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/find-your-level")({
  head: () => ({
    meta: [
      { title: "Find Your Level — Free English Placement Test" },
      {
        name: "description",
        content:
          "Take the free Langport placement test, get your CEFR level (A1–C1) and a recommended program, then register in minutes.",
      },
      { property: "og:title", content: "Find Your Level — Langport" },
      { property: "og:description", content: "10 questions. Your CEFR level and a recommended program." },
    ],
  }),
  component: FindYourLevel,
});

const questions = placementRepo.questions;

function levelFor(correct: number) {
  if (correct <= 2) return "A1";
  if (correct <= 4) return "A2";
  if (correct <= 6) return "B1";
  if (correct <= 8) return "B2";
  return "C1";
}

function programFor(level: string) {
  if (level === "A1" || level === "A2") return "general-english";
  if (level === "B1") return "talkie";
  if (level === "B2") return "ielts";
  return "business-english";
}

function FindYourLevel() {
  const { t, pick } = useI18n();
  const [stage, setStage] = useState<"intro" | "test" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const level = levelFor(correct);
  const recommended = programs.find((p) => p.slug === programFor(level)) ?? programs[0]!;
  const question = questions[index]!;

  function submit() {
    placementRepo.set({
      level: levelFor(correct),
      correct,
      total: questions.length,
      program: programFor(levelFor(correct)),
      date: new Date().toISOString().slice(0, 10),
    });
    setStage("result");
  }

  return (
    <SiteShell>
      <PageHero title={t("level.title")} subtitle={t("level.sub")} />
      <Section>
        {stage === "intro" ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="p-7">
                <ol className="space-y-4">
                  {["level.step1", "level.step2", "level.step3", "level.step4"].map((k, i) => (
                    <li key={k} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="font-medium">{t(k)}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => setStage("test")}>
                    {t("level.start")}
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/contact">{t("level.book")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-7">
                <h2 className="text-lg font-bold">{t("admin.levels")}</h2>
                <ul className="mt-4 space-y-3">
                  {levels.map((l) => (
                    <li key={l.code}>
                      <p className="text-sm font-semibold">{pick(l.name)}</p>
                      <p className="text-sm text-muted-foreground">{pick(l.description)}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {stage === "test" ? (
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-7">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {t("level.question")} {index + 1} {t("level.of")} {questions.length}
                </span>
                <Badge variant="secondary">{question.band}</Badge>
              </div>
              <Progress value={((index + 1) / questions.length) * 100} className="mt-3" />
              <p className="mt-7 text-lg font-semibold" dir="ltr">
                {pick(question.prompt)}
              </p>
              <div className="mt-5 grid gap-2.5">
                {question.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    dir="ltr"
                    onClick={() => setAnswers((a) => ({ ...a, [question.id]: i }))}
                    className={`rounded-xl border px-4 py-3 text-start text-sm transition-colors ${
                      answers[question.id] === i
                        ? "border-primary bg-accent font-semibold"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                >
                  {t("level.back")}
                </Button>
                {index === questions.length - 1 ? (
                  <Button onClick={submit} disabled={answers[question.id] === undefined}>
                    {t("level.submit")}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIndex((i) => i + 1)}
                    disabled={answers[question.id] === undefined}
                  >
                    {t("level.question")} {index + 2}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {stage === "result" ? (
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground">{t("level.result.title")}</p>
              <p className="mt-2 text-6xl font-extrabold text-primary">{level}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("level.result.score")}: {correct} / {questions.length}
              </p>
              <div className="mt-7 rounded-2xl bg-secondary p-6 text-start">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("level.result.recommended")}
                </p>
                <p className="mt-1 text-lg font-bold">{pick(recommended.name)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{pick(recommended.tagline)}</p>
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link to="/register" search={{ program: recommended.slug }}>
                    {t("level.result.register")}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setAnswers({});
                    setIndex(0);
                    setStage("intro");
                  }}
                >
                  {t("level.result.retake")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </Section>
    </SiteShell>
  );
}
