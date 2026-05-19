export type ContentStatus = "ready" | "draft" | "empty" | "planned";

export type PageContent = {
  title: string;
  status: ContentStatus;
  body: string[];
};

export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  status: ContentStatus;
};

export type HomeProject = {
  title: string;
};

export type SiteContent = {
  nav: {
    about: string;
    aboutMaoms: string;
    aboutMembers: string;
    aboutStatutory: string;
    news: string;
    bestPractices: string;
    grants: string;
    projects: string;
    contacts: string;
  };
  footer: {
    home: string;
    news: string;
    about: string;
    river: string;
    contactsLabel: string;
    langUk: string;
    langEn: string;
  };
  statusLabels: Record<ContentStatus, string>;
  home: {
    heroSlogan: string;
    newsTitle: string;
    projectsTitle: string;
    readMore: string;
    comingSoon: string;
    mapLocations: string[];
  };
  pages: Record<string, PageContent>;
  news: NewsItem[];
  projects: HomeProject[];
};
