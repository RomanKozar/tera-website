export const BEST_PRACTICES_IMAGES = {
  kolochavaOffice: "/images/best-practices/foto-15.webp",
} as const;

export type BestPracticeArticle = {
  id: string;
  date: string;
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  quote?: { text: string; author: string };
  closing?: string;
};

export type BestPracticesContent = {
  pageTitle: string;
  articles: BestPracticeArticle[];
};

const articlesUk: BestPracticeArticle[] = [
  {
    id: "kolochava-eu-office",
    date: "2026-05-10",
    title:
      "У Колочавській громаді офіційно відкрили перший в Україні сільський Офіс євроінтеграції",
    image: BEST_PRACTICES_IMAGES.kolochavaOffice,
    imageAlt:
      "Відкриття першого в Україні сільського Офісу євроінтеграції у Колочавській громаді",
    paragraphs: [
      "10 травня 2026 року у Колочавській громаді офіційно відкрили перший в Україні сільський Офіс євроінтеграції.",
      "Відкриття відбулося за участі сільського голови Василя Худинця, Генерального консула Чеської Республіки у Львові Їржі Борцела, амбасадора Закарпаття у Словаччині Едуарда Бураша, заступниці директора програми «U-LEAD з Європою» (U-LEAD with Europe) Олени Томнюк, голів громад західних областей України, жителів громади.",
      "Офіс євроінтеграції — це важливий крок на шляху до європейського розвитку громади, який відкриває нові можливості для співпраці з країнами Європейського Союзу, залучення інвестицій, участі у міжнародних проєктах та впровадження сучасних стандартів у різних сферах життя.",
      "Офіс стане платформою для підтримки місцевих ініціатив, розвитку міжнародного партнерства, підготовки грантових проєктів, навчання та обміну досвідом.",
    ],
    quote: {
      text: "Колочава завжди була частиною європейського простору — і не лише географічно. Наша історія тісно пов’язана з Чехією та Словаччиною, Австро-Угорщиною, країнами Центральної Європи. Саме тут формувалася культура співжиття, відкритості та взаємоповаги, яка є основою європейських цінностей. Сьогодні, відкриваючи Офіс євроінтеграції, ми не починаємо цей шлях — ми його продовжуємо, впевнено інтегруючись у сучасну європейську спільноту",
      author: "Василь Худинець, сільський голова Колочавської громади",
    },
    closing: "Колочавська громада — громада з європейським минулим і європейським майбутнім!",
  },
];

const articlesEn: BestPracticeArticle[] = [
  {
    id: "kolochava-eu-office",
    date: "2026-05-10",
    title:
      "Kolochava community officially opened Ukraine's first rural European integration office",
    image: BEST_PRACTICES_IMAGES.kolochavaOffice,
    imageAlt:
      "Opening of Ukraine's first rural European integration office in Kolochava community",
    paragraphs: [
      "On 10 May 2026, Kolochava community officially opened Ukraine's first rural European Integration Office.",
      "The opening took place with the participation of village head Vasyl Khudynets, Consul General of the Czech Republic in Lviv Jiří Borec, Ambassador of Zakarpattia in Slovakia Eduard Burash, Deputy Director of the «U-LEAD with Europe» programme Olena Tomniuk, heads of communities from western regions of Ukraine, and local residents.",
      "The European Integration Office is an important step towards the community's European development, opening new opportunities for cooperation with European Union countries, attracting investment, participating in international projects, and implementing modern standards across various areas of life.",
      "The office will serve as a platform for supporting local initiatives, developing international partnerships, preparing grant projects, training, and exchanging experience.",
    ],
    quote: {
      text: "Kolochava has always been part of the European space — and not only geographically. Our history is closely linked with the Czech Republic and Slovakia, Austria-Hungary, and the countries of Central Europe. It is here that a culture of coexistence, openness, and mutual respect was formed — the foundation of European values. Today, by opening the European Integration Office, we are not starting this path — we are continuing it, confidently integrating into the modern European community",
      author: "Vasyl Khudynets, head of Kolochava community",
    },
    closing:
      "Kolochava community — a community with a European past and a European future!",
  },
];

export function getBestPracticesContent(locale: "uk" | "en"): BestPracticesContent {
  if (locale === "en") {
    return {
      pageTitle: "Best practices",
      articles: articlesEn,
    };
  }

  return {
    pageTitle: "Кращі практики",
    articles: articlesUk,
  };
}
