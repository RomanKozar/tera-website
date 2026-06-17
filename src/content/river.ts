export const RIVER_IMAGES = {
  foto8: "/images/river/foto-8.webp",
  foto9: "/images/river/foto-9.webp",
  foto10: "/images/river/foto-10.webp",
  foto11: "/images/river/foto-11.webp",
  foto13: "/images/river/foto-13.webp",
  foto14: "/images/river/foto-14.webp",
} as const;

export type RiverSection =
  | { type: "paragraphs"; paragraphs: string[] }
  | { type: "highlights"; items: { label: string; value: string }[] }
  | { type: "tributaries"; right: string[]; left: string[] }
  | { type: "image"; src: string; alt: string; wide?: boolean }
  | { type: "images-row"; images: { src: string; alt: string }[] };

export type RiverContent = {
  title: string;
  subtitle: string;
  lead: string;
  sections: { id: string; title: string; blocks: RiverSection[] }[];
};

export const riverContentUk: RiverContent = {
  title: "Річка Теребля",
  subtitle: "Теребля — річка в серці Закарпаття",
  lead:
    "Річка Теребля протікає через мальовничі райони Міжгірського, Хустського та Тячівського районів Закарпатської області, несучи свої води в Тису та з’єднуючи гірські вершини з долинами.",
  sections: [
    {
      id: "about",
      title: "Про річку",
      blocks: [
        {
          type: "highlights",
          items: [
            { label: "Протяжність", value: "91 км" },
            { label: "Площа басейну", value: "750 км²" },
            { label: "Глибина долини", value: "до 850 м" },
          ],
        },
        {
          type: "paragraphs",
          paragraphs: [
            "Річка відома своєю V-подібною долиною в верхів’ях. Водойма та її береги формують цілі екологічні системи; для фахівців вона відкриває сторінки знань у сфері історії, культурних знань та гідрології.",
            "Теребля бере свій початок високо в Карпатах на висоті близько 1500 метрів над рівнем моря. Витоки річки — це кришталево чисті струмки, що згодом зливаються в потужний потік. Подекуди похил річки сягає 9,3 метра на кілометр, роблячи її однією з найшвидших на Закарпатті.",
            "У середній і нижній течії Тереблянська долина розширюється до трапецієподібної форми, дозволяючи річці спокійно нести свої води до Тиси, де вона стає правою її притокою. Влітку зливи можуть перетворювати Тереблю на бурхливий потік, а зимові морози — на крижану стрічку.",
            "За даними гідрологічних спостережень, середня витрата води становить близько 20 кубічних метрів на секунду (у пікові повеневі періоди — до 500 кубометрів).",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto11,
          alt: "Річка Теребля в Карпатах",
          wide: true,
        },
        {
          type: "tributaries",
          right: [
            "Млиновиця",
            "Становець",
            "Дубрава",
            "Зворець",
            "Голинка",
            "Рабачинка",
            "Білий",
            "Студений",
            "Новоселиця",
          ],
          left: [
            "Уголька",
            "Монастир",
            "Глисна",
            "Бистрий",
            "Стрентурський",
            "Вільшанка",
            "Сухар",
            "Герсовець",
            "Негровець",
            "Ясеновець",
            "Озерянка",
            "Менчиловський",
          ],
        },
      ],
    },
    {
      id: "history",
      title: "Історичні дані",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "Свою назву річка, ймовірно, бере від давніх слів, пов’язаних зі словом «теребити» — очищати чи оббирати. Історія Тереблі сягає давньоруських часів, коли річка була природним кордоном і торговим шляхом. Сьогодні ріка є центром екологічного туризму та гідроенергетики. Теребля приваблює туристів кришталевими водами, багатими на форель, і навколишніми лісами. Річка є частиною національних природних парків, де поєднуються традиції гуцульської культури з сучасними екологічними проєктами.",
            "Результати археологічних досліджень вказують на знахідки періоду IX–X століть, а також свідчать про поселення вздовж берегів Тереблі, де люди займалися землеробством і торгівлею.",
            "У середні віки річка була свідком монгольських набігів у XIII столітті та угорського панування в XV–XVI століттях. У ті періоди Теребля використовувалася для транспортування деревини та солі. Із розвитком промисловості у XIX столітті на берегах річки почали з’являтися лісопилки, перетворюючи її на економічний стрижень регіону.",
          ],
        },
      ],
    },
    {
      id: "synevir",
      title: "Озеро Синевир",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "Синевир — це найбільше гірське озеро в Україні. Синевир з усіх боків оточене величними гірськими масивами: горою Кам’янкою з півночі, хребтом Овчарський Верх з півдня, грядою Боржавської полонини із заходу та горою Стримбою з південного сходу. Через таке розташування його називають «Перлиною Карпат», «Озером закоханих» і «Морським оком», і кожна з назв відображає пов’язані з цим унікальним творінням природи легенди.",
            "За переказами, своєю появою озеро завдячує величезному коханню, яке навіки поєднало душі графської доньки Сині та пастуха Віра. За наказом батька дівчини, який не бажав благословляти такий союз, слуги скинули на Віра величезний камінь, і він загинув. Синь, яка дізналася про те, що трапилося, прибігла на місце загибелі коханого і, обійнявши його тіло, плакала дні й ночі, поки її сльози не стали цілим озером, яке потягнуло у свої глибини і вбиту горем дівчину. Сьогодні про цю трагічну історію нагадує висока скульптурна група з червоного дерева «Синь і Вир», що стоїть на березі і була створена 1983 року закарпатськими майстрами І. Бровдієм і М. Саничем.",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto8,
          alt: "Озеро Синевир — Перлина Карпат",
        },
      ],
    },
    {
      id: "hes",
      title: "Теребле-Ріцька ГЕС",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "У 1950-их роках тут збудували Теребле-Ріцьку гідроелектростанцію у селі Нижній Бистрий. Попри екологічні виклики, ця станція забезпечила енергією тисячі домівок. Зараз річка є частиною проєктів відновлюваної енергетики, де балансують між виробництвом струму та збереженням природи.",
            "До зведення електростанції залучали спеціалістів, техніку, матеріальні й трудові ресурси з усього Радянського Союзу, Чехословаччини, НДР, а фінська фірма «Френсіс» виготовила турбіни та металевий напірний трубопровід, котрий уклали по схилу гори.",
            "До комплексу споруд станції після завершення їх будівництва входили: залізобетонна гребля на Тереблі заввишки 45 м на 1,5 км нижче від села Вільшани; водосховище на річці з площею затоплення 193,8 га та водного дзеркала — 1,6 кв. км; стометровий тунельний водоскид діаметром 7 м, дериваційний тунель, виритий під горою Бовцар, завдовжки 3700 м й діаметром 2,15 м, прокладений по схилу гори; наземна споруда станційного гідровузла на Ріці розміром: 37 м завдовжки, 16,4 м завширшки та 19,1 м заввишки.",
          ],
        },
        {
          type: "images-row",
          images: [
            {
              src: RIVER_IMAGES.foto9,
              alt: "Теребле-Ріцька гідроелектростанція",
            },
            {
              src: RIVER_IMAGES.foto10,
              alt: "Споруди Теребле-Ріцької ГЕС",
            },
          ],
        },
      ],
    },
    {
      id: "ecology",
      title: "Екологія",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "Екосистема Тереблі та її берегів — це симбіоз та ціла платформа біорізноманіття, де вода, ліси й тварини створюють гармонійний баланс: у верхів’ї панують гірські луки з рідкісними рослинами (едельвейс чи карпатський рододендрон); у гирлі річки риби (форель і харіус), а вздовж берегів — видри та бобри, що регулюють потік, будуючи дамби, дещо нижче за течією біорізноманіття розширюється: заплавні луки стають домівкою для птахів (сіра чапля чи зимородок), що полюють на комах і рибу.",
            "Людський вплив додає складнощів: ерозія берегів і введення інвазивних видів, як американська норка, загрожують балансу. Та найскладнішим екологічним викликом річки, без сумніву, є забруднення берегів побутовими відходами. Особливо ця картина яскраво прослідковується в час весняних паводків та осінніх повеней, коли бурхлива ріка несе величезну кількість пластику та іншого побутового бруду. Громадські організації та активісти, які дбають про довкілля, постійно проводять заходи із очищення берегів від сміття. Не менш важливою є робота з освітніми процесами щодо сортування сміття.",
            "Громади Тереблянської Долини спільно з Асоціацією «ТеРА» та екологічними організаціями активно працюють над розробкою та втіленням місцевих планів поводження з відходами, намагаючись зменшити людський вплив на забруднення довкілля.",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto13,
          alt: "Екосистема річки Теребля",
        },
      ],
    },
    {
      id: "bereg",
      title: "Берег Закарпатського моря",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "У грудні 2022 року Закарпатською обласною радою прийнято рішення про створення ландшафтного заказника місцевого значення «Берег Закарпатського Моря» на площі 90,6662 га в межах Державного підприємства «Хустське лісове дослідне господарство» та Драгівської сільської ради. За це рішення проголосували 52 депутати. Ділянку на березі Вільшанського водосховища між населеними пунктами Мерешор та Вільшани протяжністю 9 кілометрів оголошено об’єктом природно-заповідного фонду місцевого значення.",
            "Із такою ініціативою до обласної ради звернулася громадська організація «Чисто.Де» та Громадська організація «Українська природоохоронна група». Громадська екологічна організація «Чисто.Де», заснована Романом та Оленою Жук, відповідальна за організацію екопікніків на березі Вільшанського водосховища, разом із екологами направили наукове обґрунтування цінності екосистем Берега, у результаті чого в системі природоохоронних територій Закарпаття створено ландшафтний заказник «Берег Закарпатського Моря».",
            "У 2022-му році Роман Жук добровольцем пішов захищати свою країну та віддав життя за неї — загинув на південно-східному напрямку 26 травня 2022 року. Роман воював розвідником артилерійського взводу 128-ї окремої гірсько-штурмової бригади. Але заснована ним справа мала логічне продовження.",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto14,
          alt: "Берег Закарпатського моря — ландшафтний заказник",
        },
      ],
    },
  ],
};

