import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import type { Program } from "@/lib/data/types";

export function ProgramCard({ program }: { program: Program }) {
  const { t, pick } = useI18n();
  return (
    <Card className="group h-full transition-shadow hover:shadow-[var(--shadow-lift)]">
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <span className="text-3xl" aria-hidden>
            {program.icon}
          </span>
          <Badge variant="secondary">{program.recommendedLevel}</Badge>
        </div>
        <h3 className="text-lg font-bold">{pick(program.name)}</h3>
        <p className="text-sm text-muted-foreground">{pick(program.tagline)}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-semibold text-foreground">{pick(program.price)}</span>
          <Link
            to="/programs/$slug"
            params={{ slug: program.slug }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            {t("programs.explore")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}