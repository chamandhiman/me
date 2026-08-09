import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { LightRays, Vignette } from "@/components/backgrounds";
import { ArrowUp } from "lucide-react";
import { CharReveal, Eyebrow, Reveal, Section } from "@/components/motion-kit";
import { playUISound } from "@/lib/sound";


// Laptop case-study screenshots
import centralizedAdminImg from "@/assests/case-study/centralized_admin.jpg";
import studentPortalImg from "@/assests/case-study/student_portal.jpg";
import staffPortalImg from "@/assests/case-study/staff_portal.jpg";

// Dashboard screenshots
import dmsAppointmentForm from "@/assests/dashboard/dms_appointment_form.png";
import dmsAppointmentMgmt from "@/assests/dashboard/dms_appointment_mgmt.png";
import dmsFormStyle from "@/assests/dashboard/dms_form_style.png";
import dmsGridTable from "@/assests/dashboard/dms_grid_table.png";
import dmsLogin from "@/assests/dashboard/dms_login.png";
import dmsPartMaster from "@/assests/dashboard/dms_part_master.png";
import dmsSidebar from "@/assests/dashboard/dms_sidebar.png";

// iPad screenshots
import ipadAdvanceFilter from "@/assests/ipad/ipad_Advance_Filter.png";
import ipadCalender from "@/assests/ipad/ipad_Calender.png";
import ipadEvaluations from "@/assests/ipad/ipad_Evaluations.png";
import ipadFiles from "@/assests/ipad/ipad_Files.png";
import ipadHomeScreen from "@/assests/ipad/ipad_Home_Screen-Upcoming_Schedule.png";
import ipadNotes from "@/assests/ipad/ipad_Inser_standard_Public_Notes.png";
import ipadLessonDetails from "@/assests/ipad/ipad_Lesson_Details.png";
import ipadProcessLesson from "@/assests/ipad/ipad_Process_Lesson.png";

// iPhone screenshots
import iphoneLoginOTP from "@/assests/iphone/Login-_with-OTP.png";
import iphoneLoginSchool from "@/assests/iphone/Login-_with-School-ID.png";
import iphoneNotifications from "@/assests/iphone/Notofications.png";
import iphoneScreenshot3 from "@/assests/iphone/ios_screenshot_3.png";
import iphoneMenu from "@/assests/iphone/menu.png";

interface ModalImage {
  src: string;
  title: string;
  category: string;
}

// -------------------------------------------------------------
// DATA STRUCTURES FOR PRODUCT CASE STUDIES
// -------------------------------------------------------------

const drivingSchoolModules = [
  {
    id: "admin",
    num: "01",
    name: "CENTRALIZED ADMIN",
    roleLabel: "For School Owners",
    purpose: "Operations, scheduling & centralized school management console",
    icon: Monitor,
    primaryImage: centralizedAdminImg,
    liveUrl: "https://www.driversed.software/driversed.software/devaccess/DSS2/centralizedAdmin/index.html",
    gallery: [
      { src: centralizedAdminImg, title: "Centralized Admin Laptop Console", category: "Admin Console" },
      { src: dmsAppointmentMgmt, title: "Centralized Appointment Console", category: "Admin Console" },
      { src: dmsLogin, title: "Admin Portal Authentication", category: "Admin Console" },
      { src: dmsGridTable, title: "Data Grid & Fleet Management", category: "Admin Console" },
      { src: dmsAppointmentForm, title: "Scheduling & Booking Form", category: "Admin Console" },
      { src: dmsPartMaster, title: "System Configuration & Master Data", category: "Admin Console" },
      { src: dmsSidebar, title: "Navigation & Module Management", category: "Admin Console" },
    ],
  },
  {
    id: "student",
    num: "02",
    name: "STUDENT PORTAL",
    roleLabel: "For Students",
    purpose: "Student-facing learning, appointment tracking & account experience",
    icon: Smartphone,
    primaryImage: studentPortalImg,
    liveUrl: "https://www.driversed.software/driversed.software/devaccess/DSS2/centralizedStudentPortal/",
    gallery: [
      { src: studentPortalImg, title: "Student Portal Laptop Experience", category: "Student App" },
      { src: iphoneLoginSchool, title: "Student School ID Authentication", category: "Student App" },
      { src: iphoneLoginOTP, title: "OTP Security Verification", category: "Student App" },
      { src: iphoneNotifications, title: "Lesson Reminders & Notifications", category: "Student App" },
      { src: iphoneMenu, title: "Student Dashboard Navigation", category: "Student App" },
      { src: iphoneScreenshot3, title: "Lesson Progress & Schedule View", category: "Student App" },
    ],
  },
  {
    id: "staff",
    num: "03",
    name: "STAFF PORTAL",
    roleLabel: "For School Staff",
    purpose: "Instructor workflows, mobile evaluations & daily operations",
    icon: Tablet,
    primaryImage: staffPortalImg,
    liveUrl: "https://www.driversed.software/driversed.software/devaccess/DSS2/StaffMobile/index.html",
    gallery: [
      { src: staffPortalImg, title: "Staff Portal Laptop Interface", category: "Staff App" },
      { src: ipadHomeScreen, title: "Instructor Schedule & Daily Roster", category: "Staff App" },
      { src: ipadLessonDetails, title: "Detailed Lesson Execution", category: "Staff App" },
      { src: ipadCalender, title: "Interactive Instructor Calendar", category: "Staff App" },
      { src: ipadEvaluations, title: "Student Evaluation & Scoring", category: "Staff App" },
      { src: ipadAdvanceFilter, title: "Advanced Student Filtering", category: "Staff App" },
      { src: ipadProcessLesson, title: "Lesson Processing & Sign-off", category: "Staff App" },
      { src: ipadFiles, title: "Document & File Attachment Manager", category: "Staff App" },
      { src: ipadNotes, title: "Public & Internal Instructor Notes", category: "Staff App" },
    ],
  },
];

