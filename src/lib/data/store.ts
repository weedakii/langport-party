/**
 * Local-storage backed data layer.
 *
 * Every resource is a small collection API (read / write). Today it seeds
 * realistic data and persists changes in the browser. To move to the Laravel
 * backend, replace the body of each `read`/`write` with a fetch call — the
 * component API stays identical.
 */
import {
  instructors,
  placementQuestions,
  seedAnnouncements,
  seedAssignments,
  seedCertificates,
  seedClasses,
  seedGroups,
  seedMaterials,
  seedNotifications,
  seedPayments,
  seedProgress,
  seedRegistrations,
  seedStudents,
} from "./seed";
import type {
  Announcement,
  Assignment,
  Certificate,
  ClassSession,
  CourseGroup,
  Material,
  NotificationItem,
  PaymentRecord,
  PaymentStatus,
  Registration,
  Session,
  SkillProgress,
  Student,
} from "./types";

const PREFIX = "langport.v1.";

function canStore() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!canStore()) return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): T {
  if (canStore()) {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — keep in-memory result */
    }
  }
  return value;
}

/* ---------------------------------- students --------------------------------- */

export const studentsRepo = {
  all: () => read<Student[]>("students", seedStudents),
  save: (list: Student[]) => write("students", list),
  get: (id: string) => studentsRepo.all().find((s) => s.id === id),
  upsert(student: Student) {
    const list = studentsRepo.all();
    const idx = list.findIndex((s) => s.id === student.id);
    if (idx >= 0) list[idx] = student;
    else list.unshift(student);
    return studentsRepo.save(list);
  },
  remove(id: string) {
    return studentsRepo.save(studentsRepo.all().filter((s) => s.id !== id));
  },
  nextId() {
    const nums = studentsRepo.all().map((s) => Number(s.id.replace(/\D/g, "")) || 1000);
    return `STD-${Math.max(1000, ...nums) + 1}`;
  },
};

export function paymentStatusOf(student: Student): PaymentStatus {
  if (student.paymentStatus === "confirmed") return "confirmed";
  const due = student.total - student.discount;
  if (student.paid <= 0) return "pending";
  if (student.paid >= due) return "paid";
  return "partial";
}

export function remainingOf(student: Student) {
  return Math.max(0, student.total - student.discount - student.paid);
}

/* ------------------------------- registrations ------------------------------- */

export const registrationsRepo = {
  all: () => read<Registration[]>("registrations", seedRegistrations),
  save: (list: Registration[]) => write("registrations", list),
  add(data: Omit<Registration, "id" | "createdAt" | "status">) {
    const list = registrationsRepo.all();
    const id = `REG-${2044 + list.length}`;
    const entry: Registration = {
      ...data,
      id,
      createdAt: new Date().toISOString().slice(0, 10),
      status: "new",
    };
    registrationsRepo.save([entry, ...list]);
    return entry;
  },
  setStatus(id: string, status: Registration["status"]) {
    return registrationsRepo.save(
      registrationsRepo.all().map((r) => (r.id === id ? { ...r, status } : r)),
    );
  },
  remove(id: string) {
    return registrationsRepo.save(registrationsRepo.all().filter((r) => r.id !== id));
  },
};

/* ---------------------------------- classes ---------------------------------- */

export const classesRepo = {
  all: () => read<ClassSession[]>("classes", seedClasses),
  save: (list: ClassSession[]) => write("classes", list),
  forGroup: (group: string) => classesRepo.all().filter((c) => c.courseGroup === group),
  upsert(session: ClassSession) {
    const list = classesRepo.all();
    const idx = list.findIndex((c) => c.id === session.id);
    if (idx >= 0) list[idx] = session;
    else list.push(session);
    return classesRepo.save(
      [...list].sort((a, b) => a.date.localeCompare(b.date)),
    );
  },
  remove: (id: string) => classesRepo.save(classesRepo.all().filter((c) => c.id !== id)),
  setAttendance(id: string, attendance: ClassSession["attendance"]) {
    return classesRepo.save(
      classesRepo.all().map((c) => (c.id === id ? { ...c, attendance, status: "completed" } : c)),
    );
  },
  nextId() {
    const nums = classesRepo.all().map((c) => Number(c.id.replace(/\D/g, "")) || 400);
    return `CLS-${Math.max(400, ...nums) + 1}`;
  },
};

/* ------------------------------ course content ------------------------------- */

export const materialsRepo = {
  all: () => read<Material[]>("materials", seedMaterials),
};

