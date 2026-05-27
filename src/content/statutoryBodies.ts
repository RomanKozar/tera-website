import type { Locale } from "@/lib/site";

export type StatutoryBodiesContent = {
  pageTitle: string;
  assembly: string;
  assemblyParagraphs: string[];
  composition: string;
  compositionMembers: string[];
  chairAndDirector: string;
  chairRule: string;
  chairLabel: string;
  chairName: string;
  chairBioTitle: string;
  chairBioParagraphs: string[];
  directorLabel: string;
  directorRule: string;
  directorName: string;
  directorBioTitle: string;
  directorBioParagraphs: string[];
  otherAbout: string;
  goToSection: string;
  photoAlt: (index: number) => string;
  chairPhotoAlt: string;
  directorPhotoAlt: string;
  communitiesMapAlt: string;
};

const uk: StatutoryBodiesContent = {
  pageTitle: "Органи управління Асоціації",
  assembly: "Загальні збори",
  assemblyParagraphs: [
    "Вищим органом управління Асоціації є Загальні збори уповноважених представників органів місцевого самоврядування – членів Асоціації, які скликаються не рідше двох разів на рік.",
    "Рішення про скликання Загальних зборів Асоціації, перелік питань порядку денного, дата, час, місце та режим проведення Загальних зборів приймається Головою Асоціації, Виконавчим директором Асоціації або особою, яка виконує їх обов`язки з власної ініціативи, про що видається письмове або усне відповідне розпорядження.",
    "Загальні збори Асоціації можуть бути скликані також на вимогу 1/3 членів Асоціації, яка доводиться до відома всіх членів Асоціації. У такому випадку порядок денний таких Загальних зборів формується ініціативною групою членів Асоціації.",
  ],
  composition: "Склад Загальних зборів",
  compositionMembers: [
    "Буштинська селищна рада в особі селищного голови Руслана ЯНЧІЯ",
    "Колочавська сільська рада в особі сільського голови Василя ХУДИНЦЯ",
    "Драгівська сільська рада в особі сільського голови Михайла ДОВГАНИЧА",
    "Синевирська сільська рада в особі сільського голови Івана ЧУПА",
  ],
  chairAndDirector:
    "У період між засіданнями Загальних зборів управління Асоціацією здійснюють Голова Асоціації та Виконавчий директор Асоціації, які призначаються Загальними зборами Асоціації шляхом відкритого голосування. Строк повноважень Голови Асоціації та Виконавчого директора Асоціації становить 1 (один) рік з правом переобрання на новий строк.",
  chairRule:
    "Головою Асоціації може бути призначено одного з уповноважених представників членів Асоціації.",
  chairLabel: "Голова Асоціації",
  chairName: "ЯНЧІЙ Руслан Миколайович",
  chairBioTitle: "Про голову Асоціації",
  chairBioParagraphs: [
    "Руслан ЯНЧІЙ - Буштинський селищний голова, обраний головою Буштинської територіальної громади 25 жовтня 2020 року.",
    "Народився 22 липня 1990 року в с. Теребля Тячівського району Закарпатської області. Навчався у Львівському державному університеті безпеки життєдіяльності за спеціальністю «Пожежна безпека», здобув кваліфікацію - інженер з пожежної безпеки.",
    "З 2011 по 2013 роки – начальник караулу 43 державної пожежно – рятувальної частини 7 державного пожежно – рятувального загону охорони міста Дніпропетровськ.",
    "З 2013 по 2015 роки – заступник начальника Державного пожежно – рятувального поста в смт. Дубове.",
    "З 2015 року по 2020 рік – голова Тереблянської сільської ради.",
    "У 2021 році закінчив факультет «Публічне управління та адміністрування» Львівського регіонального інституту державного управління Національної академії державного управління при Президентові України. Одружений.",
  ],
  directorLabel: "Виконавчий директор Асоціації",
  directorRule:
    "Виконавчий директор Асоціації вирішує всі поточні питання діяльності Асоціації. У випадку, якщо Загальними зборами Асоціації не призначено Виконавчого директора Асоціації або строк повноважень такого закінчився, повноваження Виконавчого директора виконуються безпосередньо Загальними зборами Асоціації.",
  directorName: "МАН Денис Миколайович",
  directorBioTitle: "Про виконавчого директора",
  directorBioParagraphs: [
    "Денис МАН - депутат Закарпатської обласної ради, обраний депутатом Закарпатської обласної ради VІIІ скликання від Закарпатської територіальної організації Політичної партії «Європейська Солідарність».",
    "2010-2015 роки - керівник гуртків Закарпатського центру туризму, краєзнавства,",
    "2015 рік - начальник управління туризму і курортів Закарпатської ОДА.",
    "2015-2016 роки - начальник управління туризму і курортів Закарпатської ОДА.",
    "2016-2019 роки - директор департаменту економічного розвитку та торгівлі Закарпатської ОДА.",
    "2020 рік - директор установи «Агенція регіонального розвитку Закарпатської області».",
    "2020-2021 – заступник голови Закарпатської обласної ради VIІІ скликання.",
    "Упродовж 2022 – 2026 р.р. – проходив службу у лавах Збройних Сил України.",
    "Із лютого 2026 року – помічник-консультант народного депутата України.",
  ],
  otherAbout: "Інші розділи «Про нас»",
  goToSection: "Перейти до розділу",
  photoAlt: (index) => `Фото ${index}`,
  chairPhotoAlt: "Фото голови асоціації",
  directorPhotoAlt: "Фото виконавчого директора",
  communitiesMapAlt: "Карта громад ТеРА",
};