const productJourneySteps = [
  "DISCOVERY",
  "WIREFRAMES",
  "UI DESIGN",
  "RESPONSIVE HTML",
  "DEVELOPER HANDOFF",
  "INTEGRATION",
  "STAGING / QA",
  "CLIENT DEMO",
  "ITERATION",
  "LIVE PRODUCT",
  "CONTINUOUS MODERNIZATION",
];

const drivingSchoolRoles = [
  {
    num: "01",
    title: "UX / WIREFRAMES",
    desc: "Create user flows, wireframes and interface concepts before visual development.",
  },
  {
    num: "02",
    title: "UI DESIGN",
    desc: "Translate approved concepts into detailed, responsive interface designs.",
  },
  {
    num: "03",
    title: "RESPONSIVE HTML",
    desc: "Develop clean, semantic and responsive HTML/CSS implementations from approved designs.",
  },
  {
    num: "04",
    title: "DEVELOPER HANDOFF",
    desc: "Provide production-ready HTML mockups and coordinate closely with developers during implementation.",
  },
  {
    num: "05",
    title: "INTEGRATION SUPPORT",
    desc: "Work with development teams to ensure UI components work correctly with dynamic backend data.",
  },
  {
    num: "06",
    title: "QA / UI FIXES",
    desc: "Identify and resolve UI inconsistencies and visual bugs during development, staging and after deployment.",
  },
  {
    num: "07",
    title: "CLIENT DEMOS",
    desc: "Participate in product demonstrations, present completed work and gather feedback.",
  },
  {
    num: "08",
    title: "ONGOING MODERNIZATION",
    desc: "Continue improving legacy interfaces and modernizing established product experiences without disrupting existing workflows.",
  },
];

const drivingSchoolStack = [
  { name: "HTML5",            color: "orange" },
  { name: "CSS3",             color: "blue" },
  { name: "JavaScript",      color: "yellow" },
  { name: "jQuery",          color: "cyan" },
  { name: "Bootstrap",       color: "purple" },
  { name: "Responsive Design",color: "teal" },
  { name: "Figma",           color: "pink" },
  { name: "Photoshop",       color: "indigo" },
  { name: "GitHub",          color: "slate" },
  { name: "Jira",            color: "blue" },
];

