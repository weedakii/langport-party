import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Award, BarChart3, BookOpen, CalendarDays, ClipboardList, FileText,
  LayoutDashboard, LifeBuoy, Megaphone, UserCheck,
} from "lucide-react";

import { AppShell, type NavItem } from "@/components/portal/app-shell";
import { useI18n } from "@/lib/i18n";

const items: NavItem[] = [
  { to: "/portal", key: "portal.dashboard", icon: LayoutDashboard },
  { to: "/portal/course", key: "portal.course", icon: BookOpen },
  { to: "/portal/schedule", key: "portal.schedule", icon: CalendarDays },
  { to: "/portal/materials", key: "portal.materials", icon: FileText },
  { to: "/portal/assignments", key: "portal.assignments", icon: ClipboardList },
  { to: "/portal/attendance", key: "portal.attendance", icon: UserCheck },
  { to: "/portal/progress", key: "portal.progress", icon: BarChart3 },
  { to: "/portal/announcements", key: "portal.announcements", icon: Megaphone },
  { to: "/portal/certificates", key: "portal.certificates", icon: Award },
  { to: "/portal/support", key: "portal.support", icon: LifeBuoy },
];

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Student Portal — Langport" },
      { name: "description", content: "Your Langport student portal: schedule, materials, assignments, attendance and progress." },
      { property: "og:title", content: "Student Portal — Langport" },
      { property: "og:description", content: "Your Langport student portal: schedule, materials, assignments, attendance and progress." },
    ],
  }),
  component: PortalLayout,
});

function PortalLayout() {
  const { t } = useI18n();
  return (
    <AppShell items={items} title={t("portal.title")} role="student">
      <Outlet />
    </AppShell>
  );
}
