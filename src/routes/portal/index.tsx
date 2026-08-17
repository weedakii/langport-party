import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ClipboardList, FileText, Megaphone } from "lucide-react";

import { PageTitle } from "@/components/portal/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { programs } from "@/lib/data/programs";
import { announcementsRepo, assignmentsRepo, classesRepo, studentsRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/lib/use-session";

export const Route = createFileRoute("/portal/")({ component: Dashboard });

function Dashboard() {
  const { t, pick } = useI18n();
  const { session } = useSession();
  const student = studentsRepo.get(session?.studentId ?? "STD-1001") ?? studentsRepo.all()[0]!;
  const program = programs.find((p) => p.slug === student.program);
  const next = classesRepo.forGroup(student.group).find((c) => c.status === "upcoming");
  const pending = assignmentsRepo.all().filter((a) => a.status === "pending");
  const news = announcementsRepo.all().slice(0, 3);

  return (
    <>
      <PageTitle title={`${t("portal.welcome")}, ${student.name}`} subtitle={student.packageName} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label={t("portal.currentProgram")} value={program ? pick(program.name) : student.program} />
        <Stat label={t("portal.currentLevel")} value={student.level} />
        <Stat label={t("portal.attendanceRate")} value={`${student.attendanceRate}%`} />
        <Stat label={t("portal.group")} value={student.group} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{t("portal.courseProgress")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("portal.overall")}</span>
              <span className="font-semibold">{student.progress}%</span>
            </div>
            <Progress value={student.progress} className="mt-2" />
            <div className="mt-6 rounded-lg border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("portal.nextClass")}
              </p>
              {next ? (
                <>
                  <p className="mt-2 font-medium">{pick(next.title)}</p>
                  <p className="text-sm text-muted-foreground">
                    {next.date} · {next.time} · {next.instructor}
                  </p>
                  <Button asChild size="sm" className="mt-3">
                    <a href={next.link} target="_blank" rel="noreferrer">{t("portal.joinClass")}</a>
                  </Button>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">{t("common.none")}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("portal.assignments")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("common.none")}</p>
            ) : (
              pending.map((a) => (
                <div key={a.id} className="rounded-lg border border-border p-3">
                  <p className="text-sm font-medium">{pick(a.title)}</p>
                  <p className="text-xs text-muted-foreground">{t("portal.dueDate")}: {a.dueDate}</p>
                </div>
              ))
            )}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/portal/assignments">{t("portal.viewAll")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("portal.announcements")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {news.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{pick(a.title)}</p>
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                </div>
                {!a.read ? <Badge className="ms-auto" variant="secondary">{t("portal.unread")}</Badge> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("portal.resources")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <Quick to="/portal/schedule" icon={CalendarDays} label={t("portal.schedule")} />
            <Quick to="/portal/materials" icon={FileText} label={t("portal.materials")} />
            <Quick to="/portal/assignments" icon={ClipboardList} label={t("portal.assignments")} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-2 truncate text-lg font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function Quick({ to, icon: Icon, label }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center text-sm font-medium hover:bg-secondary"
    >
      <Icon className="h-5 w-5 text-primary" />
      {label}
    </Link>
  );
}
