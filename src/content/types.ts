export type ContentStatus = "ready" | "draft" | "empty" | "planned";

export type PageContent = {
  title: string;
  subtitle?: string;
  lead?: string;
  highlights?: {
    label: string;
    value: string;
  }[];
  status: ContentStatus;
  body: string[];
  goals?: string[];
};

export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt?: string;
  status: ContentStatus;
  paragraphs?: string[];
  bodyHtml?: string;
  gallery?: { src: string; alt: string }[];
};

export type HomeProject = {
  title: string;
};

export type SiteMeta = {
  name: string;
  fullName: string;
  headerTitle: string;
  shortName: string;
  address: string;
};

export type SiteUi = {
  menu: string;
  menuClose: string;
  goToHome: string;
  footerMenu: string;
  copyrightSuffix: string;
  goToSection: string;
  otherAboutSections: string;
  tereblyaValley: string;
  cooperationTagline: string;
  communitiesMapAlt: string;
  riverAlt: string;
  heroMapAlt: string;
  operatingPrinciples: string;
  principles: string[];
  aboutAssociation: string;
  mainGoals: string;
  details: string;
  leadershipMembers: string;
  viewMemberCommunities: string;
  viewLeadershipStructure: string;
  projectEnvDesc: string;
  projectSocialDesc: string;
  backToNews: string;
  newsDraftNotice: string;
  galleryClose: string;
  galleryPrevious: string;
  galleryNext: string;
  galleryOpenHint: string;
  galleryCounterOf: string;
  newsFallbackTitle: string;
  facebookPageAria: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  facebookAria: string;
  area: string;
  population: string;
  head: string;
  communityWebsite: string;
  mapSource: string;
  established: string;
  orgContactsTitle: string;
  websiteLabel: string;
  phoneLabel: string;
  facebookLabel: string;
  facebookOpen: string;
  emailLabel: string;
  addressLabel: string;
};

export type SiteContent = {
  site: SiteMeta;
  ui: SiteUi;
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
