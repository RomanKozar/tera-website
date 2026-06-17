export const CONTESTS_GRANTS_IMAGES = {
  foto16: "/images/contests-grants/foto-16.webp",
  foto17: "/images/contests-grants/foto-17.webp",
} as const;

export type GrantListBlock = {
  type: "list";
  title: string;
  items: string[];
};

export type GrantParagraphsBlock = {
  type: "paragraphs";
  paragraphs: string[];
};

export type GrantHighlightsBlock = {
  type: "highlights";
  items: { label: string; value: string }[];
};

export type GrantImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

export type GrantDeadlineBlock = {
  type: "deadline";
  label: string;
  value: string;
};

export type GrantLinkBlock = {
  type: "link";
  label: string;
  href: string;
};

export type GrantBlock =
  | GrantParagraphsBlock
  | GrantListBlock
  | GrantHighlightsBlock
  | GrantImageBlock
  | GrantDeadlineBlock
  | GrantLinkBlock;

export type GrantProgram = {
  id: string;
  title: string;
  blocks: GrantBlock[];
};

export type ContestsGrantsContent = {
  pageTitle: string;
  programs: GrantProgram[];
};

const programsUk: GrantProgram[] = [
  {
    id: "interreg-karpacki",
    title:
      "90 000 євро — гранти на «малі» проєкти в рамках польсько-українського партнерства (INTERREG)",
    blocks: [
      {
        type: "paragraphs",
        paragraphs: [
          "Карпатський єврорегіон оголосив другий конкурс на фінансування проєктів за пріоритетом «СПІВПРАЦЯ» (створення взаємної довіри шляхом підтримки заходів, що сприяють взаємодії між людьми).",
          "Програма підтримує ініціативи, які мають широкий транскордонний вплив, реальну співпрацю між партнерами та довговічні продукти. Передбачається залучення в рамках проєкту щонайменше одного фінансового партнера з Польщі та одного з України й здійснювати діяльність по обидва боки кордону в межах визначених регіонів.",
        ],
      },
      {
        type: "list",
        title: "До участі в конкурсі запрошуються регіони",
        items: [
          "з боку Польщі (воєводства): Підкарпатське, Люблінське, Підляське, Мазовецьке (тільки Остроленський та Седлецький субрегіони);",
          "з боку України (області): Закарпатська, Рівненська, Волинська, Львівська, Івано-Франківська, Тернопільська.",
        ],
      },
      {
        type: "list",
        title: "На які заходи має бути спрямована ідея проєкту",
        items: [
          "спільні культурні заходи, творчий відпочинок;",
          "захист та популяризація об’єктів культурної спадщини;",
          "інтеграція мешканців території підтримки Програми.",
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Неприбуткові установи з Польщі та України, що базуються в регіоні підтримки Програми:",
        ],
      },
      {
        type: "list",
        title: "Хто може взяти участь",
        items: [
          "державні, регіональні та місцеві адміністративні одиниці й підпорядковані їм установи;",
          "неурядові організації (НУО);",
          "школи, вищі навчальні заклади та наукові установи тощо.",
        ],
      },
      {
        type: "highlights",
        items: [
          {
            label: "Ліміт фінансування",
            value: "від 20 000 до 90 000 €",
          },
          {
            label: "Макс. бюджет проєкту",
            value: "100 000 €",
          },
          {
            label: "Співфінансування",
            value: "до 90% витрат",
          },
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Власний внесок установ має становити щонайменше 10%.",
        ],
      },
      {
        type: "deadline",
        label: "Дедлайн",
        value: "10 липня о 15:00 (CEST)",
      },
      {
        type: "link",
        label: "Деталі на сайті програми",
        href: "https://plua-karpacki.pl/aktualne-ogloszenia-o-naborach/",
      },
    ],
  },
  {
    id: "slovakaid-small-grants",
    title:
      "До 10 000 євро — гранти на невеликі громадські проєкти на місцевому рівні (Посольство Словаччини)",
    blocks: [
      {
        type: "image",
        src: CONTESTS_GRANTS_IMAGES.foto17,
        alt: "Конкурс малих грантів SlovakAid",
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Стартував конкурс «малих» грантів SlovakAid (Small Grants) на 2026 рік, який реалізується Словацьким агентством міжнародного розвитку у співпраці з Посольством Словацької Республіки в Україні.",
          "Програма спрямована на підтримку невеликих проєктів розвитку, які відповідають актуальним потребам громад та можуть бути реалізовані у короткі строки.",
        ],
      },
      {
        type: "list",
        title: "Хто може подаватися",
        items: [
          "зареєстровані некомерційні організації;",
          "громадські об’єднання;",
          "органи місцевого самоврядування;",
          "заклади освіти та охорони здоров’я.",
        ],
      },
      {
        type: "list",
        title: "Пріоритетні сектори",
        items: [
          "інфраструктура та сталий розвиток (вода, енергія, екологія);",
          "сільське господарство та продовольча безпека;",
          "підтримка підприємництва та створення робочих місць;",
          "охорона здоров’я;",
          "освіта;",
          "належне врядування та розвиток громадянського суспільства.",
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Фінансуються проєкти, спрямовані на розвиток громад, покращення доступу до послуг, підвищення спроможності інституцій та підтримку вразливих груп населення.",
        ],
      },
      {
        type: "image",
        src: CONTESTS_GRANTS_IMAGES.foto16,
        alt: "Громадські проєкти за підтримки SlovakAid",
      },
      {
        type: "highlights",
        items: [
          { label: "Макс. грант", value: "до 10 000 €" },
          { label: "Тривалість", value: "6–12 місяців" },
        ],
      },
      {
        type: "deadline",
        label: "Дедлайн подачі",
        value: "15 червня 2026 року",
      },
      {
        type: "link",
        label: "Деталі на сайті Посольства Словаччини",
        href: "https://www.mzv.sk/en/web/kyjev-en/slovak-aid/small-grants",
      },
    ],
  },
];