export const assignmentsRepo = {
  all: () => read<Assignment[]>("assignments", seedAssignments),
  save: (list: Assignment[]) => write("assignments", list),
  submit(id: string, submission: string) {
    return assignmentsRepo.save(
      assignmentsRepo.all().map((a) =>
        a.id === id ? { ...a, submission, status: "submitted" as const } : a,
      ),
    );
  },
};

export const announcementsRepo = {
  all: () => read<Announcement[]>("announcements", seedAnnouncements),
  save: (list: Announcement[]) => write("announcements", list),
  markRead(id: string) {
    return announcementsRepo.save(
      announcementsRepo.all().map((a) => (a.id === id ? { ...a, read: true } : a)),
    );
  },
  markAllRead() {
    return announcementsRepo.save(announcementsRepo.all().map((a) => ({ ...a, read: true })));
  },
  add(data: Omit<Announcement, "id" | "read">) {
    const list = announcementsRepo.all();
    const entry: Announcement = { ...data, id: `ANN-${list.length + 5}`, read: false };
    announcementsRepo.save([entry, ...list]);
    return entry;
  },
};

export const certificatesRepo = {
  all: () => read<Certificate[]>("certificates", seedCertificates),
};

export const progressRepo = {
  get: () => read<SkillProgress>("progress", seedProgress),
};

export const groupsRepo = {
  all: () => read<CourseGroup[]>("groups", seedGroups),
  save: (list: CourseGroup[]) => write("groups", list),
  upsert(group: CourseGroup) {
    const list = groupsRepo.all();
    const idx = list.findIndex((g) => g.id === group.id);
    if (idx >= 0) list[idx] = group;
    else list.push(group);
    return groupsRepo.save(list);
  },
  remove: (id: string) => groupsRepo.save(groupsRepo.all().filter((g) => g.id !== id)),
  nextId: () => `GRP-${groupsRepo.all().length + 1}`,
};

export const paymentsRepo = {
  all: () => read<PaymentRecord[]>("payments", seedPayments),
  save: (list: PaymentRecord[]) => write("payments", list),
  forStudent: (studentId: string) => paymentsRepo.all().filter((p) => p.studentId === studentId),
  add(studentId: string, amount: number, method: string, note?: string) {
    const list = paymentsRepo.all();
    const entry: PaymentRecord = {
      id: `PAY-${9005 + list.length}`,
      studentId,
      amount,
      method,
      note,
      date: new Date().toISOString().slice(0, 10),
    };
    paymentsRepo.save([entry, ...list]);
    const student = studentsRepo.get(studentId);
    if (student) {
      const paid = student.paid + amount;
      const due = student.total - student.discount;
      studentsRepo.upsert({
        ...student,
        paid,
        paymentStatus: paid >= due ? "paid" : paid > 0 ? "partial" : "pending",
      });
    }
    return entry;
  },
};

export const notificationsRepo = {
  all: () => read<NotificationItem[]>("notifications", seedNotifications),
  save: (list: NotificationItem[]) => write("notifications", list),
  markAllRead: () =>
    notificationsRepo.save(notificationsRepo.all().map((n) => ({ ...n, read: true }))),
  add(title: { en: string; ar: string }, kind: NotificationItem["kind"]) {
    const list = notificationsRepo.all();
    return notificationsRepo.save([
      { id: `NTF-${list.length + 6}`, title, kind, date: new Date().toISOString().slice(0, 10), read: false },
      ...list,
    ]);
  },
};

/* ----------------------------- placement results ----------------------------- */

export type PlacementResult = { level: string; correct: number; total: number; program: string; date: string };

export const placementRepo = {
  questions: placementQuestions,
  get: () => read<PlacementResult | null>("placement", null),
  set: (result: PlacementResult) => write("placement", result),
  clear: () => write<PlacementResult | null>("placement", null),
};

/* ---------------------------------- session ---------------------------------- */

const DEMO_PASSWORD = "langport";

export const sessionRepo = {
  current: () => read<Session | null>("session", null),
  set: (session: Session | null) => write("session", session),
  login(identifier: string, password: string): Session | null {
    const id = identifier.trim().toLowerCase();
    if (password !== DEMO_PASSWORD) return null;
    if (id === "admin@langport.com" || id === "admin") {
      return sessionRepo.set({ role: "admin", name: "Langport Admin", email: "admin@langport.com" });
    }
    const student = studentsRepo
      .all()
      .find((s) => s.email.toLowerCase() === id || s.mobile.replace(/\s/g, "") === identifier.replace(/\s/g, ""));
    if (!student) return null;
    return sessionRepo.set({ role: "student", studentId: student.id, name: student.name, email: student.email });
  },
  logout: () => sessionRepo.set(null),
};

export { instructors };
