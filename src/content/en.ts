import type { SiteContent } from "./types";

export const content: SiteContent = {
  nav: {
    about: "About us",
    aboutMaoms: "LAHB «TeRA»",
    aboutMembers: "Members (founders)",
    aboutStatutory: "Statutory bodies",
    news: "News",
    bestPractices: "Best practices",
    grants: "Grants & contests",
    projects: "Our projects",
    contacts: "Contacts",
  },
  footer: {
    home: "Home",
    news: "News",
    about: "About us",
    river: "Tereblya River",
    contactsLabel: "CONTACTS",
    langUk: "Ukrainian",
    langEn: "English (short)",
  },
  statusLabels: {
    ready: "",
    draft: "Content in preparation",
    empty: "This section will be added later",
    planned: "Section under consideration",
  },
  home: {
    heroSlogan: "COOPERATION FOR COMMUNITY DEVELOPMENT",
    newsTitle: "TERA NEWS",
    projectsTitle: "OUR PROJECTS",
    readMore: "Read more",
    comingSoon: "Coming soon",
    mapLocations: ["Vilkhovets", "Tereblya", "Dubove"],
  },
  projects: [
    { title: "Environmental development" },
    { title: "Social initiatives" },
  ],
  pages: {
    "maoms-tera": {
      title: "LAHB «TeRA»",
      status: "draft",
      body: ["Content will be published after File 1 is finalized."],
    },
    chleny: {
      title: "Members (founders) of TeRA",
      status: "draft",
      body: ["Content will be published after File 2 is finalized."],
    },
    "statutni-organy": {
      title: "Statutory bodies",
      status: "draft",
      body: ["Content will be published after File 3 is finalized."],
    },
    "krashi-praktyky": {
      title: "Best practices",
      status: "draft",
      body: ["Content will be published after File 9 is finalized."],
    },
    "konkursy-ta-granty": {
      title: "Grants & contests",
      status: "planned",
      body: ["This section is under consideration."],
    },
    "nashi-proekty": {
      title: "Our projects",
      status: "empty",
      body: ["Project descriptions will appear here."],
    },
    kontakty: {
      title: "Contacts",
      status: "draft",
      body: ["Contact details will be published after File 7 is finalized."],
    },
    "richka-tereblya": {
      title: "Tereblya River",
      status: "draft",
      body: ["Content will be published after File 8 is finalized."],
    },
    "pro-nas": {
      title: "About us",
      status: "ready",
      body: [
        "Choose a subsection to learn more about the association, its members, and governing bodies.",
      ],
    },
  },
  news: [
    {
      slug: "news-1",
      date: "2026-01-15",
      title: "News 1",
      excerpt: "Content in preparation (File 4).",
      status: "draft",
    },
    {
      slug: "news-2",
      date: "2026-02-03",
      title: "News 2",
      excerpt: "Content in preparation (File 5).",
      status: "draft",
    },
    {
      slug: "news-3",
      date: "2026-03-10",
      title: "News 3",
      excerpt: "Content in preparation (File 6).",
      status: "draft",
    },
  ],
};