export const riverContentEn: RiverContent = {
  title: "Tereblya River",
  subtitle: "Tereblya — a river in the heart of Zakarpattia",
  lead:
    "The Tereblya River flows through the picturesque districts of Mizhhiria, Khust, and Tiachiv in Zakarpattia Oblast, carrying its waters to the Tisza and connecting mountain peaks with valleys.",
  sections: [
    {
      id: "about",
      title: "About the river",
      blocks: [
        {
          type: "highlights",
          items: [
            { label: "Length", value: "91 km" },
            { label: "Basin area", value: "750 km²" },
            { label: "Valley depth", value: "up to 850 m" },
          ],
        },
        {
          type: "paragraphs",
          paragraphs: [
            "The river is known for its V-shaped valley in the upper reaches. The water body and its banks form entire ecological systems; for specialists it opens chapters of knowledge in history, cultural heritage, and hydrology.",
            "Tereblya rises high in the Carpathians at an altitude of about 1,500 metres above sea level. The river's sources are crystal-clear streams that eventually merge into a powerful current. In places the river's gradient reaches 9.3 metres per kilometre, making it one of the fastest in Zakarpattia.",
            "In its middle and lower course the Tereblya Valley widens into a trapezoidal shape, allowing the river to carry its waters calmly to the Tisza, where it becomes a right-bank tributary. In summer, heavy rains can turn Tereblya into a turbulent stream, while winter frosts transform it into a ribbon of ice.",
            "According to hydrological observations, the average discharge is about 20 cubic metres per second (during peak flood periods — up to 500 cubic metres).",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto11,
          alt: "Tereblya River in the Carpathians",
          wide: true,
        },
        {
          type: "tributaries",
          right: [
            "Млиновиця",
            "Становець",
            "Дубрава",
            "Зворець",
            "Голинка",
            "Рабачинка",
            "Білий",
            "Студений",
            "Новоселиця",
          ],
          left: [
            "Уголька",
            "Монастир",
            "Глисна",
            "Бистрий",
            "Стрентурський",
            "Вільшанка",
            "Сухар",
            "Герсовець",
            "Негровець",
            "Ясеновець",
            "Озерянка",
            "Менчиловський",
          ],
        },
      ],
    },
    {
      id: "history",
      title: "Historical background",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "The river's name probably derives from ancient words related to «terebity» — to clean or thresh. Tereblya's history reaches back to Kievan Rus times, when the river served as a natural border and trade route. Today the river is a centre of ecological tourism and hydropower. Tereblya attracts visitors with its crystal waters, rich in trout, and the surrounding forests. The river is part of national nature parks where Hutsul traditions meet modern environmental projects.",
            "Results of archaeological research point to finds from the 9th–10th centuries and also indicate settlements along the banks of Tereblya where people engaged in farming and trade.",
            "In the Middle Ages the river witnessed Mongol raids in the 13th century and Hungarian rule in the 15th–16th centuries. During those periods Tereblya was used to transport timber and salt. With the growth of industry in the 19th century, sawmills began appearing on the riverbanks, turning it into an economic backbone of the region.",
          ],
        },
      ],
    },
    {
      id: "synevir",
      title: "Synevyr Lake",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "Synevyr is the largest mountain lake in Ukraine. It is surrounded on all sides by majestic mountain massifs: Mount Kamyanka to the north, the Ovcharsky Verkh ridge to the south, the Borzhavska Polonyna range from the west, and Mount Strymba from the southeast. Because of this setting it is called the «Pearl of the Carpathians», the «Lake of Lovers», and the «Sea Eye» — each name reflecting legends connected with this unique work of nature.",
            "According to legend, the lake owes its existence to a great love that forever joined the souls of the count's daughter Syn and the shepherd Vir. At the father's orders — he did not wish to bless such a union — servants threw a huge stone at Vir, and he was killed. Syn, learning what had happened, ran to where her beloved had died and, embracing his body, wept day and night until her tears became an entire lake that drew into its depths the grief-stricken girl. Today this tragic story is commemorated by the tall red-wood sculpture group «Syn and Vir» on the shore, created in 1983 by Zakarpattia masters I. Brovdiy and M. Sanich.",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto8,
          alt: "Synevyr Lake — Pearl of the Carpathians",
        },
      ],
    },
    {
      id: "hes",
      title: "Tereble-Ritska HPP",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "In the 1950s the Tereble-Ritska hydroelectric power plant was built here in the village of Nyzhnii Bystryi. Despite environmental challenges, the station supplied energy to thousands of homes. Today the river is part of renewable energy projects that balance electricity generation with nature conservation.",
            "Before the power plant was built, specialists, equipment, material and labour resources were mobilised from across the Soviet Union, Czechoslovakia, and the GDR, while the Finnish company «Frensis» manufactured the turbines and metal penstock laid along the mountainside.",
            "After construction was completed, the station complex included: a reinforced-concrete dam on the Tereblya 45 m high, 1.5 km below the village of Vilshany; a reservoir on the river with a flooded area of 193.8 ha and a water surface of 1.6 sq. km; a hundred-metre tunnel spillway 7 m in diameter, a derivation tunnel dug under Mount Bovtsar, 3,700 m long and 2.15 m in diameter, laid along the mountainside; an above-ground station hydraulic unit building on the Rika measuring 37 m long, 16.4 m wide, and 19.1 m high.",
          ],
        },
        {
          type: "images-row",
          images: [
            {
              src: RIVER_IMAGES.foto9,
              alt: "Tereble-Ritska hydroelectric power plant",
            },
            {
              src: RIVER_IMAGES.foto10,
              alt: "Tereble-Ritska HPP structures",
            },
          ],
        },
      ],
    },
    {
      id: "ecology",
      title: "Ecology",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "The ecosystem of the Tereblya and its banks is a symbiosis and a whole platform of biodiversity where water, forests, and wildlife create a harmonious balance: in the upper reaches mountain meadows with rare plants dominate (edelweiss or Carpathian rhododendron); in the river mouth there are fish (trout and grayling), and along the banks otters and beavers regulate the flow by building dams; further downstream biodiversity expands: floodplain meadows become home to birds (grey heron or kingfisher) that hunt insects and fish.",
            "Human impact adds complexity: bank erosion and the introduction of invasive species such as the American mink threaten the balance. Yet without doubt the river's most difficult environmental challenge is pollution of the banks with household waste. This picture is especially vivid during spring floods and autumn high water, when the turbulent river carries huge amounts of plastic and other household debris. Community organisations and environmental activists constantly hold clean-up events on the banks. Equally important is work on educational processes around waste sorting.",
            "Communities of the Tereblya Valley, together with the «TeRA» Association and environmental organisations, are actively working on developing and implementing local waste management plans, seeking to reduce human impact on environmental pollution.",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto13,
          alt: "Ecosystem of the Tereblya River",
        },
      ],
    },
    {
      id: "bereg",
      title: "Shore of Zakarpattia Sea",
      blocks: [
        {
          type: "paragraphs",
          paragraphs: [
            "In December 2022 the Zakarpattia Regional Council adopted a decision to establish the local landscape reserve «Bereg Zakarpatskoho Moria» covering 90.6662 ha within the State Enterprise «Khust Forestry Research Farm» and the Drahiv Village Council. Fifty-two deputies voted for the decision. A 9-kilometre stretch on the shore of the Vilshany Reservoir between the settlements of Mereshor and Vilshany was declared a locally designated nature reserve.",
            "This initiative was brought to the regional council by the public organisation «Chysto.De» and the Public Organisation «Ukrainian Nature Conservation Group». The environmental NGO «Chysto.De», founded by Roman and Olena Zhuk, is responsible for organising eco-picnics on the shore of the Vilshany Reservoir; together with ecologists they submitted a scientific justification for the value of the Shore's ecosystems, as a result of which the landscape reserve «Bereg Zakarpatskoho Moria» was created in Zakarpattia's system of protected areas.",
            "In 2022 Roman Zhuk volunteered to defend his country and gave his life for it — he was killed on the southeastern front on 26 May 2022. Roman served as a scout in the artillery platoon of the 128th Separate Mountain Assault Brigade. But the cause he founded found a logical continuation.",
          ],
        },
        {
          type: "image",
          src: RIVER_IMAGES.foto14,
          alt: "Bereg Zakarpatskoho Moria — landscape reserve",
        },
      ],
    },
  ],
};

export function getRiverContent(locale: "uk" | "en"): RiverContent {
  if (locale === "en") {
    return riverContentEn;
  }
  return riverContentUk;
}
