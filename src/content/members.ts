export type CommunityMember = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  established?: string;
  area: string;
  population: string;
  head: string;
  website: string;
  paragraphs: string[];
  map: {
    lat: number;
    lng: number;
    bbox: [number, number, number, number];
  };
};

const ZAKARPATTYA_MAP_URL =
  "https://zakarpattya.net.ua/News/140566-Zamist-13-raioniv-pislia-administratyvno-terytorialnoi-reformy-na-Zakarpatti-khochut-utvoryty-38-obiednanykh-hromad-KARTA";

export const zakarpattyaMapUrl = ZAKARPATTYA_MAP_URL;

export const membersUk: CommunityMember[] = [
  {
    id: "bushtyn",
    name: "Буштинська територіальна громада",
    image: "/images/tera-members/bushyn-community.webp",
    imageAlt: "Буштинська територіальна громада",
    established: "12 червня 2020 року",
    area: "145 км²",
    population: "25 522 осіб (станом на 01.01.2021)",
    head: "ЯНЧІЙ Руслан Миколайович",
    website: "https://bushtynska-gromada.gov.ua/",
    paragraphs: [
      "Буштинська громада Тячівського району утворена 12 червня 2020 року шляхом об'єднання Буштинської селищної, Вонігівської, Дулівської, Новобарівської, Кричівської, Чумалівської і Тереблянської сільських рад Тячівського району.",
      "Громада розташована на заході України та входить до складу Тячівського району. На сході вона межує із Тячівською та Углянською територіальними громадами, на заході - із Хустською та Драгівською територіальними громадами.",
    ],
    map: { lat: 48.051, lng: 23.427, bbox: [23.32, 47.98, 23.55, 48.12] },
  },
  {
    id: "kolochava",
    name: "Колочавська територіальна громада",
    image: "/images/tera-members/kolochavska-community.webp",
    imageAlt: "Колочавська територіальна громада",
    established: "12 червня 2020 року",
    area: "161,25 км² (16 125 га)",
    population: "9 216 осіб",
    head: "ХУДИНЕЦЬ Василь Іванович",
    website: "https://kolochavska-gromada.gov.ua/",
    paragraphs: [
      "Колочавська територіальна громада утворена 12 червня 2020 року шляхом об’єднання Колочавської і Негровецької сільських рад. Адміністративний центр - село Колочава. Територія громади входить до складу Хустського району Закарпатської області.",
      "До складу громади входить 5 сіл: с. Колочава, с. Горб, с. Мерешор, с. Негровець, с. Косів Верх. Громада межує із Міжгірською, Синевирською та Драгівською громадами Хустського району, Усть-Чорнянською та Нересницькою громадами Тячівського району.",
    ],
    map: { lat: 48.431, lng: 23.743, bbox: [23.62, 48.34, 23.88, 48.52] },
  },
  {
    id: "dragiv",
    name: "Драгівська сільська територіальна громада",
    image: "/images/tera-members/dragivska-community.webp",
    imageAlt: "Драгівська територіальна громада",
    area: "149,4 км²",
    population: "близько 14 226 осіб",
    head: "ДОВГАНИЧ Михайло Михайлович",
    website: "https://dragivska-gromada.gov.ua/",
    paragraphs: [
      "Драгівська сільська територіальна громада утворена внаслідок об'єднання чотирьох сільських рад: Драгівської (села Драгово, Забереж, Кічерели, Становець), Золотарівської (село Золотарьово), Забрідської (село Забрідь) та Вільшанської (село Вільшани).",
      "Громада входить до складу Хустського району Закарпатської області та межує із Колочавською, Міжгірською, Хустською та Горінчівською громадами Хустського району, а також із Буштинською, Углянською і Нересницькою громадами Тячівського району.",
    ],
    map: { lat: 48.238, lng: 23.545, bbox: [23.44, 48.15, 23.66, 48.32] },
  },
  {
    id: "synevyr",
    name: "Синевирська територіальна громада",
    image: "/images/tera-members/synevyr-community.webp",
    imageAlt: "Синевирська територіальна громада",
    established: "12 червня 2020 року",
    area: "256,8 км²",
    population: "6 591 мешканець",
    head: "ЧУП Іван Андрійович",
    website: "https://synevyrska-gromada.gov.ua/",
    paragraphs: [
      "Синевирська територіальна громада створена 12 червня 2020 року шляхом об’єднання Синевирсько-Полянської та Синевирської сільських рад. До складу громади увійшло 6 населених пунктів: с. Синевир, с. Заверхня Кичера, с. Синевирська Поляна, с. Свобода, с. Загорб, с. Береги. Громада входить до складу Хустського району Закарпатської області.",
      "Межує із землями Міжгірської та Колочавської громадами Хустського району, Усть-Чорнянською ТГ Тячівського району Закарпатської області та землями Перегінської та Вигодської громад Калуського району Івано-Франківської області.",
    ],
    map: { lat: 48.585, lng: 23.685, bbox: [23.52, 48.48, 23.88, 48.72] },
  },
];

