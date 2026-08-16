export const navigation = [
  {
    key: "home",
    path: "/",
  },
  {
    key: "about",
    submenu: [
      {
        key: "whoWeAre",
        path: "/who-we-are",
      },
      {
        key: "visionMission",
        path: "/vision-mission",
      },
      {
        key: "leadership",
        path: "/leadership",
      },
      {
        key: "whyHighGate",
        path: "/why-high-gate",
      },
    ],
  },
  {
    key: "academics",
    label: "Academics",
    submenu: [
      {
        key: "curriculum",
        label: "Our Curriculum",
        path: "/curriculum",
      },
      {
        key: "creche",
        label: "Creche",
        path: "/academics/creche",
      },
      {
        key: "nursery",
        label: "Nursery",
        path: "/academics/nursery",
      },
      {
        key: "primary",
        label: "Primary",
        path: "/academics/primary",
      },
      {
        key: "lowerSecondary",
        label: "Lower Secondary",
        path: "/academics/lower-secondary",
      },
    ],
  },
  {
    key: "admission",
    label: "Admission",
    submenu: [
      {
        key: "applyNow",
        label: "Apply Now",
        path: "/admissions/apply",
      },
      {
        key: "tuitionFees",
        label: "Tuition Fees",
        path: "/admissions/fees",
      },
      {
        key: "schoolCalendar",
        label: "School Calendar",
        path: "/admissions/calendar",
      },
    ],
  },
  {
    key: "newsletter",
    submenu: [
      {
        key: "year2025",
        submenu: [
          {
            title: "Term 1",
            path: "/newsletter/2025-2026/term-1",
          },
          {
            title: "Term 2",
            path: "/newsletter/2025-2026/term-2",
          },
          {
            title: "Term 3",
            path: "/newsletter/2025-2026/term-3",
          },
        ],
      },
      {
        key: "year2024",
        submenu: [
          {
            title: "Term 1",
            path: "/newsletter/2024-2025/term-1",
          },
          {
            title: "Term 2",
            path: "/newsletter/2024-2025/term-2",
          },
          {
            title: "Term 3",
            path: "/newsletter/2024-2025/term-3",
          },
        ],
      },
    ],
  },
  {
    key: "schoolLife",
    submenu: [
      {
        key: "schoolEvents",
        path: "/school-events",
      },
      {
        key: "schoolActivities",
        path: "/school-activities",
      },
    ],
  },
];