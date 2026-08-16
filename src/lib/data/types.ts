export type Bi = { en: string; ar: string };
export type BiList = { en: string[]; ar: string[] };

export type Program = {
  slug: string;
  name: Bi;
  tagline: Bi;
  icon: string;
  whoFor: Bi;
  goal: Bi;
  recommendedLevel: string;
  duration: Bi;
  schedule: Bi;
  outcomes: BiList;
  content: BiList;
  included: BiList;
  price: Bi;
  howToJoin: Bi;
  cta: "register" | "contact";
};

export type Level = { code: string; name: Bi; description: Bi };

export type PaymentStatus = "pending" | "partial" | "paid" | "confirmed";

export type Student = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age: number;
  program: string; // program slug
  level: string;
  group: string;
  instructor: string;
  status: "active" | "inactive";
  startDate: string;
  endDate: string;
  progress: number;
  attendanceRate: number;
  paymentStatus: PaymentStatus;
  total: number;
  discount: number;
  paid: number;
  packageName: string;
};

export type Registration = {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  age: string;
  currentLevel: string;
  program: string;
  preferredSchedule: string;
  previousCourses?: string;
  goal?: string;
  source?: string;
  createdAt: string;
  status: "new" | "contacted" | "enrolled";
};

export type ClassSession = {
  id: string;
  title: Bi;
  courseGroup: string;
  instructor: string;
  date: string; // ISO date
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  link: string;
  attendance?: "attended" | "absent" | "late";
};

export type Material = {
  id: string;
  title: Bi;
  kind: "pdf" | "worksheet" | "video" | "audio" | "practice" | "recording" | "coursebook";
  unit: string;
  size: Bi;
};

export type Assignment = {
  id: string;
  title: Bi;
  unit: string;
  dueDate: string;
  status: "pending" | "submitted" | "reviewed";
  submission?: string;
  feedback?: Bi | { en: string; ar: string };
  grade?: string;
};

export type Announcement = {
  id: string;
  title: Bi;
  body: Bi;
  category: "schedule" | "class" | "deadline" | "course" | "general";
  date: string;
  read: boolean;
};

export type Certificate = {
  id: string;
  course: Bi;
  level: string;
  completedAt: string;
  certId: string;
};

export type SkillProgress = {
  overall: number;
  speaking: number;
  listening: number;
  reading: number;
  writing: number;
  vocabulary: number;
  grammar: number;
  feedback: Bi;
};

export type PaymentRecord = {
  id: string;
  studentId: string;
  amount: number;
  method: string;
  date: string;
  note?: string;
};

export type CourseGroup = {
  id: string;
  name: string;
  program: string;
  level: string;
  instructor: string;
  schedule: Bi;
  students: number;
  startDate: string;
  endDate: string;
};

export type NotificationItem = {
  id: string;
  title: Bi;
  kind: "registration" | "payment" | "reminder" | "schedule" | "assignment" | "feedback" | "announcement";
  date: string;
  read: boolean;
};

export type Session = { role: "student" | "admin"; studentId?: string; name: string; email: string };
