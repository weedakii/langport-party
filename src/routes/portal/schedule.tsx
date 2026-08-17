import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageTitle } from "@/components/portal/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { classesRepo, studentsRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/lib/use-session";

export const Route = createFileRoute("/portal/schedule")({ component: SchedulePage });

function SchedulePage() {
  const { t, pick } = useI18n();
  const { session } = useSession();
  const student = studentsRepo.get(session?.studentId ?? "STD-1001") ?? studentsRepo.all()[0]!;
  const [view] = useState("list");
  const sessions = classesRepo.forGroup(student.group);
  const byDate = sessions.reduce<Record<string, typeof sessions>>((acc, s) => {
    (acc[s.date] ||= []).push(s);
    return acc;
  }, {});

  return (
    <>
      <PageTitle title={t("portal.schedule")} subtitle={student.group} />
      <Tabs defaultValue={view}>
        <TabsList>
          <TabsTrigger value="list">{t("portal.list")}</TabsTrigger>
          <TabsTrigger value="calendar">{t("portal.calendar")}</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4 space-y-3">
          {sessions.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{pick(s.title)}</p>
                  <p className="text-sm text-muted-foreground">{s.date} · {s.time} · {s.instructor}</p>
                </div>
                <Badge variant={s.status === "upcoming" ? "default" : "secondary"}>{s.status}</Badge>
                {s.status === "upcoming" ? (
                  <Button asChild size="sm">
                    <a href={s.link} target="_blank" rel="noreferrer">{t("portal.joinClass")}</a>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(byDate).map(([date, list]) => (
              <Card key={date}>
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{date}</p>
                  <ul className="mt-2 space-y-2">
                    {list.map((s) => (
                      <li key={s.id} className="rounded-md bg-secondary p-2 text-sm">
                        <span className="block font-medium">{s.time}</span>
                        {pick(s.title)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