const en: StatutoryBodiesContent = {
  pageTitle: "Association governing bodies",
  assembly: "General meeting",
  assemblyParagraphs: [
    "The highest governing body of the Association is the General Meeting of authorised representatives of local self-government bodies - members of the Association, convened at least twice a year.",
    "The decision to convene the General Meeting, the agenda, date, time, location and format of the meeting is adopted by the Chair of the Association, the Executive Director, or a person performing their duties on their own initiative, by written or oral order.",
    "The General Meeting may also be convened at the request of one third of the Association’s members, with all members notified. In such cases, the agenda is prepared by an initiative group of members.",
  ],
  composition: "Composition of the General Meeting",
  compositionMembers: [
    "Bushtyn settlement council represented by settlement head Ruslan YANCHII",
    "Kolochava village council represented by village head Vasyl HUDYNETS",
    "Drahiv village council represented by village head Mykhailo DOVHANYCH",
    "Synevyr village council represented by village head Ivan CHUP",
  ],
  chairAndDirector:
    "Between meetings of the General Meeting, the Association is managed by the Chair and the Executive Director, appointed by open vote for a term of one year with the right of re-election.",
  chairRule:
    "The Chair may be appointed from among the authorised representatives of the member communities.",
  chairLabel: "Chair of the Association",
  chairName: "Ruslan Mykolaiovych YANCHII",
  chairBioTitle: "About the Chair",
  chairBioParagraphs: [
    "Ruslan YANCHII is the head of the Bushtyn settlement and was elected head of the Bushtyn territorial community on 25 October 2020.",
    "Born on 22 July 1990 in the village of Tereblya, Tiachiv district, Zakarpattia region. He studied at Lviv State University of Life Safety, majoring in Fire Safety, and qualified as a fire safety engineer.",
    "From 2011 to 2013 - head of the guard at State Fire and Rescue Unit 43 of the 7th State Fire and Rescue Detachment guarding the city of Dnipro.",
    "From 2013 to 2015 - deputy head of the State Fire and Rescue Post in Dubove village.",
    "From 2015 to 2020 - head of the Tereblya village council.",
    "In 2021 he graduated from the Faculty of Public Administration and Administration at the Lviv Regional Institute of Public Administration of the National Academy for Public Administration under the President of Ukraine. He is married.",
  ],
  directorLabel: "Executive Director of the Association",
  directorRule:
    "The Executive Director handles all current operational matters of the Association. If the Executive Director is not appointed by the General Meeting or their term has ended, those powers are exercised directly by the General Meeting.",
  directorName: "Denys Mykolaiovych MAN",
  directorBioTitle: "About the Executive Director",
  directorBioParagraphs: [
    "Denys MAN is a deputy of the Zakarpattia Regional Council, elected to the eighth convocation from the Zakarpattia territorial organisation of the European Solidarity political party.",
    "2010–2015 - head of clubs at the Zakarpattia Centre for Tourism and Local History.",
    "2015 - head of the Department of Tourism and Resorts of the Zakarpattia Regional State Administration.",
    "2015–2016 - head of the Department of Tourism and Resorts of the Zakarpattia Regional State Administration.",
    "2016–2019 - director of the Department of Economic Development and Trade of the Zakarpattia Regional State Administration.",
    "2020 - director of the Regional Development Agency of Zakarpattia Oblast institution.",
    "2020–2021 - deputy head of the Zakarpattia Regional Council of the eighth convocation.",
    "Throughout 2022–2026 - served in the Armed Forces of Ukraine.",
    "Since February 2026 - assistant and adviser to a People’s Deputy of Ukraine.",
  ],
  otherAbout: "Other «About us» sections",
  goToSection: "Open section",
  photoAlt: (index) => `Photo ${index}`,
  chairPhotoAlt: "Photo of the Chair of the Association",
  directorPhotoAlt: "Photo of the Executive Director",
  communitiesMapAlt: "Map of TeRA communities",
};

export function getStatutoryBodies(locale: Locale): StatutoryBodiesContent {
  return locale === "uk" ? uk : en;
}
