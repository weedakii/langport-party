import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { PageHero, Section, SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { levels, programs } from "@/lib/data/programs";
import { notificationsRepo, registrationsRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>) => ({
    program: typeof search["program"] === "string" ? (search["program"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Join Langport — Register for an English Program" },
      {
        name: "description",
        content:
          "Register with Langport: pick your program, level and preferred schedule, and our team confirms your group and package.",
      },
      { property: "og:title", content: "Join Langport" },
      { property: "og:description", content: "Register in a few minutes and start learning." },
    ],
  }),
  component: RegisterPage,
});

const schedules = [
  { value: "morning", label: { en: "Morning (10:00 – 12:00)", ar: "صباحًا (١٠:٠٠ – ١٢:٠٠)" } },
  { value: "afternoon", label: { en: "Afternoon (13:00 – 15:00)", ar: "ظهرًا (١:٠٠ – ٣:٠٠)" } },
  { value: "evening", label: { en: "Evening (18:00 – 20:00)", ar: "مساءً (٦:٠٠ – ٨:٠٠)" } },
  { value: "weekend", label: { en: "Weekend", ar: "عطلة نهاية الأسبوع" } },
];

const sources = [
  { value: "facebook", label: { en: "Facebook / Instagram", ar: "فيسبوك / إنستجرام" } },
  { value: "friend", label: { en: "A friend", ar: "صديق" } },
  { value: "google", label: { en: "Google search", ar: "بحث جوجل" } },
  { value: "other", label: { en: "Other", ar: "أخرى" } },
];

function RegisterPage() {
  const { t, pick } = useI18n();
  const search = Route.useSearch();
  const [program, setProgram] = useState(search.program ?? "");
  const [level, setLevel] = useState("");
  const [schedule, setSchedule] = useState("");
  const [source, setSource] = useState("");
  const [ref, setRef] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const entry = registrationsRepo.add({
      fullName: String(form.get("fullName") ?? ""),
      mobile: String(form.get("mobile") ?? ""),
      email: String(form.get("email") ?? ""),
      age: String(form.get("age") ?? ""),
      currentLevel: level,
      program,
      preferredSchedule: schedule,
      previousCourses: String(form.get("previous") ?? ""),
      goal: String(form.get("goal") ?? ""),
      source,
    });
    notificationsRepo.add(
      { en: `New registration: ${entry.fullName}`, ar: `تسجيل جديد: ${entry.fullName}` },
      "registration",
    );
    setRef(entry.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (ref) {
    return (
      <SiteShell>
        <Section>
          <Card className="mx-auto max-w-xl">
            <CardContent className="p-9 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h1 className="mt-5 text-2xl font-extrabold">{t("reg.done.title")}</h1>
              <p className="mt-3 text-sm text-muted-foreground">{t("reg.done.body")}</p>
              <p className="mt-5 rounded-xl bg-secondary px-4 py-3 font-mono text-sm">
                {t("reg.done.ref")}: {ref}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link to="/payment" search={{ program: program || undefined }}>
                    {t("reg.done.payment")}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">{t("reg.done.home")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHero title={t("reg.title")} subtitle={t("reg.sub")} />
      <Section>
        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-7">
            <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("reg.fullName")}</Label>
                <Input id="fullName" name="fullName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">{t("reg.mobile")}</Label>
                <Input id="mobile" name="mobile" dir="ltr" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("reg.email")}</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">{t("reg.age")}</Label>
                <Input id="age" name="age" type="number" min={8} max={80} required />
              </div>
              <div className="space-y-2">
                <Label>{t("reg.level")}</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("reg.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {pick(l.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("reg.program")}</Label>
                <Select value={program} onValueChange={setProgram} required>
                  <SelectTrigger>
                    <SelectValue placeholder={t("reg.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((p) => (
                      <SelectItem key={p.slug} value={p.slug}>
                        {pick(p.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>{t("reg.schedule")}</Label>
                <Select value={schedule} onValueChange={setSchedule} required>
                  <SelectTrigger>
                    <SelectValue placeholder={t("reg.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    {schedules.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {pick(s.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="previous">{t("reg.previous")}</Label>
                <Input id="previous" name="previous" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="goal">{t("reg.goal")}</Label>
                <Textarea id="goal" name="goal" rows={4} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>{t("reg.source")}</Label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("reg.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {pick(s.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={!program || !schedule}>
                  {t("reg.submit")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Section>
    </SiteShell>
  );
}
