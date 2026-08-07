// Dashboard screenshots
import dmsAppointmentForm from "@/assests/dashboard/dms_appointment_form.png";
import dmsAppointmentMgmt from "@/assests/dashboard/dms_appointment_mgmt.png";
import dmsFormStyle from "@/assests/dashboard/dms_form_style.png";
import dmsGridTable from "@/assests/dashboard/dms_grid_table.png";
import dmsLogin from "@/assests/dashboard/dms_login.png";
import dmsPartMaster from "@/assests/dashboard/dms_part_master.png";
import dmsSidebar from "@/assests/dashboard/dms_sidebar.png";

// iPad screenshots
import ipad768 from "@/assests/ipad/ipad_768x1024.png";
import ipadAdvanceFilter from "@/assests/ipad/ipad_Advance_Filter.png";
import ipadCalender from "@/assests/ipad/ipad_Calender.png";
import ipadCancelLesson from "@/assests/ipad/ipad_Cancel_Lesson.png";
import ipadEvaluations from "@/assests/ipad/ipad_Evaluations.png";
import ipadFiles from "@/assests/ipad/ipad_Files.png";
import ipadHomeScreen from "@/assests/ipad/ipad_Home_Screen-Upcoming_Schedule.png";
import ipadInfo from "@/assests/ipad/ipad_Info.png";
import ipadNotes from "@/assests/ipad/ipad_Inser_standard_Public_Notes.png";
import ipadLessonDetails from "@/assests/ipad/ipad_Lesson_Details.png";
import ipadLogin from "@/assests/ipad/ipad_Login.png";
import ipadProcessLesson from "@/assests/ipad/ipad_Process_Lesson.png";
import ipadViewAll from "@/assests/ipad/ipad_View_All.png";
import ipadEnterCode from "@/assests/ipad/ipad_enter-code.png";
import ipadSendCode from "@/assests/ipad/ipad_send-code.png";

// iPhone screenshots
import iphoneLoginOTP from "@/assests/iphone/Login-_with-OTP.png";
import iphoneLoginSchool from "@/assests/iphone/Login-_with-School-ID.png";
import iphoneLogout from "@/assests/iphone/Logout.png";
import iphoneNotifications from "@/assests/iphone/Notofications.png";
import iphoneResendCode from "@/assests/iphone/Resend_CODE.png";
import iphoneResendCode1 from "@/assests/iphone/Resend_CODE_1_.png";
import iphoneScreenshot3 from "@/assests/iphone/ios_screenshot_3.png";
import iphoneMenu from "@/assests/iphone/menu.png";

export interface ShowcaseItem {
  id: string;
  title: string;
  category: "Dashboard & Console" | "iPad Experience" | "Mobile Apps";
  description: string;
  src: string;
}

export const showcaseCategories = [
  "All Showcase",
  "Dashboard & Console",
  "iPad Experience",
  "Mobile Apps",
] as const;

export type ShowcaseCategory = (typeof showcaseCategories)[number];