export const membersEn: CommunityMember[] = [
  {
    id: "bushtyn",
    name: "Bushtyn territorial community",
    image: "/images/tera-members/bushyn-community.webp",
    imageAlt: "Bushtyn territorial community",
    established: "12 June 2020",
    area: "145 km²",
    population: "25,522 residents (as of 01.01.2021)",
    head: "Ruslan Mykolaiovych YANCHII",
    website: "https://bushtynska-gromada.gov.ua/",
    paragraphs: [
      "The Bushtyn community of Tiachiv district was formed on 12 June 2020 through the merger of Bushtyn settlement and six village councils of Tiachiv district.",
      "Located in western Ukraine within Tiachiv district, it borders Tiachiv and Uhlya communities to the east and Khust and Drahiv communities to the west.",
    ],
    map: { lat: 48.051, lng: 23.427, bbox: [23.32, 47.98, 23.55, 48.12] },
  },
  {
    id: "kolochava",
    name: "Kolochava territorial community",
    image: "/images/tera-members/kolochavska-community.webp",
    imageAlt: "Kolochava territorial community",
    established: "12 June 2020",
    area: "161.25 km² (16,125 ha)",
    population: "9,216 residents",
    head: "Vasyl Ivanovych HUDYNETS",
    website: "https://kolochavska-gromada.gov.ua/",
    paragraphs: [
      "Formed on 12 June 2020 by merging Kolochava and Negrovets village councils. Administrative centre: Kolochava village, Khust district, Zakarpattia region.",
      "Includes five villages: Kolochava, Horb, Mereshor, Negrovets, and Kosiv Verkh. Borders Mizhhiria, Synevyr, and Drahiv communities in Khust district and Ust-Chorna and Neresnytsia communities in Tiachiv district.",
    ],
    map: { lat: 48.431, lng: 23.743, bbox: [23.62, 48.34, 23.88, 48.52] },
  },
  {
    id: "dragiv",
    name: "Drahiv rural territorial community",
    image: "/images/tera-members/dragivska-community.webp",
    imageAlt: "Drahiv territorial community",
    area: "149.4 km²",
    population: "about 14,226 residents",
    head: "Mykhailo Mykhailovych DOVHANYCH",
    website: "https://dragivska-gromada.gov.ua/",
    paragraphs: [
      "Established through the merger of four village councils: Drahiv (Drhovo, Zaberezh, Kicherely, Stanovets), Zolotariv (Zolotarovo), Zabrid (Zabrid), and Vilshany (Vilshany).",
      "Part of Khust district, Zakarpattia region. Borders Kolochava, Mizhhiria, Khust, and Horinchiv communities in Khust district and Bushtyn, Uhlya, and Neresnytsia communities in Tiachiv district.",
    ],
    map: { lat: 48.238, lng: 23.545, bbox: [23.44, 48.15, 23.66, 48.32] },
  },
  {
    id: "synevyr",
    name: "Synevyr territorial community",
    image: "/images/tera-members/synevyr-community.webp",
    imageAlt: "Synevyr territorial community",
    established: "12 June 2020",
    area: "256.8 km²",
    population: "6,591 residents",
    head: "Ivan Andriiovych CHUP",
    website: "https://synevyrska-gromada.gov.ua/",
    paragraphs: [
      "Created on 12 June 2020 by merging Synevyr-Polyana and Synevyr village councils. Includes six settlements: Synevyr, Zaverkhnia Kychera, Synevyrska Poliana, Svoboda, Zahorb, and Berehy, within Khust district.",
      "Borders Mizhhiria and Kolochava communities in Khust district, Ust-Chorna community in Tiachiv district, and Perehin and Vyhoda communities in Ivano-Frankivsk region.",
    ],
    map: { lat: 48.585, lng: 23.685, bbox: [23.52, 48.48, 23.88, 48.72] },
  },
];

export function getMembers(locale: "uk" | "en") {
  return locale === "uk" ? membersUk : membersEn;
}