const stackColorMap: Record<string, { border: string; bg: string; text: string; icon: string; shadow: string }> = {
  orange:  { border: "border-orange-400/60",  bg: "bg-orange-950/80",  text: "text-orange-200",  icon: "text-orange-400",  shadow: "shadow-[0_0_14px_rgba(251,146,60,0.35)]" },
  blue:    { border: "border-blue-400/60",    bg: "bg-blue-950/80",    text: "text-blue-200",    icon: "text-blue-400",    shadow: "shadow-[0_0_14px_rgba(59,130,246,0.35)]" },
  yellow:  { border: "border-yellow-400/60",  bg: "bg-yellow-950/80",  text: "text-yellow-200",  icon: "text-yellow-400",  shadow: "shadow-[0_0_14px_rgba(234,179,8,0.35)]" },
  cyan:    { border: "border-cyan-400/60",    bg: "bg-cyan-950/80",    text: "text-cyan-200",    icon: "text-cyan-400",    shadow: "shadow-[0_0_14px_rgba(6,182,212,0.35)]" },
  purple:  { border: "border-purple-400/60",  bg: "bg-purple-950/80",  text: "text-purple-200",  icon: "text-purple-400",  shadow: "shadow-[0_0_14px_rgba(168,85,247,0.35)]" },
  teal:    { border: "border-teal-400/60",    bg: "bg-teal-950/80",    text: "text-teal-200",    icon: "text-teal-400",    shadow: "shadow-[0_0_14px_rgba(20,184,166,0.35)]" },
  pink:    { border: "border-pink-400/60",    bg: "bg-pink-950/80",    text: "text-pink-200",    icon: "text-pink-400",    shadow: "shadow-[0_0_14px_rgba(236,72,153,0.35)]" },
  indigo:  { border: "border-indigo-400/60",  bg: "bg-indigo-950/80",  text: "text-indigo-200",  icon: "text-indigo-400",  shadow: "shadow-[0_0_14px_rgba(99,102,241,0.35)]" },
  slate:   { border: "border-slate-400/60",   bg: "bg-slate-800/80",   text: "text-slate-200",   icon: "text-slate-400",   shadow: "shadow-[0_0_14px_rgba(148,163,184,0.25)]" },
};

const mahindraRoles = [
  {
    num: "01",
    title: "UI / UX DESIGN",
    desc: "Designed enterprise dashboard interfaces and complex workshop management workflows in Figma.",
  },
  {
    num: "02",
    title: "INFORMATION ARCHITECTURE",
    desc: "Structured dense operational information into clear, usable dashboard layouts.",
  },
  {
    num: "03",
    title: "DATA-HEAVY INTERFACES",
    desc: "Designed tables, filters, status views, forms, and management screens for complex operational data.",
  },
  {
    num: "04",
    title: "DESIGN SYSTEM",
    desc: "Maintained consistent components, spacing, typography, visual hierarchy, and interface patterns across screens.",
  },
  {
    num: "05",
    title: "WORKFLOW DESIGN",
    desc: "Translated complex workshop operations into clear dashboard flows and usable interface experiences.",
  },
];

const mahindraGallery: ModalImage[] = [
  { src: dmsGridTable, title: "Enterprise Data Grid & Workshop Management Console", category: "Mahindra Dashboard" },
  { src: dmsPartMaster, title: "Inventory & Spare Parts Master Console", category: "Mahindra Dashboard" },
  { src: dmsAppointmentMgmt, title: "Vehicle Service Appointment Manager", category: "Mahindra Dashboard" },
  { src: dmsAppointmentForm, title: "Service Booking & Repair Order Form", category: "Mahindra Dashboard" },
];

