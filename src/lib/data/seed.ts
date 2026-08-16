import type {
  Announcement,
  Assignment,
  Certificate,
  ClassSession,
  CourseGroup,
  Material,
  NotificationItem,
  PaymentRecord,
  Registration,
  SkillProgress,
  Student,
} from "./types";

/** Fixed reference date so seeded schedules stay deterministic (no SSR/CSR mismatch). */
const BASE = "2026-08-17";

function day(offset: number) {
  const d = new Date(`${BASE}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

export const instructors = ["Sarah Mansour", "Omar Khaled", "Nadia Fahmy", "Youssef Adel"];

export const seedStudents: Student[] = [
  {
    id: "STD-1001",
    name: "Ammar Elgndy",
    email: "student@langport.com",
    mobile: "+20 100 123 4567",
    age: 24,
    program: "general-english",
    level: "B1",
    group: "GE-B1-Evening-A",
    instructor: "Sarah Mansour",
    status: "active",
    startDate: day(-28),
    endDate: day(28),
    progress: 62,
    attendanceRate: 92,
    paymentStatus: "partial",
    total: 2400,
    discount: 200,
    paid: 1200,
    packageName: "General English — Level B1 (32h)",
  },
  {
    id: "STD-1002",
    name: "Mariam Hassan",
    email: "mariam@example.com",
    mobile: "+20 101 555 8899",
    age: 21,
    program: "ielts",
    level: "B2",
    group: "IELTS-B2-Intensive",
    instructor: "Omar Khaled",
    status: "active",
    startDate: day(-14),
    endDate: day(56),
    progress: 34,
    attendanceRate: 88,
    paymentStatus: "paid",
    total: 3600,
    discount: 0,
    paid: 3600,
    packageName: "IELTS Preparation (40h)",
  },
  {
    id: "STD-1003",
    name: "Karim Adel",
    email: "karim@example.com",
    mobile: "+20 122 400 1122",
    age: 32,
    program: "business-english",
    level: "B2",
    group: "BE-Corporate-01",
    instructor: "Nadia Fahmy",
    status: "active",
    startDate: day(-7),
    endDate: day(49),
    progress: 18,
    attendanceRate: 100,
    paymentStatus: "pending",
    total: 3200,
    discount: 320,
    paid: 0,
    packageName: "Business English (32h)",
  },
  {
    id: "STD-1004",
    name: "Hana Sameh",
    email: "hana@example.com",
    mobile: "+20 111 909 3344",
    age: 16,
    program: "teenagers",
    level: "A2",
    group: "TEEN-A2-Weekend",
    instructor: "Youssef Adel",
    status: "active",
    startDate: day(-21),
    endDate: day(35),
    progress: 47,
    attendanceRate: 76,
    paymentStatus: "confirmed",
    total: 1800,
    discount: 0,
    paid: 1800,
    packageName: "Teenagers' Program (24h)",
  },
  {
    id: "STD-1005",
    name: "Tarek Nabil",
    email: "tarek@example.com",
    mobile: "+20 128 771 2200",
    age: 29,
    program: "talkie",
    level: "B1",
    group: "TALKIE-B1-Night",
    instructor: "Sarah Mansour",
    status: "inactive",
    startDate: day(-70),
    endDate: day(-14),
    progress: 100,
    attendanceRate: 81,
    paymentStatus: "paid",
    total: 1900,
    discount: 100,
    paid: 1800,
    packageName: "Talkie Program (24h)",
  },
];

export const seedClasses: ClassSession[] = [
  { id: "CLS-401", title: { en: "Unit 5 — Talking about experiences", ar: "الوحدة ٥ — الحديث عن التجارب" }, courseGroup: "GE-B1-Evening-A", instructor: "Sarah Mansour", date: day(-6), time: "18:00 – 20:00", status: "completed", link: "https://meet.langport.com/ge-b1-a", attendance: "attended" },
  { id: "CLS-402", title: { en: "Unit 5 — Present perfect in conversation", ar: "الوحدة ٥ — المضارع التام في المحادثة" }, courseGroup: "GE-B1-Evening-A", instructor: "Sarah Mansour", date: day(-3), time: "18:00 – 20:00", status: "completed", link: "https://meet.langport.com/ge-b1-a", attendance: "late" },
  { id: "CLS-403", title: { en: "Unit 6 — Describing places", ar: "الوحدة ٦ — وصف الأماكن" }, courseGroup: "GE-B1-Evening-A", instructor: "Sarah Mansour", date: day(-1), time: "18:00 – 20:00", status: "completed", link: "https://meet.langport.com/ge-b1-a", attendance: "absent" },
  { id: "CLS-404", title: { en: "Unit 6 — Listening lab & speaking task", ar: "الوحدة ٦ — معمل استماع ونشاط محادثة" }, courseGroup: "GE-B1-Evening-A", instructor: "Sarah Mansour", date: day(1), time: "18:00 – 20:00", status: "upcoming", link: "https://meet.langport.com/ge-b1-a" },
  { id: "CLS-405", title: { en: "Unit 6 — Writing workshop", ar: "الوحدة ٦ — ورشة كتابة" }, courseGroup: "GE-B1-Evening-A", instructor: "Sarah Mansour", date: day(4), time: "18:00 – 20:00", status: "upcoming", link: "https://meet.langport.com/ge-b1-a" },
  { id: "CLS-406", title: { en: "Unit 7 — Future plans", ar: "الوحدة ٧ — خطط المستقبل" }, courseGroup: "GE-B1-Evening-A", instructor: "Sarah Mansour", date: day(8), time: "18:00 – 20:00", status: "upcoming", link: "https://meet.langport.com/ge-b1-a" },
  { id: "CLS-407", title: { en: "IELTS Writing Task 2 strategy", ar: "استراتيجية الكتابة IELTS المهمة ٢" }, courseGroup: "IELTS-B2-Intensive", instructor: "Omar Khaled", date: day(2), time: "19:00 – 21:00", status: "upcoming", link: "https://meet.langport.com/ielts-b2" },
  { id: "CLS-408", title: { en: "Business meetings role play", ar: "تمثيل أدوار اجتماعات العمل" }, courseGroup: "BE-Corporate-01", instructor: "Nadia Fahmy", date: day(3), time: "13:00 – 15:00", status: "upcoming", link: "https://meet.langport.com/be-01" },
];

export const seedMaterials: Material[] = [
  { id: "MAT-1", title: { en: "Coursebook — General English B1", ar: "الكتاب — الإنجليزية العامة B1" }, kind: "coursebook", unit: "All units", size: { en: "PDF · 18 MB", ar: "PDF · ١٨ م.ب" } },
  { id: "MAT-2", title: { en: "Unit 5 worksheet — Present perfect", ar: "ورقة عمل الوحدة ٥ — المضارع التام" }, kind: "worksheet", unit: "Unit 5", size: { en: "PDF · 1.2 MB", ar: "PDF · ١.٢ م.ب" } },
  { id: "MAT-3", title: { en: "Unit 5 listening audio", ar: "استماع الوحدة ٥" }, kind: "audio", unit: "Unit 5", size: { en: "MP3 · 9 min", ar: "MP3 · ٩ دقائق" } },
  { id: "MAT-4", title: { en: "Pronunciation video — word stress", ar: "فيديو النطق — نبر الكلمات" }, kind: "video", unit: "Unit 6", size: { en: "MP4 · 12 min", ar: "MP4 · ١٢ دقيقة" } },
  { id: "MAT-5", title: { en: "Extra practice — vocabulary set 6", ar: "تدريب إضافي — مفردات ٦" }, kind: "practice", unit: "Unit 6", size: { en: "Online · 20 items", ar: "أونلاين · ٢٠ عنصرًا" } },
  { id: "MAT-6", title: { en: "Recording — Unit 5 session 2", ar: "تسجيل — الوحدة ٥ الحصة ٢" }, kind: "recording", unit: "Unit 5", size: { en: "Video · 118 min", ar: "فيديو · ١١٨ دقيقة" } },
  { id: "MAT-7", title: { en: "Grammar reference — B1 tenses", ar: "مرجع القواعد — أزمنة B1" }, kind: "pdf", unit: "Reference", size: { en: "PDF · 3.4 MB", ar: "PDF · ٣.٤ م.ب" } },
];

export const seedAssignments: Assignment[] = [
  { id: "ASG-1", title: { en: "Unit 5 writing — A memorable trip", ar: "كتابة الوحدة ٥ — رحلة لا تُنسى" }, unit: "Unit 5", dueDate: day(-4), status: "reviewed", submission: "my-trip.pdf", grade: "8.5 / 10", feedback: { en: "Strong structure and vocabulary. Watch article use (a/the) and vary sentence openings.", ar: "بنية ومفردات جيدة. انتبه لاستخدام أدوات التعريف وتنويع بدايات الجمل." } },
  { id: "ASG-2", title: { en: "Unit 5 speaking recording", ar: "تسجيل محادثة الوحدة ٥" }, unit: "Unit 5", dueDate: day(-1), status: "submitted", submission: "speaking-u5.m4a" },
  { id: "ASG-3", title: { en: "Unit 6 vocabulary quiz", ar: "اختبار مفردات الوحدة ٦" }, unit: "Unit 6", dueDate: day(3), status: "pending" },
  { id: "ASG-4", title: { en: "Unit 6 writing — Describe your city", ar: "كتابة الوحدة ٦ — صف مدينتك" }, unit: "Unit 6", dueDate: day(6), status: "pending" },
];

export const seedAnnouncements: Announcement[] = [
  { id: "ANN-1", title: { en: "Friday class moved to Saturday", ar: "تم نقل حصة الجمعة إلى السبت" }, body: { en: "Due to a public holiday, this week's Friday session moves to Saturday at the same time.", ar: "بسبب العطلة الرسمية، تم نقل حصة الجمعة لهذا الأسبوع إلى السبت في نفس الموعد." }, category: "schedule", date: day(-2), read: false },
  { id: "ANN-2", title: { en: "Unit 6 materials are now available", ar: "مواد الوحدة ٦ متاحة الآن" }, body: { en: "Worksheets, audio and the extra practice set for Unit 6 have been added to Learning Materials.", ar: "تمت إضافة أوراق العمل والاستماع والتدريب الإضافي للوحدة ٦ في المواد التعليمية." }, category: "course", date: day(-3), read: false },
  { id: "ANN-3", title: { en: "Progress test on Unit 5–6", ar: "اختبار تقدم على الوحدتين ٥ و٦" }, body: { en: "Your level progress test takes place in two weeks and covers Units 5 and 6.", ar: "اختبار تقدم المستوى بعد أسبوعين ويغطي الوحدتين ٥ و٦." }, category: "deadline", date: day(-5), read: true },
  { id: "ANN-4", title: { en: "New Talkie cycle opens next month", ar: "دورة Talkie الجديدة الشهر القادم" }, body: { en: "Langport students get a 10% discount when joining a second program.", ar: "يحصل طلاب لانجبورت على خصم ١٠٪ عند الانضمام لبرنامج ثانٍ." }, category: "general", date: day(-9), read: true },
];

export const seedCertificates: Certificate[] = [
  { id: "CERT-1", course: { en: "General English — Level A2", ar: "الإنجليزية العامة — المستوى A2" }, level: "A2", completedAt: day(-98), certId: "LP-A2-2025-0417" },
  { id: "CERT-2", course: { en: "Talkie Program — Conversation & Fluency", ar: "برنامج Talkie — المحادثة والطلاقة" }, level: "A2+", completedAt: day(-42), certId: "LP-TK-2026-0093" },
];

export const seedProgress: SkillProgress = {
  overall: 62,
  speaking: 58,
  listening: 66,
  reading: 71,
  writing: 54,
  vocabulary: 64,
  grammar: 60,
  feedback: {
    en: "Great participation in speaking tasks — your fluency is improving faster than your accuracy, which is normal at B1. Focus on writing structure and past tense forms this month.",
    ar: "مشاركة ممتازة في أنشطة المحادثة — طلاقتك تتقدم أسرع من الدقة وهذا طبيعي في B1. ركّز هذا الشهر على بنية الكتابة وصيغ الماضي.",
  },
};

export const seedGroups: CourseGroup[] = [
  { id: "GRP-1", name: "GE-B1-Evening-A", program: "general-english", level: "B1", instructor: "Sarah Mansour", schedule: { en: "Sat & Tue · 18:00–20:00", ar: "السبت والثلاثاء · ٦–٨ م" }, students: 9, startDate: day(-28), endDate: day(28) },
  { id: "GRP-2", name: "IELTS-B2-Intensive", program: "ielts", level: "B2", instructor: "Omar Khaled", schedule: { en: "Sun & Wed · 19:00–21:00", ar: "الأحد والأربعاء · ٧–٩ م" }, students: 7, startDate: day(-14), endDate: day(56) },
  { id: "GRP-3", name: "BE-Corporate-01", program: "business-english", level: "B2", instructor: "Nadia Fahmy", schedule: { en: "Mon & Thu · 13:00–15:00", ar: "الاثنين والخميس · ١–٣ م" }, students: 12, startDate: day(-7), endDate: day(49) },
  { id: "GRP-4", name: "TEEN-A2-Weekend", program: "teenagers", level: "A2", instructor: "Youssef Adel", schedule: { en: "Fri & Sat · 11:00–13:00", ar: "الجمعة والسبت · ١١ص–١م" }, students: 11, startDate: day(-21), endDate: day(35) },
];

export const seedRegistrations: Registration[] = [
  { id: "REG-2041", fullName: "Salma Ibrahim", mobile: "+20 100 998 7766", email: "salma@example.com", age: "22", currentLevel: "A2", program: "general-english", preferredSchedule: "Evening (6–8 PM)", createdAt: day(-1), status: "new" },
  { id: "REG-2042", fullName: "Mostafa Zaki", mobile: "+20 106 220 5544", email: "mostafa@example.com", age: "27", currentLevel: "B2", program: "ielts", preferredSchedule: "Weekend", goal: "Study abroad", createdAt: day(-2), status: "contacted" },
  { id: "REG-2043", fullName: "Lina Ashraf", mobile: "+20 115 330 1199", email: "lina@example.com", age: "15", currentLevel: "Not sure", program: "teenagers", preferredSchedule: "Weekend morning", source: "Instagram", createdAt: day(-3), status: "new" },
];

export const seedPayments: PaymentRecord[] = [
  { id: "PAY-9001", studentId: "STD-1001", amount: 1200, method: "Instapay", date: day(-28), note: "First installment" },
  { id: "PAY-9002", studentId: "STD-1002", amount: 3600, method: "Cash", date: day(-14) },
  { id: "PAY-9003", studentId: "STD-1004", amount: 1800, method: "Bank transfer", date: day(-21) },
  { id: "PAY-9004", studentId: "STD-1005", amount: 1800, method: "Instapay", date: day(-70) },
];

export const seedNotifications: NotificationItem[] = [
  { id: "NTF-1", title: { en: "New assignment: Unit 6 vocabulary quiz", ar: "واجب جديد: اختبار مفردات الوحدة ٦" }, kind: "assignment", date: day(-1), read: false },
  { id: "NTF-2", title: { en: "Class reminder: tomorrow 18:00", ar: "تذكير بالحصة: غدًا ٦ م" }, kind: "reminder", date: day(0), read: false },
  { id: "NTF-3", title: { en: "Feedback added to Unit 5 writing", ar: "تمت إضافة تقييم كتابة الوحدة ٥" }, kind: "feedback", date: day(-4), read: true },
  { id: "NTF-4", title: { en: "Payment received — 1,200 EGP", ar: "تم استلام دفعة — ١٢٠٠ ج.م" }, kind: "payment", date: day(-28), read: true },
  { id: "NTF-5", title: { en: "Schedule change: Friday session moved", ar: "تغيير الجدول: نقل حصة الجمعة" }, kind: "schedule", date: day(-2), read: true },
];

export const placementQuestions: {
  id: string;
  prompt: Bi2;
  options: string[];
  answer: number;
  band: "A1" | "A2" | "B1" | "B2" | "C1";
}[] = [
  { id: "q1", prompt: { en: "She ___ from Egypt.", ar: "She ___ from Egypt." }, options: ["is", "are", "am", "be"], answer: 0, band: "A1" },
  { id: "q2", prompt: { en: "I ___ coffee every morning.", ar: "I ___ coffee every morning." }, options: ["drinking", "drinks", "drink", "drank"], answer: 2, band: "A1" },
  { id: "q3", prompt: { en: "There ___ any milk in the fridge.", ar: "There ___ any milk in the fridge." }, options: ["isn't", "aren't", "don't", "hasn't"], answer: 0, band: "A2" },
  { id: "q4", prompt: { en: "We went to the cinema ___ Saturday evening.", ar: "We went to the cinema ___ Saturday evening." }, options: ["in", "at", "on", "to"], answer: 2, band: "A2" },
  { id: "q5", prompt: { en: "I ___ in Cairo since 2019.", ar: "I ___ in Cairo since 2019." }, options: ["live", "am living", "have lived", "lived"], answer: 2, band: "B1" },
  { id: "q6", prompt: { en: "If it rains tomorrow, we ___ the trip.", ar: "If it rains tomorrow, we ___ the trip." }, options: ["will cancel", "cancelled", "would cancel", "cancel"], answer: 0, band: "B1" },
  { id: "q7", prompt: { en: "She said she ___ finished the report before the meeting.", ar: "She said she ___ finished the report before the meeting." }, options: ["has", "had", "have", "was"], answer: 1, band: "B2" },
  { id: "q8", prompt: { en: "The project, ___ took six months, was a success.", ar: "The project, ___ took six months, was a success." }, options: ["what", "who", "which", "whose"], answer: 2, band: "B2" },
  { id: "q9", prompt: { en: "Hardly ___ the meeting started when the power went out.", ar: "Hardly ___ the meeting started when the power went out." }, options: ["has", "had", "did", "was"], answer: 1, band: "C1" },
  { id: "q10", prompt: { en: "Her argument was ___ compelling that nobody objected.", ar: "Her argument was ___ compelling that nobody objected." }, options: ["such", "too", "so", "very"], answer: 2, band: "C1" },
];

type Bi2 = { en: string; ar: string };
