// All content sourced from https://chamandhiman.github.io/me/
// Items marked PLACEHOLDER are not present on the source site — replace them.

export const person = {
  name: "Chaman Lal",
  role: "Sr. UX/UI Designer & Front-End Developer",
  tagline:
    "Creating pixel-perfect, responsive digital experiences with 10+ years of expertise in UX/UI design, web development, and brand identity. Transforming ideas into stunning realities.",
  location: "Chandigarh, India",
  email: "chamandhiman1988@gmail.com",
  years: "10+",
  // PLACEHOLDER — not listed on the source site. Replace or remove.
  phone: "PLACEHOLDER — add phone number",
  resumeNote: "PLACEHOLDER — attach resume PDF (no download link on current site)",
};

export const socials = [
  // PLACEHOLDER — no social links found on the source site. Replace the URLs.
  { label: "LinkedIn", href: "#", placeholder: true },
  { label: "GitHub", href: "https://chamandhiman.github.io/me/", placeholder: false },
  { label: "Email", href: "mailto:chamandhiman1988@gmail.com", placeholder: false },
];

export const heroMarquee = [
  "UI/UX Design",
  "Web Development",
  "Fast & Responsive",
  "Brand Identity",
  "Accessibility",
  "On-site SEO",
];

export const about = {
  heading: "About Me",
  sub: "Professional web designer with 10+ years of experience",
  intro:
    "I am a professional web designer with more than 10 years of experience. For the past 8 years, I have been working on a large legacy Driving School Software project that includes multiple modules.",
  role: [
    "My primary role is to create wireframes and, after approval, develop responsive HTML designs. Once the UI is finalized, I provide the HTML mockups to developers for integration into the development environment. I also work closely with the development team during integration to ensure the UI components function correctly with dynamic backend data.",
    "In addition, I am responsible for identifying and fixing design issues or UI bugs that appear during staging and after deployment to the live environment. I regularly verify the design quality across different stages of the project lifecycle.",
    "I also participate in client demonstrations, where we present completed work, discuss pending tasks, and gather feedback. I directly coordinate with the client representative who manages the project to ensure smooth communication and successful project delivery.",
  ],
  keyProject: {
    title: "Driving School Software",
    modules: [
      { name: "Centralized Admin", note: "For School Owners" },
      { name: "Centralized Student Portal", note: "For students" },
      { name: "Centralized Staff Portal", note: "For School Staff" },
      { name: "Online Enrollments", note: "Online registration portal for students" },
    ],
    links: [
      {
        label: "Centralized Admin",
        href: "https://www.driversed.software/driversed.software/devaccess/DSS2/centralizedAdmin/index.html",
      },
      {
        label: "Student Portal",
        href: "https://www.driversed.software/driversed.software/devaccess/DSS2/centralizedStudentPortal/",
      },
      {
        label: "Staff Portal",
        href: "https://www.driversed.software/driversed.software/devaccess/DSS2/StaffMobile/index.html",
      },
    ],
  },
  websiteDesign: [
    "We have more than 1,000 customers worldwide using this Driving School Software platform, and each customer has their own driving school website. Around 90% of these customers use websites designed by our team, and we continue to design and develop websites for new customers regularly.",
    "The websites are created with a strong focus on SEO and accessibility standards to ensure better user experience and online visibility. These websites also play an important role in the overall system because students use them to access the Student Portal and Online Enrollment pages for registration and course management.",
  ],
};

export const skillGroups = [
  {
    tier: "Primary",
    title: "Design Tools",
    items: ["Photoshop", "Figma", "Adobe XD", "Adobe Dreamweaver", "VS Code", "Jira"],
  },
  {
    tier: "Primary",
    title: "Website Design",
    items: [
      "HTML5",
      "CSS3",
      "jQuery",
      "Bootstrap",
      "Responsive Design",
      "On-site SEO",
      "Accessibility",
    ],
  },
  {
    tier: "Primary",
    title: "AI Tools",
    items: ["ChatGPT", "GitHub Copilot", "Claude", "Lovable AI", "Google Stitch"],
  },
  {
    tier: "Secondary",
    title: "Learning & Development",
    items: ["React", "Tailwind CSS", "UI Libraries", "GitHub", "MongoDB"],
  },
  {
    tier: "Secondary",
    title: "Project Based",
    items: [".NET", "WordPress", "PHP"],
  },
];

export const orbitSkills = [
  "Figma",
  "HTML5",
  "CSS3",
  "jQuery",
  "React",
  "Tailwind",
  "Bootstrap",
  "WordPress",
  "PHP",
  ".NET",
  "MongoDB",
  "GitHub",
];

export const experience = [
  {
    period: "OCT 2017 – PRESENT",
    role: "Sr. UX/UI Designer",
    company: "Netsmartz Infotech (P) Ltd.",
    companyHref: "https://netsmartz.com/",
    summary:
      "Leading UI/UX design initiatives for responsive web applications with focus on best practices and user-centric design.",
    points: [
      "Designed and developed responsive web applications with exceptional UI/UX",
      "Created mockups and delivered pixel-perfect HTML for production",
      "Collaborated with developers for seamless UI integration",
      "Implemented dynamic tasks using jQuery and JavaScript",
      "Notable Project: DrivingSchoolSoftware.com (ASP.NET MVC)",
    ],
  },
  {
    period: "MAR 2013 – AUG 2017",
    role: "UI/UX Designer",
    company: "IT Solutions",
    companyHref: null,
    summary:
      "Designed website mockups, mobile apps, and marketing materials with focus on user engagement.",
    points: [
      "Designed website mockups, mobile apps, and social media content",
      "Worked with HTML, CSS, JavaScript, and WordPress",
      "Provided front-end support ensuring design consistency",
      "Integrated designs into CMS and .NET platforms",
    ],
  },
];

