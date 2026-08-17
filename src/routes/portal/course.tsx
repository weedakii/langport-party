import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { PageTitle } from "@/components/portal/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { programs } from "@/lib/data/programs";
import { materialsRepo, studentsRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/lib/use-session";

export const Route = createFileRoute("/portal/course")({ component: MyCourse });

function MyCourse() {
  const { t, pick } = useI18n();
  const { session } = useSession();
  const student = studentsRepo.get(session?.studentId ?? "STD-1001") ?? studentsRepo.all()[0]!;
  const program = programs.find((p) => p.slug === student.program);
  const units = [...new Set(materialsRepo.all().map((m) => m.unit))];

  return (
    <>
      <PageTitle title={t("portal.course")} subtitle={student.packageName} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">{t("portal.modules")}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {(program ? pick(program.content) : units).map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">{t("portal.courseProgress")}</CardTitle></CardHeader>
            <CardContent>
              <Progress value={student.progress} />
              <p className="mt-2 text-sm text-muted-foreground">{student.progress}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-5 text-sm">
              <Row label={t("portal.instructor")} value={student.instructor} />
              <Row label={t("portal.group")} value={student.group} />
              <Row label={t("portal.currentLevel")} value={student.level} />
              <Row label={t("portal.startDate")} value={student.startDate} />
              <Row label={t("portal.endDate")} value={student.endDate} />
            </CardContent>
          </Card>
          {program ? (
            <Card>
              <CardHeader><CardTitle className="text-base">{t("portal.activities")}</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 ps-5 text-sm text-muted-foreground">
                  {pick(program.outcomes).map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-end font-medium">{value}</span>
    </div>
  );
}
