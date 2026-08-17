import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Headphones, Video, BookOpen, PenLine } from "lucide-react";
import { toast } from "sonner";

import { PageTitle } from "@/components/portal/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { materialsRepo } from "@/lib/data/store";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/portal/materials")({ component: MaterialsPage });

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText, worksheet: PenLine, video: Video, audio: Headphones,
  practice: PenLine, recording: Video, coursebook: BookOpen,
};

function MaterialsPage() {
  const { t, pick } = useI18n();
  const materials = materialsRepo.all();
  const units = [...new Set(materials.map((m) => m.unit))];

  return (
    <>
      <PageTitle title={t("portal.materials")} />
      {units.map((unit) => (
        <section key={unit} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{unit}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {materials.filter((m) => m.unit === unit).map((m) => {
              const Icon = icons[m.kind] ?? FileText;
              return (
                <Card key={m.id}>
                  <CardContent className="flex items-start gap-3 p-4">
                    <span className="rounded-lg bg-primary/10 p-2 text-primary"><Icon className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{pick(m.title)}</p>
                      <p className="text-xs text-muted-foreground">{pick(m.size)}</p>
                      <Badge variant="secondary" className="mt-2">{m.kind}</Badge>
                    </div>
                    <Button size="icon" variant="ghost" aria-label={t("portal.download")} onClick={() => toast.success(t("portal.download"))}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