export function PortfolioShowcase() {
  const [modalImages, setModalImages] = useState<ModalImage[]>([]);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Initial mount
  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openModalWithGallery = (gallery: ModalImage[], initialIndex = 0) => {
    setModalImages(gallery);
    setActiveModalIndex(initialIndex);
  };

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  const nextModalImage = useCallback(() => {
    if (activeModalIndex === null || modalImages.length === 0) return;
    setActiveModalIndex((prev) => (prev === null ? 0 : (prev + 1) % modalImages.length));
  }, [activeModalIndex, modalImages.length]);

  const prevModalImage = useCallback(() => {
    if (activeModalIndex === null || modalImages.length === 0) return;
    setActiveModalIndex((prev) => (prev === null ? 0 : (prev - 1 + modalImages.length) % modalImages.length));
  }, [activeModalIndex, modalImages.length]);

  // Handle Keyboard Shortcuts for Modal
  useEffect(() => {
    if (activeModalIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextModalImage();
      if (e.key === "ArrowLeft") prevModalImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, closeModal, nextModalImage, prevModalImage]);

  const currentModalItem = activeModalIndex !== null ? modalImages[activeModalIndex] : null;

  return (
    <>
      <Section
      backdrop={
        <>
          <LightRays />
          <Vignette />
        </>
      }
    >
      {/* SECTION HEADER & CASE STUDY NAV CHIPS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <Eyebrow>Product Case Studies</Eyebrow>
          <CharReveal
            text="Long-Term Enterprise Products & Platforms"
            className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] font-semibold text-foreground"
          />
          <Reveal>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              In-depth product case studies featuring long-running SaaS ecosystems and data-dense enterprise dashboards.
            </p>
          </Reveal>
        </div>

        {/* Quick Jump Navigation Chips */}
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#case-study-driving-school"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-4 py-2 text-xs font-semibold text-cyan-300 shadow-[0_0_15px_rgba(0,220,255,0.25)] transition-all hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,220,255,0.4)]"
            >
              <span className="font-mono text-cyan-400 font-bold">01</span>
              <span>Driving School Software</span>
            </a>
            <a
              href="#case-study-mahindra"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-cyan-500/50 hover:text-cyan-200"
            >
              <span className="font-mono text-slate-400 font-bold">02</span>
              <span>Mahindra Dashboard</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY 01: DRIVING SCHOOL SOFTWARE */}
      {/* ========================================================================= */}
      <div id="case-study-driving-school" className="mt-14 scroll-mt-28">
        <Reveal>
          <div className="neon-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-cyan-500/30">
            {/* Header Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40 shadow-[0_0_12px_rgba(0,220,255,0.4)]">
                    01 • CASE STUDY
                  </span>
                  <span className="font-mono text-xs tracking-wider text-cyan-300 uppercase font-semibold">
                    Long-Term SaaS Product Ecosystem
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                  Driving School Software Ecosystem
                </h3>
                <p className="mt-3 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                  A large-scale driving school software ecosystem supporting school operations, instructor scheduling, staff workflows, student management, and online enrollment across multiple connected applications.
                </p>
              </div>

              {/* Verified Product Metrics */}
              <div className="grid grid-cols-3 gap-3 bg-black/40 p-4 rounded-2xl border border-white/10 shrink-0">
                <div className="text-center px-2">
                  <span className="font-display text-xl sm:text-2xl font-bold text-cyan-400 block">8+</span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mt-0.5">Years Evolution</span>
                </div>
                <div className="text-center px-2 border-x border-white/10">
                  <span className="font-display text-xl sm:text-2xl font-bold text-cyan-400 block">1,000+</span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mt-0.5">Schools Served</span>
                </div>
                <div className="text-center px-2">
                  <span className="font-display text-xl sm:text-2xl font-bold text-cyan-400 block">3</span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block mt-0.5">Portals</span>
                </div>
              </div>
            </div>

            {/* PRODUCT ECOSYSTEM — 3 CONNECTED PRODUCT MODULES */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-mono text-sm sm:text-base tracking-[0.2em] text-cyan-400 uppercase font-bold flex items-center gap-2.5">
                  <Layers className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                  <span>One SaaS Platform • Three Connected Product Portals</span>
                </h4>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {drivingSchoolModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <div
                      key={module.id}
                      className="neon-card group rounded-2xl p-4 flex flex-col justify-between border border-white/10 bg-slate-950/60"
                    >
                      <div>
                        {/* Module Top Bar */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                            {module.num}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                            {module.roleLabel}
                          </span>
                        </div>

                        {/* Interactive Main Mockup Image */}
                        <a
                          href={module.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          onMouseEnter={playUISound}
                          className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-black/60 border border-white/10 block mb-4 group/img"
                        >
                          <img
                            src={module.primaryImage}
                            alt={module.name}
                            className="w-full h-full object-contain p-1 transition-all duration-500 ease-out group-hover/img:scale-[1.04] group-hover/img:brightness-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/80 px-3 py-1.5 rounded-full border border-cyan-400/50 shadow-lg">
                              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Open Live Portal ↗</span>
                            </span>
                          </div>
                        </a>

                        <h5 className="font-display text-base sm:text-lg font-bold text-foreground flex items-center gap-2 group-hover:text-cyan-200 transition-colors">
                          <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{module.name}</span>
                        </h5>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {module.purpose}
                        </p>
                      </div>

                      {/* Card Action Bar with External Live Link */}
                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-start">
                        <a
                          href={module.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          onMouseEnter={playUISound}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/80 hover:bg-cyan-900 px-3.5 py-1.5 rounded-lg border border-cyan-500/40 transition-all shadow-[0_0_10px_rgba(0,220,255,0.2)]"
                        >
                          <span>Live System</span>
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PRODUCT LIFECYCLE & ENGAGEMENT PIPELINE */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="font-mono text-sm sm:text-base tracking-[0.2em] text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2.5">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                <span>Continuous Product Engagement Lifecycle</span>
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-5 max-w-2xl">
                My involvement in the product spans the entire delivery lifecycle — ensuring visual consistency, technical feasibility, and continuous modernization over long-term iterations.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {productJourneySteps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="font-mono text-[11px] sm:text-xs font-bold bg-cyan-950/70 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(0,220,255,0.15)] hover:border-cyan-400 hover:text-white transition-all">
                      {step}
                    </span>
                    {idx < productJourneySteps.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* MY ROLE IN THE PRODUCT (8 RESPONSIBILITY BLOCKS) */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="font-mono text-sm sm:text-base tracking-[0.2em] text-cyan-400 uppercase font-bold mb-6 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                <span>My Core Role & Responsibilities</span>
              </h4>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {drivingSchoolRoles.map((role) => (
                  <div
                    key={role.num}
                    className="neon-card group rounded-xl p-4 border border-white/10 bg-slate-950/40"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                        {role.num}
                      </span>
                    </div>
                    <h5 className="font-display text-sm font-bold text-foreground group-hover:text-cyan-200 transition-colors">
                      {role.title}
                    </h5>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* LEGACY PRODUCT EXPERIENCE & ENVIRONMENT */}
            <div className="mt-12 pt-8 border-t border-white/10 grid gap-6 lg:grid-cols-12 items-stretch">
              {/* Highlighted Legacy Experience Block */}
              <div className="lg:col-span-7 flex">
                <div className="neon-card w-full rounded-2xl p-6 border border-cyan-500/30 bg-cyan-950/30 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                      WORKING WITH A LONG-LIVED PRODUCT
                    </span>
                    <h5 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      Modernizing Enterprise Ecosystems
                    </h5>
                    <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                      &quot;Working on a mature software ecosystem has required balancing modernization with existing workflows, legacy interfaces and continuously evolving product requirements.&quot;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-around font-mono text-xs font-bold text-cyan-300">
                    <span>LEGACY SYSTEM</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                    <span>MODERN UI</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                    <span>CONTINUOUS EVOLUTION</span>
                  </div>
                </div>
              </div>

              {/* Environment / Skills Stack */}
              <div className="lg:col-span-5 flex">
                <div className="animated-neon-border ai-neon-card w-full rounded-2xl p-6 border border-cyan-500/30 flex flex-col justify-between overflow-hidden relative">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-4 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      ENVIRONMENT &amp; SKILLS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {drivingSchoolStack.map((tech) => {
                        const c = stackColorMap[tech.color as keyof typeof stackColorMap]!;
                        return (
                          <span
                            key={tech.name}
                            className={`inline-flex items-center gap-1.5 rounded-xl border ${c.border} ${c.bg} px-3 py-1.5 text-xs font-semibold ${c.text} ${c.shadow} transition-all duration-200 hover:scale-105 hover:brightness-110`}
                          >
                            <span className={`${c.icon} font-bold text-[10px]`}>◆</span>
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 text-[11px] font-mono text-cyan-300/60 border-t border-cyan-500/20 pt-3">
                    Validated environment stack based on actual production product implementation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY 02: MAHINDRA ENTERPRISE WORKSHOP DASHBOARD */}
      {/* ========================================================================= */}
      <div id="case-study-mahindra" className="mt-16 scroll-mt-28">
        <Reveal>
          <div className="neon-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700 bg-slate-950/90">
            {/* Header Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-cyan-300 font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-600">
                    02 • ENTERPRISE CASE STUDY
                  </span>
                  <span className="font-mono text-xs tracking-wider text-slate-400 uppercase font-semibold">
                    Workshop Management Dashboard
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                  Mahindra Enterprise Workshop Dashboard
                </h3>
                <p className="mt-3 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                  High-density enterprise dashboard designed for automotive workshop management, vehicle repair order tracking, inventory master tables, and operational workflows.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModalWithGallery(mahindraGallery, 0)}
                  onMouseEnter={playUISound}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-4 py-2.5 text-xs font-semibold hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,220,255,0.3)] transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Dashboard Views</span>
                </button>
              </div>
            </div>

            {/* FEATURED DASHBOARD SHOWCASE STAGE */}
            <div className="mt-8 grid gap-6 lg:grid-cols-12 items-center">
              {/* Primary Large Dashboard Screenshot */}
              <div className="lg:col-span-8">
                <div
                  onClick={() => openModalWithGallery(mahindraGallery, 0)}
                  onMouseEnter={playUISound}
                  className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-black/80 border border-white/10 cursor-pointer group"
                >
                  <img
                    src={dmsGridTable}
                    alt="Mahindra Workshop Management Console"
                    className="w-full h-full object-contain p-3 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-white bg-black/90 px-4 py-2 rounded-full border border-cyan-400 shadow-xl">
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                      <span>Open Fullscreen Dashboard</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Supporting Dashboard Previews */}
              <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
                {mahindraGallery.map((item, idx) => (
                  <div
                    key={item.title}
                    onClick={() => openModalWithGallery(mahindraGallery, idx)}
                    className="neon-card group rounded-xl p-2.5 border border-white/10 cursor-pointer bg-slate-900/60 flex items-center gap-3"
                  >
                    <div className="w-16 h-12 rounded-lg bg-black/60 overflow-hidden shrink-0 border border-white/10">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase block">
                        {item.category}
                      </span>
                      <h5 className="text-xs font-semibold text-foreground truncate mt-0.5 group-hover:text-cyan-200">
                        {item.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAHINDRA FIGMA CONTRIBUTION */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h4 className="font-mono text-sm sm:text-base tracking-[0.2em] text-cyan-400 uppercase font-bold mb-6 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
                <span>My Contribution — Figma UI/UX Design</span>
              </h4>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {mahindraRoles.map((role) => (
                  <div
                    key={role.title}
                    className="neon-card group rounded-xl p-4 border border-white/10 bg-slate-900/50"
                  >
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 block w-fit mb-2">
                      {role.num}
                    </span>
                    <h5 className="font-display text-xs sm:text-sm font-bold text-foreground group-hover:text-cyan-200 transition-colors">
                      {role.title}
                    </h5>
                    <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills / Tools Used */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="font-mono text-xs text-muted-foreground tracking-wide">
                  <span className="text-cyan-400 font-bold mr-2">TOOLS &amp; SKILLS</span>
                  Figma · UI/UX Design · Dashboard Design · Enterprise Interfaces · Data-Heavy UI · Design Systems
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ========================================================================= */}
      {/* LIGHTWEIGHT FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {isMounted &&
        activeModalIndex !== null &&
        currentModalItem &&
        createPortal(
          <div
            onClick={closeModal}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 p-4 sm:p-6 select-none animate-in fade-in-0 transition-opacity duration-200"
            aria-modal="true"
            role="dialog"
            aria-label="Fullscreen project view"
          >
            {/* Modal Top Control Bar */}
            <div
              className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-10 flex items-center justify-between z-[1000000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 bg-black/90 border border-white/15 rounded-full px-4 py-2 shadow-2xl">
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  {activeModalIndex + 1} / {modalImages.length}
                </span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-xs font-medium text-white/90 truncate max-w-[200px] sm:max-w-md">
                  {currentModalItem.title}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="rounded-full bg-black/90 hover:bg-cyan-500 text-white p-2.5 border border-white/20 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                aria-label="Close fullscreen modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display Stage */}
            <div
              className="relative max-w-7xl max-h-[85vh] w-full h-full flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentModalItem.src}
                alt={currentModalItem.title}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Prev Navigation Arrow */}
              {modalImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalImage();
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-cyan-500 text-white p-3 border border-white/20 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-2xl cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Navigation Arrow */}
              {modalImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalImage();
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/80 hover:bg-cyan-500 text-white p-3 border border-white/20 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-2xl cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Modal Bottom Caption */}
            <div
              className="absolute bottom-4 sm:bottom-6 inset-x-4 flex justify-center z-[1000000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/90 border border-white/15 rounded-full px-5 py-2 text-center text-xs font-mono text-cyan-300 shadow-2xl">
                <span>{currentModalItem.category} • Press Esc to Close</span>
              </div>
            </div>
          </div>,
          document.body
        )}
      {/* Back to Top Button */}
<button
  aria-label="Back to top"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className={`fixed bottom-7 right-7 md:bottom-7 md:right-7 z-[1000001] flex items-center justify-center rounded-full transition-opacity duration-300 ease-out transform ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    bg-black/30 backdrop-blur-sm border border-cyan-400/40 hover:border-purple-400/60 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]
    w-12 h-12 md:w-12 md:h-12 sm:w-11 sm:h-11
    hover:bg-black/40
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
  `}
>
  <ArrowUp className="w-5 h-5 text-cyan-300" />
</button>

</Section>
</>
  );
}