export const services = [
  {
    title: "UI/UX Design",
    desc: "Wireframes, user flows and high-fidelity interfaces designed in Figma, Adobe XD and Photoshop.",
  },
  {
    title: "Web Development",
    desc: "Pixel-perfect, production-ready HTML5, CSS3, jQuery and Bootstrap builds handed off to dev teams.",
  },
  {
    title: "Fast & Responsive",
    desc: "Responsive design across every breakpoint, with on-site SEO and accessibility standards built in.",
  },
  {
    title: "Brand Identity",
    desc: "Banners, marketing material and social media creatives that keep a consistent brand language.",
  },
];

const base = "https://chamandhiman.github.io/me";

export const projectFilters = ["All", "Apps", "Banners", "Graphics"] as const;

export const projects = [
  { cat: "Apps", title: "Driving School Software — Step 2", src: `${base}/apps/DSS/step2.png` },
  { cat: "Apps", title: "Driving School Software — Step 4", src: `${base}/apps/DSS/step4.png` },
  { cat: "Apps", title: "Driving School Software — Step 5", src: `${base}/apps/DSS/step5.png` },
  { cat: "Apps", title: "Driving School Software — Step 6", src: `${base}/apps/DSS/step6.png` },
  { cat: "Apps", title: "Driving School Software — Step 7", src: `${base}/apps/DSS/step7.png` },
  { cat: "Apps", title: "Driving School Software — Step 8", src: `${base}/apps/DSS/step8.png` },
  { cat: "Apps", title: "Nexus — Activity", src: `${base}/apps/nexus/Activity.png` },
  { cat: "Apps", title: "Nexus — Home", src: `${base}/apps/nexus/Home.png` },
  { cat: "Apps", title: "Nexus — Login", src: `${base}/apps/nexus/Login.png` },
  { cat: "Apps", title: "Nexus — Login & Home", src: `${base}/apps/nexus/nexus-login-home.png` },
  {
    cat: "Apps",
    title: "Nexus — Profile & Activity",
    src: `${base}/apps/nexus/nexus-profile-activity.png`,
  },
  { cat: "Apps", title: "Nexus — Profile", src: `${base}/apps/nexus/Profile.png` },
  { cat: "Banners", title: "Blog Banner 01", src: `${base}/banner/blog/banner-1.jpg` },
  { cat: "Banners", title: "Blog Banner 02", src: `${base}/banner/blog/banner-2.jpg` },
  { cat: "Banners", title: "Blog Banner 03", src: `${base}/banner/blog/banner-3.jpg` },
  { cat: "Banners", title: "Blog Banner 04", src: `${base}/banner/blog/banner-4.jpg` },
  { cat: "Banners", title: "Blog Banner 05", src: `${base}/banner/blog/banner-5.jpg` },
  { cat: "Banners", title: "Blog Banner 06", src: `${base}/banner/blog/banner-6.jpg` },
  { cat: "Graphics", title: "Driving School Website Theme 01", src: `${base}/images/templates/template1.png` },
  { cat: "Graphics", title: "Driving School Website Theme 02", src: `${base}/images/templates/template2.png` },
  { cat: "Graphics", title: "Driving School Website Theme 03", src: `${base}/images/templates/template3.png` },
  { cat: "Graphics", title: "Driving School Website Theme 04", src: `${base}/images/templates/template4.png` },
  { cat: "Graphics", title: "Driving School Website Theme 05", src: `${base}/images/templates/template5.png` },
  { cat: "Graphics", title: "Driving School Website Theme 06", src: `${base}/images/templates/template6.png` },
];

export const mockups = about.keyProject.links.map((l, i) => ({
  title: l.label,
  src: `${base}/images/mockup/${["admin", "csp", "staff"][i]}.jpg`,
  href: l.href,
}));


// PLACEHOLDER — the source site has no testimonials. Replace names, roles and quotes.
export const testimonials = [
  {
    quote:
      "PLACEHOLDER — add a real client quote here. Chaman delivered pixel-perfect UI on a tight timeline.",
    name: "PLACEHOLDER Client Name",
    role: "PLACEHOLDER Role, Company",
  },
  {
    quote:
      "PLACEHOLDER — add a real client quote here. Wireframes to production HTML with zero friction.",
    name: "PLACEHOLDER Client Name",
    role: "PLACEHOLDER Role, Company",
  },
  {
    quote:
      "PLACEHOLDER — add a real client quote here. Design quality held up across every release.",
    name: "PLACEHOLDER Client Name",
    role: "PLACEHOLDER Role, Company",
  },
];

export const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "1,000+", label: "Customers on the platform" },
  { value: "90%", label: "Customer sites designed in-house" },
  { value: "8", label: "Years on the flagship product" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