const programsEn: GrantProgram[] = [
  {
    id: "interreg-karpacki",
    title:
      "Up to €90,000 — small projects under Polish-Ukrainian INTERREG partnership",
    blocks: [
      {
        type: "paragraphs",
        paragraphs: [
          "The Carpathian Euroregion has announced a second call for project funding under the «COOPERATION» priority (building mutual trust by supporting activities that promote interaction between people).",
          "The programme supports initiatives with broad cross-border impact, genuine cooperation between partners, and lasting outputs. Each project must involve at least one financial partner from Poland and one from Ukraine and carry out activities on both sides of the border within the designated regions.",
        ],
      },
      {
        type: "list",
        title: "Regions invited to participate",
        items: [
          "from Poland (voivodeships): Podkarpackie, Lubelskie, Podlaskie, Mazowieckie (Ostrołęka and Siedlce subregions only);",
          "from Ukraine (oblasts): Zakarpattia, Rivne, Volyn, Lviv, Ivano-Frankivsk, Ternopil.",
        ],
      },
      {
        type: "list",
        title: "Activities the project idea should focus on",
        items: [
          "joint cultural events and creative leisure;",
          "protection and promotion of cultural heritage sites;",
          "integration of residents in the Programme support area.",
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Non-profit institutions from Poland and Ukraine based in the Programme support area:",
        ],
      },
      {
        type: "list",
        title: "Who can participate",
        items: [
          "state, regional, and local administrative units and their subordinate institutions;",
          "non-governmental organisations (NGOs);",
          "schools, higher education institutions, and research organisations, etc.",
        ],
      },
      {
        type: "highlights",
        items: [
          {
            label: "Funding limit",
            value: "€20,000 to €90,000",
          },
          {
            label: "Max. project budget",
            value: "€100,000",
          },
          {
            label: "Co-financing",
            value: "up to 90% of costs",
          },
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "The institutions' own contribution must be at least 10%.",
        ],
      },
      {
        type: "deadline",
        label: "Deadline",
        value: "10 July at 15:00 (CEST)",
      },
      {
        type: "link",
        label: "Details on the programme website",
        href: "https://plua-karpacki.pl/aktualne-ogloszenia-o-naborach/",
      },
    ],
  },
  {
    id: "slovakaid-small-grants",
    title:
      "Up to €10,000 — small community projects (Embassy of Slovakia)",
    blocks: [
      {
        type: "image",
        src: CONTESTS_GRANTS_IMAGES.foto17,
        alt: "SlovakAid small grants call",
      },
      {
        type: "paragraphs",
        paragraphs: [
          "The SlovakAid Small Grants call for 2026 has launched, implemented by the Slovak Agency for International Development in cooperation with the Embassy of the Slovak Republic in Ukraine.",
          "The programme supports small development projects that meet current community needs and can be implemented in a short timeframe.",
        ],
      },
      {
        type: "list",
        title: "Who can apply",
        items: [
          "registered non-profit organisations;",
          "public associations;",
          "local self-government bodies;",
          "educational and healthcare institutions.",
        ],
      },
      {
        type: "list",
        title: "Priority sectors",
        items: [
          "infrastructure and sustainable development (water, energy, ecology);",
          "agriculture and food security;",
          "support for entrepreneurship and job creation;",
          "healthcare;",
          "education;",
          "good governance and civil society development.",
        ],
      },
      {
        type: "paragraphs",
        paragraphs: [
          "Projects aimed at community development, improving access to services, strengthening institutional capacity, and supporting vulnerable population groups are eligible for funding.",
        ],
      },
      {
        type: "image",
        src: CONTESTS_GRANTS_IMAGES.foto16,
        alt: "Community projects supported by SlovakAid",
      },
      {
        type: "highlights",
        items: [
          { label: "Max. grant", value: "up to €10,000" },
          { label: "Duration", value: "6–12 months" },
        ],
      },
      {
        type: "deadline",
        label: "Application deadline",
        value: "15 June 2026",
      },
      {
        type: "link",
        label: "Details on the Embassy of Slovakia website",
        href: "https://www.mzv.sk/en/web/kyjev-en/slovak-aid/small-grants",
      },
    ],
  },
];

export function getContestsGrantsContent(
  locale: "uk" | "en",
): ContestsGrantsContent {
  if (locale === "en") {
    return {
      pageTitle: "Grants and contests",
      programs: programsEn,
    };
  }

  return {
    pageTitle: "Конкурси і гранти",
    programs: programsUk,
  };
}