export const showcaseItems: ShowcaseItem[] = [
  // Dashboard & Console
  {
    id: "dms-login",
    title: "Dealer Management Console — Portal Login",
    category: "Dashboard & Console",
    description: "Sleek authentication interface with role-based security access.",
    src: dmsLogin,
  },
  {
    id: "dms-appointment-mgmt",
    title: "DMS — Appointment Management Dashboard",
    category: "Dashboard & Console",
    description: "Centralized schedule & booking management console with real-time status tracking.",
    src: dmsAppointmentMgmt,
  },
  {
    id: "dms-appointment-form",
    title: "DMS — Appointment Booking Form",
    category: "Dashboard & Console",
    description: "Multi-step interactive form tailored for rapid service scheduling.",
    src: dmsAppointmentForm,
  },
  {
    id: "dms-grid-table",
    title: "DMS — Enterprise Data Grid & Analytics",
    category: "Dashboard & Console",
    description: "High-density data grid UI with column sorting, batch actions, and filter presets.",
    src: dmsGridTable,
  },
  {
    id: "dms-part-master",
    title: "DMS — Inventory & Part Master Management",
    category: "Dashboard & Console",
    description: "Catalog and inventory tracking interface with automated stock warnings.",
    src: dmsPartMaster,
  },
  {
    id: "dms-sidebar",
    title: "DMS — Collapsible Sidebar Navigation",
    category: "Dashboard & Console",
    description: "Ergonomic side navigation system with hierarchical module mapping.",
    src: dmsSidebar,
  },
  {
    id: "dms-form-style",
    title: "DMS — UI Component & Form System",
    category: "Dashboard & Console",
    description: "Standardized form controls, inputs, and validation state indicators.",
    src: dmsFormStyle,
  },

  // iPad Experience
  {
    id: "ipad-home-screen",
    title: "Instructor App — Upcoming Schedule",
    category: "iPad Experience",
    description: "Tablet-optimized dashboard featuring daily timeline and quick lesson launcher.",
    src: ipadHomeScreen,
  },
  {
    id: "ipad-lesson-details",
    title: "Instructor App — Lesson Overview & Progress",
    category: "iPad Experience",
    description: "Comprehensive lesson view detailing student goals, route plans, and time tracking.",
    src: ipadLessonDetails,
  },
  {
    id: "ipad-calender",
    title: "Instructor App — Interactive Calendar",
    category: "iPad Experience",
    description: "Full-screen monthly & weekly calendar views for instructor scheduling.",
    src: ipadCalender,
  },
  {
    id: "ipad-evaluations",
    title: "Instructor App — Student Evaluations & Scoring",
    category: "iPad Experience",
    description: "Digital rubric and feedback assessment sheet with grading parameters.",
    src: ipadEvaluations,
  },
  {
    id: "ipad-advance-filter",
    title: "Instructor App — Advanced Student Filter",
    category: "iPad Experience",
    description: "Multi-attribute filter dialog for instantly locating student records.",
    src: ipadAdvanceFilter,
  },
  {
    id: "ipad-process-lesson",
    title: "Instructor App — In-Progress Lesson Workflow",
    category: "iPad Experience",
    description: "Live lesson status management console with quick action buttons.",
    src: ipadProcessLesson,
  },
  {
    id: "ipad-files",
    title: "Instructor App — Student Document Repository",
    category: "iPad Experience",
    description: "Cloud file attachment and document viewer interface.",
    src: ipadFiles,
  },
  {
    id: "ipad-notes",
    title: "Instructor App — Public Notes & Guidelines",
    category: "iPad Experience",
    description: "Reusable template selector for quick lesson feedback notes.",
    src: ipadNotes,
  },
  {
    id: "ipad-cancel-lesson",
    title: "Instructor App — Lesson Cancellation Sheet",
    category: "iPad Experience",
    description: "Policy verification and reason selection modal for rescheduled sessions.",
    src: ipadCancelLesson,
  },
  {
    id: "ipad-view-all",
    title: "Instructor App — All Schedule Records",
    category: "iPad Experience",
    description: "Master list view with status indicators and search capabilities.",
    src: ipadViewAll,
  },
  {
    id: "ipad-info",
    title: "Instructor App — Student Profile Info",
    category: "iPad Experience",
    description: "Detailed card layout showcasing student contact, permit status, and history.",
    src: ipadInfo,
  },
  {
    id: "ipad-login",
    title: "Instructor App — Tablet Secure Authentication",
    category: "iPad Experience",
    description: "Touch-friendly tablet login screen.",
    src: ipadLogin,
  },
  {
    id: "ipad-send-code",
    title: "Instructor App — 2FA Code Dispatch",
    category: "iPad Experience",
    description: "Verification code verification dispatch screen.",
    src: ipadSendCode,
  },
  {
    id: "ipad-enter-code",
    title: "Instructor App — 2FA Security Entry",
    category: "iPad Experience",
    description: "PIN input screen with auto-focus keypad interaction.",
    src: ipadEnterCode,
  },
  {
    id: "ipad-768",
    title: "Instructor App — Adaptive Tablet Layout",
    category: "iPad Experience",
    description: "Portrait mode viewport layout optimized for 768px screens.",
    src: ipad768,
  },

  // Mobile Apps (iPhone)
  {
    id: "iphone-login-otp",
    title: "Mobile Student Portal — OTP Authentication",
    category: "Mobile Apps",
    description: "One-Time Password verification screen built for mobile phones.",
    src: iphoneLoginOTP,
  },
  {
    id: "iphone-login-school",
    title: "Mobile Student Portal — School ID Login",
    category: "Mobile Apps",
    description: "Fast-track organization authentication screen.",
    src: iphoneLoginSchool,
  },
  {
    id: "iphone-notifications",
    title: "Mobile Student Portal — Alerts & Notifications",
    category: "Mobile Apps",
    description: "Push notification feed for upcoming drives and schedule changes.",
    src: iphoneNotifications,
  },
  {
    id: "iphone-menu",
    title: "Mobile Student Portal — Navigation Menu",
    category: "Mobile Apps",
    description: "Clean drawer navigation for mobile screen sizes.",
    src: iphoneMenu,
  },
  {
    id: "iphone-screenshot-3",
    title: "Mobile Student Portal — Dashboard View",
    category: "Mobile Apps",
    description: "Mobile-first student progress dashboard.",
    src: iphoneScreenshot3,
  },
  {
    id: "iphone-resend-code",
    title: "Mobile Student Portal — Verification Flow",
    category: "Mobile Apps",
    description: "Security token resend screen with timer.",
    src: iphoneResendCode,
  },
  {
    id: "iphone-resend-code-1",
    title: "Mobile Student Portal — Security Confirmation",
    category: "Mobile Apps",
    description: "Confirmation state for phone verification.",
    src: iphoneResendCode1,
  },
  {
    id: "iphone-logout",
    title: "Mobile Student Portal — Session Sign Out",
    category: "Mobile Apps",
    description: "Clean sign out confirmation screen.",
    src: iphoneLogout,
  },
];
