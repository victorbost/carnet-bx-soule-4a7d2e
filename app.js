/* Bordeaux → Soule — 3 au 8 septembre 2026
   Un seul endroit à modifier : le tableau TRIP ci-dessous.
   La météo est récupérée en direct chez Open-Meteo à chaque ouverture,
   et c'est elle qui choisit la couleur de la journée et le plat du soir. */

/* ---------- échelle thermique ---------- */
const STOPS = [
  [16, [47,110,143]], [22, [86,147,127]], [26, [201,162,39]],
  [30, [224,138,46]], [34, [210,84,42]],  [38, [168,30,20]], [42, [110,15,18]]
];
function heatColor(t){
  if (t == null || Number.isNaN(t)) return "#8A8A7A";
  if (t <= STOPS[0][0]) return rgb(STOPS[0][1]);
  if (t >= STOPS[STOPS.length-1][0]) return rgb(STOPS[STOPS.length-1][1]);
  for (let i = 0; i < STOPS.length-1; i++){
    const [a, ca] = STOPS[i], [b, cb] = STOPS[i+1];
    if (t >= a && t <= b){
      const k = (t-a)/(b-a);
      return rgb(ca.map((v,j) => Math.round(v + (cb[j]-v)*k)));
    }
  }
  return "#8A8A7A";
}
const rgb = c => `rgb(${c[0]} ${c[1]} ${c[2]})`;

/* ---------- codes météo OMM ---------- */
const WMO = {
  0:["Ciel dégagé","sun"], 1:["Plutôt dégagé","sun"], 2:["Partiellement nuageux","part"],
  3:["Couvert","cloud"], 45:["Brouillard","fog"], 48:["Brouillard givrant","fog"],
  51:["Bruine légère","rain"], 53:["Bruine","rain"], 55:["Bruine dense","rain"],
  61:["Pluie faible","rain"], 63:["Pluie","rain"], 65:["Forte pluie","rain"],
  71:["Neige faible","rain"], 73:["Neige","rain"], 75:["Forte neige","rain"],
  80:["Averses","rain"], 81:["Averses","rain"], 82:["Fortes averses","rain"],
  95:["Orage","storm"], 96:["Orage, grêle","storm"], 99:["Orage, grêle","storm"]
};
const ICONS = {
  sun:   '<circle cx="12" cy="12" r="4.6"/><g stroke-width="1.8"><path d="M12 2v2.6M12 19.4V22M2 12h2.6M19.4 12H22M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M19.1 4.9l-1.9 1.9M6.8 17.2l-1.9 1.9"/></g>',
  part:  '<circle cx="9" cy="9" r="3.6"/><g stroke-width="1.7"><path d="M9 1.6v2M1.6 9h2M3.8 3.8l1.4 1.4M14.2 3.8l-1.4 1.4"/></g><path d="M8.5 20.5h9.2a3.4 3.4 0 0 0 .3-6.8 4.7 4.7 0 0 0-9-.9 3.4 3.4 0 0 0-.5 7.7z" stroke-width="1.7"/>',
  cloud: '<path d="M7 19.5h10.2a3.7 3.7 0 0 0 .3-7.4 5.2 5.2 0 0 0-10-1 3.7 3.7 0 0 0-.5 8.4z" stroke-width="1.7"/>',
  fog:   '<path d="M7 14.5h10.2a3.7 3.7 0 0 0 .3-7.4 5.2 5.2 0 0 0-10-1 3.7 3.7 0 0 0-.5 8.4z" stroke-width="1.7"/><g stroke-width="1.8"><path d="M4 18.4h16M6.5 21.6h11"/></g>',
  rain:  '<path d="M7 15.5h10.2a3.7 3.7 0 0 0 .3-7.4 5.2 5.2 0 0 0-10-1 3.7 3.7 0 0 0-.5 8.4z" stroke-width="1.7"/><g stroke-width="1.9"><path d="M9 18.4l-1 3M13 18.4l-1 3M17 18.4l-1 3"/></g>',
  storm: '<path d="M7 14.5h10.2a3.7 3.7 0 0 0 .3-7.4 5.2 5.2 0 0 0-10-1 3.7 3.7 0 0 0-.5 8.4z" stroke-width="1.7"/><path d="M13 16.5l-3.6 4.4h3l-1.2 3.1" stroke-width="1.8"/>'
};

/* ---------- le voyage ---------- */
const TRIP = [
{
  id:"j1", n:1, wd:"Jeudi", dn:"3", seg:"Jeu 3", place:"Bordeaux", segPlace:"Bordeaux",
  date:"2026-09-03", lat:44.84, lon:-0.58,
  img:"img/bordeaux-bourse.jpg", alt:"La place de la Bourse et le miroir d'eau à Bordeaux",
  cap:"Place de la Bourse et le miroir d'eau",
  why:"Journée d'installation. On ne force rien : les courses le matin tant que le marché est ouvert, la ville quand le soleil baisse.",
  tl:[
    ["10:34","Arrivée à Bordeaux Saint-Jean","Victor et Alexandre. Tram C depuis la gare pour rejoindre le centre.",1],
    ["11:00","Check-in, rue des Amandiers","Le logement est dispo dès l'arrivée. Déposer les sacs et fermer les volets côté soleil tout de suite : il fera 32 °C cet après-midi.",1],
    ["12:00","Marché des Capucins","Ouvert mardi–vendredi de 6h à 13h : c'est le dernier créneau avant samedi, alors on y va sans traîner. Tomates, fromage, jambon, fruits. Sinon, supérette rue Sainte-Catherine.",0],
    ["13:30","Déjeuner et creux de l'après-midi","On mange ce qu'on a acheté et on ne ressort pas entre 13h et 17h. C'est le pic de chaleur.",0],
    ["?","Arrivée de Matthis","Heure encore à confirmer — dites-la-nous et cette ligne se cale dessus. Prévoir d'aller le chercher à Saint-Jean.",1],
    ["18:30","Vieux Bordeaux à l'ombre","Quartier Saint-Pierre, la Grosse Cloche, la porte Cailhau : rues étroites, donc ombragées. On finit place de la Bourse.",0],
    ["20:30","Miroir d'eau au crépuscule","Il alterne miroir et nappe de brume toutes les quelques minutes. C'est mieux à la tombée du jour, et on peut y marcher pieds nus.",0],
    ["21:30","Dîner à l'appartement","",0]
  ],
  dinner:{
    hot:{d:"Salade grecque",b:"Tomates, concombre, feta, olives noires, oignon rouge, origan, huile d'olive. Du pain à côté.",w:"Plus de 30 °C : rien qui demande d'allumer le feu le premier soir."},
    mild:{d:"Pâtes au pesto",b:"Pâtes courtes, pesto, parmesan, quelques tomates cerises, pignons si vous en trouvez.",w:"Chaud mais supportable : dix minutes de cuisson, pas plus."},
    wet:{d:"Omelette et salade verte",b:"Œufs, un fromage, salade, vinaigrette, pain.",w:"Il pleut : on reste dedans et on fait simple."}
  },
  notes:[
    "<b>Marché des Capucins</b> : mardi–vendredi 6h–13h, samedi et dimanche 5h30–14h30, <b>fermé le lundi</b>.",
    "Le miroir d'eau est en face de la place de la Bourse, sur les quais — 15 min à pied du quartier Saint-Pierre.",
    "Pour les tickets de tram, prenez un carnet dès le premier jour, ça revient moins cher que l'unité."
  ]
},
{
  id:"j2", n:2, wd:"Vendredi", dn:"4", seg:"Ven 4", place:"Arcachon", segPlace:"Arcachon",
  date:"2026-09-04", lat:44.66, lon:-1.17,
  img:"img/arcachon.jpg", alt:"La jetée Thiers et le front de mer d'Arcachon",
  cap:"La jetée Thiers, Arcachon",
  why:"C'est le jour le plus chaud de la semaine à Bordeaux, et il fait dix degrés de moins au bord du bassin. On part à la mer précisément le jour où la ville devient invivable.",
  tl:[
    ["08:30","Train Saint-Jean → Arcachon","Environ 50 min, à peu près deux trains par heure, le premier à 6h03. TER : pas de réservation, le billet s'achète le matin même.",0],
    ["09:30","Plage Thiers","15 min à pied de la gare, tout droit vers le front de mer. Le bassin n'a pas de vagues : c'est de la baignade tranquille, pas de l'océan.",0],
    ["12:30","Huîtres","Au marché couvert d'Arcachon ou dans une cabane du port ostréicole. Huîtres, pain de seigle beurré, citron, un verre de blanc. Ça se mange debout.",0],
    ["14:00","Ville d'Hiver","Le quartier des villas du XIXe, construit dans les pins sur la dune derrière la ville. C'est le seul endroit vraiment ombragé d'Arcachon. Ascenseur public gratuit depuis le parc Mauresque.",0],
    ["17:00","Deuxième bain","La mer est plus chaude en fin d'après-midi et la plage se vide.",0],
    ["19:30","Retour à Bordeaux","",0]
  ],
  dinner:{
    hot:{d:"Salade de pâtes froide",b:"Pâtes, thon, tomates, olives, basilic, citron. Se prépare tiède et se mange froid.",w:"Retour tard et grosse chaleur : ça se fait en une casserole."},
    mild:{d:"Croque-monsieur et salade",b:"Pain de mie, jambon, fromage, une salade verte à côté.",w:"Soirée douce, dîner rapide après une journée de plage."},
    wet:{d:"Soupe de poisson et rouille",b:"Une bonne soupe de poisson toute prête, rouille, croûtons, gruyère.",w:"Journée humide au bord de l'eau : quelque chose de chaud."}
  },
  notes:[
    "<b>La dune du Pilat, c'est un bus depuis Arcachon</b> — écartée, comme convenu.",
    "Le Cap Ferret se fait en bateau depuis la jetée Thiers (~30 min) si vous voulez changer de rive, mais ça mange tout l'après-midi.",
    "Emportez de l'eau et de la crème solaire : l'ombre est rare sur le front de mer."
  ]
},
{
  id:"j3", n:3, wd:"Samedi", dn:"5", seg:"Sam 5", place:"Saint-Émilion", segPlace:"St-Émilion",
  date:"2026-09-05", lat:44.89, lon:-0.16,
  img:"img/saint-emilion.jpg", alt:"Vue de Saint-Émilion depuis la tour du Roi",
  cap:"Saint-Émilion vu depuis la tour du Roi",
  why:"La journée la plus clémente à l'intérieur des terres. C'est donc celle du village perché, du plein soleil sur les vignes et de la montée à pied depuis la gare.",
  tl:[
    ["09:20","Train direct Saint-Jean → Saint-Émilion","Environ 35 min, direct, à peu près un par heure. Vérifiez les horaires du samedi la veille : il y a des trous dans la journée.",0],
    ["10:00","Montée au village","1,5 km entre la gare et le village, 20 min à pied, et ça grimpe. À faire le matin, pas à 15h.",0],
    ["10:30","Église monolithe","Creusée d'un seul bloc dans la roche, la plus grande d'Europe. Visite guidée uniquement, par l'office de tourisme : <b>à réserver avant de partir</b>.",0],
    ["12:00","Déjeuner et macarons","Les macarons de Saint-Émilion suivent une recette de 1620 : moelleux, rien à voir avec les macarons parisiens.",0],
    ["14:00","Tour du Roi","118 marches et le panorama sur toute la juridiction. C'est la vue de la photo ci-dessus.",0],
    ["15:00","Dégustation","Plusieurs maisons de vin dans le village même : on goûte du saint-émilion sans avoir besoin d'une voiture.",0],
    ["17:30","Retour à Bordeaux","",0],
    ["21:00","Verre avec le cousin de Victor","Terrasses du quartier Saint-Pierre, ou les quais des Chartrons s'il faut de la place. Lieu et heure à caler avec lui dans la semaine.",1]
  ],
  dinner:{
    hot:{d:"Gazpacho et planche",b:"Gazpacho (tout prêt, c'est très bien), jambon, fromage, pain, quelques radis.",w:"Il fait chaud et vous sortez boire un verre après : léger, froid, vite fait."},
    mild:{d:"Tartines chèvre, miel et noix",b:"Pain de campagne, bûche de chèvre, miel, cerneaux de noix, salade.",w:"Dîner court avant de sortir retrouver le cousin."},
    wet:{d:"Croque-monsieur et soupe",b:"Pain de mie, jambon, fromage, une soupe de légumes.",w:"Soirée humide : on se cale avant de ressortir."}
  },
  notes:[
    "Notez l'heure du dernier train en arrivant à la gare — ce n'est pas une ligne à rater.",
    "Le village est en pavés et en pente : évitez les tongs.",
    "La visite de l'église monolithe part de l'office de tourisme, place des Créneaux."
  ]
},
{
  id:"j4", n:4, wd:"Dimanche", dn:"6", seg:"Dim 6", place:"Bordeaux", segPlace:"Bordeaux",
  date:"2026-09-06", lat:44.84, lon:-0.58,
  img:"img/bordeaux-chartrons.jpg", alt:"Le quai des Chartrons, le long de la Garonne à Bordeaux",
  cap:"Le quai des Chartrons, où se tient le marché du dimanche",
  why:"Retour de la grosse chaleur en ville. Le marché tôt le matin, les endroits frais l'après-midi, et un apéro à l'appartement le soir — c'est la dernière soirée à Bordeaux.",
  tl:[
    ["08:00","Marché des quais des Chartrons","Tous les dimanches de 7h à 13h, le long de la Garonne. <b>C'est ici qu'on achète l'apéro du soir</b> : le dimanche après-midi, presque tout est fermé.",1],
    ["10:30","Retour à l'appartement","Ranger les courses, fermer les volets. La journée monte vers 38 °C.",0],
    ["14:00","Bassins des Lumières","L'ancienne base sous-marine transformée en salle de projection monumentale. Immense, sombre et frais : le meilleur endroit de Bordeaux un jour de canicule. Billets en ligne.",0],
    ["16:30","Cité du Vin ou CAPC","La Cité du Vin est à dix minutes à pied des Bassins ; le belvédère du 8e étage avec un verre est compris dans le billet. Sinon le CAPC, art contemporain dans un ancien entrepôt : hauteur sous plafond et fraîcheur garanties.",0],
    ["19:30","Apéro à l'appartement","La soirée du voyage. On sort tout, on ne cuisine rien.",1]
  ],
  dinner:{
    fixed:{d:"Apéro dînatoire",b:"<b>Fromages</b> : ossau-iraty et un chèvre. <b>Charcuterie</b> : jambon de Bayonne (répétition générale), un pâté, du saucisson. <b>Frais</b> : melon, tomates cerises, radis et beurre salé, cornichons. <b>À côté</b> : une baguette, des olives, des chips. <b>À boire</b> : un blanc sec d'entre-deux-mers ou un rosé, très frais.",w:"Le seul vrai apéro du séjour, et le dîner du dimanche soir. Tout s'achète le matin même aux Chartrons."}
  },
  notes:[
    "<b>Dimanche, la plupart des commerces sont fermés</b> — si vous ratez le marché, il ne restera pas grand-chose pour l'apéro.",
    "Les Bassins des Lumières et la Cité du Vin sont dans le même quartier, aux Bassins à flot (tram B).",
    "Le CAPC est gratuit le premier dimanche du mois — à vérifier sur place, ça tombe pile ce week-end."
  ]
},
{
  id:"j5", n:5, wd:"Lundi", dn:"7", seg:"Lun 7", place:"Bordeaux → Lohitzun-Oyhercq", segPlace:"Transfert",
  date:"2026-09-07", lat:43.28, lon:-0.98,
  img:"img/soule.jpg", alt:"Une église et un village de Soule au pied des collines basques",
  cap:"La Soule, l'arrière-pays basque autour de Lohitzun-Oyhercq",
  why:"Journée de transfert. Le maillon fragile n'est pas le train : ce sont les derniers kilomètres entre Bayonne et Lohitzun-Oyhercq, où il n'y a pas de gare.",
  tl:[
    ["10:00","Check-out","Vider le frigo, laisser les clés comme convenu.",1],
    ["11:00","Dernier tour et déjeuner","Rue Sainte-Catherine ou les quais, selon l'humeur et le poids des sacs.",0],
    ["13:00","Train Bordeaux → Bayonne","Entre 1h45 et 2h10, une quinzaine de trains par jour, à peu près un par heure de 6h à 21h. <b>Si c'est un TGV ou un Intercités, la réservation est obligatoire</b> : à prendre à l'avance.",1],
    ["15:30","Bayonne → Lohitzun-Oyhercq","Pas de train. Car interurbain vers Mauléon-Licharre, puis les derniers kilomètres. Les cars ruraux sont rares et s'arrêtent tôt : <b>c'est Matthis qui sait</b> — demandez-lui le trajet exact avant de réserver le train du matin.",1],
    ["19:00","Soirée chez Matthis","",0]
  ],
  dinner:{
    fixed:{d:"On apporte Bordeaux avec nous",b:"Des canelés achetés le matin, et la bouteille de saint-émilion rapportée de samedi.",w:"On arrive chez quelqu'un : on ne cuisine pas, on amène."}
  },
  notes:[
    "<b>Réservez le Bordeaux → Bayonne dès que l'horaire du car est connu</b> : les prix montent et les TGV se remplissent.",
    "À confirmer avec Matthis : l'arrêt de car le plus proche de chez lui, et s'il peut faire le dernier bout en voiture.",
    "Prévoyez large entre le train et le car — un car raté en Soule, c'est un taxi ou rien."
  ]
},
{
  id:"j6", n:6, wd:"Mardi", dn:"8", seg:"Mar 8", place:"Bayonne", segPlace:"Bayonne",
  date:"2026-09-08", lat:43.49, lon:-1.47,
  img:"img/bayonne.jpg", alt:"Les maisons du Petit Bayonne le long de la Nive",
  cap:"Le Petit Bayonne, le long de la Nive",
  why:"Matthis conduit jusqu'à Bayonne. Journée plus fraîche, peut-être un peu de pluie : parfait pour une ville de rues étroites, d'arcades et de chocolat.",
  tl:[
    ["10:30","Arrivée à Bayonne","Matthis conduit et vous dépose. Il repartira de la gare le soir.",1],
    ["11:00","Cathédrale Sainte-Marie et son cloître","Gothique, inscrite à l'UNESCO au titre des chemins de Saint-Jacques. Le cloître est le coin calme de la ville.",0],
    ["12:00","Halles de Bayonne","Le marché couvert au bord de la Nive : jambon de Bayonne, piment d'Espelette, fromage de brebis. C'est ici qu'on rapporte quelque chose.",0],
    ["13:00","Déjeuner","Pintxos et un verre autour des halles, ou sur les quais de la Nive.",0],
    ["15:00","Petit Bayonne et Musée Basque","Le musée est fermé le lundi mais ouvert le mardi — vous tombez bien. La meilleure introduction au Pays basque si vous n'y êtes jamais allés.",0],
    ["16:30","Chocolat, rue Port-Neuf","Bayonne a été la première ville chocolatière de France. Un chocolat chaud sous les arcades, chez Cazenave ou Daranatz.",0],
    ["18:20","À la gare","La gare est de l'autre côté de l'Adour, 15 à 20 min à pied du centre. Partez large.",1],
    ["18:47","Départ de Victor et Alexandre","Matthis rentre en Soule.",1]
  ],
  dinner:{
    fixed:{d:"Casse-croûte des halles, dans le train",b:"Achetez-le le matin aux halles : jambon, brebis, une tomate, du pain. Un jambon sous vide voyage très bien aussi.",w:"Départ à 18h47 : le dîner se fait dans le train, autant qu'il soit bon."}
  },
  notes:[
    "Les halles ferment en début d'après-midi : faites les achats à emporter avant le déjeuner.",
    "S'il pleut, la rue Port-Neuf et les arcades du Grand Bayonne se font au sec."
  ]
}
];

const PRACTICAL = [
  {t:"Billets à prendre", todo:true, li:[
    "<b>Bordeaux → Bayonne, lundi 7</b> — réservation obligatoire si c'est un TGV ou un Intercités. À prendre en premier.",
    "<b>Église monolithe de Saint-Émilion</b> — visite guidée uniquement, réservation à l'office de tourisme.",
    "<b>Bassins des Lumières, dimanche 6</b> — billets en ligne, c'est couru un jour de canicule.",
    "TER Arcachon et Saint-Émilion — pas de réservation, achat le jour même."
  ]},
  {t:"À confirmer", todo:true, li:[
    "L'heure d'arrivée de <b>Matthis</b> jeudi.",
    "Le trajet <b>Bayonne → Lohitzun-Oyhercq</b> lundi : quel car, quel arrêt, jusqu'à quelle heure.",
    "Le lieu et l'heure du verre avec <b>le cousin de Victor</b>, samedi soir."
  ]},
  {t:"38 °C, mode d'emploi", li:[
    "Volets fermés toute la journée, on aère la nuit.",
    "Rien d'exposé entre 13h et 17h : c'est le créneau musée, sieste ou baignade.",
    "Une gourde chacun. Bordeaux a des fontaines un peu partout dans le centre.",
    "Les alliés : le miroir d'eau, les Bassins des Lumières, le tram climatisé et la Ville d'Hiver d'Arcachon."
  ]},
  {t:"Sans voiture, ce qu'on écarte", li:[
    "<b>La dune du Pilat</b> — bus depuis Arcachon.",
    "<b>Le Cap Ferret</b> — bateau puis vélo. Faisable, mais ça prend la journée.",
    "<b>Les châteaux du Médoc et Lacanau</b> — pas de train.",
    "Tout le reste du programme se fait à pied ou en TER direct."
  ]},
  {t:"Horaires des marchés", li:[
    "<b>Capucins</b> — mardi à vendredi 6h–13h, samedi et dimanche 5h30–14h30, fermé le lundi.",
    "<b>Quais des Chartrons</b> — dimanche 7h–13h.",
    "<b>Halles de Bayonne</b> — tous les matins, et le mardi tombe bien."
  ]},
  {t:"Trajets en train", mono:true, li:[
    "Bordeaux → Arcachon · 50 min · ~2 par heure",
    "Bordeaux → Saint-Émilion · 35 min · ~1 par heure",
    "Bordeaux → Bayonne · 1h45–2h10 · ~15 par jour",
    "Gare de Saint-Émilion → village · 20 min à pied, ça monte",
    "Gare d'Arcachon → plage · 15 min à pied"
  ]}
];

const CREDITS = [
 {
  "slug": "bordeaux-bourse",
  "file": "Bordeaux place de la bourse with tram.JPG",
  "artist": "Phillip Maiwald (Nikopol)",
  "license": "CC BY-SA 3.0",
  "page": "https://commons.wikimedia.org/wiki/File%3ABordeaux_place_de_la_bourse_with_tram.JPG"
 },
 {
  "slug": "arcachon",
  "file": "Arcachon Jetée Thiers R04.jpg",
  "artist": "Marc Ryckaert (MJJR)",
  "license": "CC BY 3.0",
  "page": "https://commons.wikimedia.org/wiki/File%3AArcachon_Jet%C3%A9e_Thiers_R04.jpg"
 },
 {
  "slug": "saint-emilion",
  "file": "Panorama de Saint Emilion De la tour du roi 2 - Gironde.jpg",
  "artist": "Didier Descouens",
  "license": "CC BY-SA 4.0",
  "page": "https://commons.wikimedia.org/wiki/File%3APanorama_de_Saint_Emilion_De_la_tour_du_roi_2_-_Gironde.jpg"
 },
 {
  "slug": "bordeaux-chartrons",
  "file": "Bordeaux - Quai des Chartrons 3.jpg",
  "artist": "C.B. circa 1900-1920",
  "license": "Public domain",
  "page": "https://commons.wikimedia.org/wiki/File%3ABordeaux_-_Quai_des_Chartrons_3.jpg"
 },
 {
  "file": "Eglise sainte engrace.jpg",
  "artist": "Stephanemartin",
  "license": "CC BY-SA 3.0",
  "page": "https://commons.wikimedia.org/wiki/File%3AEglise_sainte_engrace.jpg",
  "slug": "soule"
 },
 {
  "file": "Bayonne- Quartier du Petit Bayonne-20150507.jpg",
  "artist": "Daniel VILLAFRUELA.",
  "license": "CC BY-SA 4.0",
  "page": "https://commons.wikimedia.org/wiki/File%3ABayonne-_Quartier_du_Petit_Bayonne-20150507.jpg",
  "slug": "bayonne"
 }
];

/* ---------- rendu ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");

function icon(name){
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"
    stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.cloud}</svg>`;
}

function renderDays(){
  $("#days").innerHTML = TRIP.map(d => `
    <article class="day" id="${d.id}">
      <div class="day-head">
        <div>
          <p class="day-num">Jour ${d.n} sur 6</p>
          <h2 class="day-title">${d.wd} ${d.dn} septembre</h2>
          <p class="day-place" data-heat="${d.id}">${esc(d.place)}</p>
          <p class="day-why">${d.why}</p>
        </div>
        <div class="wx" id="wx-${d.id}">
          <div class="wx-top"><span class="wx-temp">··</span></div>
          <p class="wx-desc">Météo en cours de chargement</p>
        </div>
      </div>
      <div id="alert-${d.id}"></div>
      <figure class="banner">
        <img src="${d.img}" alt="${esc(d.alt)}" loading="lazy" decoding="async">
        <figcaption>${esc(d.cap)}</figcaption>
      </figure>
      <ol class="tl">
        ${d.tl.map(([t,h,p,fix]) => `
          <li><span class="t mono">${t}</span>
            <div class="${fix ? "fix" : ""}"><h4>${h}</h4>${p ? `<p>${p}</p>` : ""}</div></li>`).join("")}
      </ol>
      <div class="dinner${d.dinner.fixed ? " apero" : ""}" id="din-${d.id}"></div>
      <ul class="notes">${d.notes.map(n => `<li>${n}</li>`).join("")}</ul>
    </article>`).join("");
}

function renderRibbon(){
  $("#ribbon-inner").innerHTML = TRIP.map(d => `
    <a class="seg" href="#${d.id}" id="seg-${d.id}" aria-label="Jour ${d.n}, ${d.wd} ${d.dn}, ${d.place}">
      <div class="seg-fill" style="height:22%"></div>
      <span class="seg-txt">
        <span class="seg-day">${d.seg}</span>
        <span>
          <span class="seg-temp">··</span><br>
          <span class="seg-place">${esc(d.segPlace)}</span>
        </span>
      </span>
    </a>`).join("");
}

function renderPractical(){
  $("#practical-cols").innerHTML = PRACTICAL.map(c => `
    <div class="card${c.todo ? " todo" : ""}">
      <h3>${c.t}</h3>
      <ul>${c.li.map(x => `<li${c.mono ? ' class="mono" style="font-size:13px"' : ""}>${x}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderCredits(){
  if (!CREDITS.length){ $("#credits").closest(".foot").querySelector(".h3").hidden = true; return; }
  $("#credits").innerHTML = CREDITS.map(c =>
    `<li><a href="${c.page}">${esc(c.file)}</a> — ${esc(c.artist)}, ${esc(c.license)}, via Wikimedia Commons</li>`
  ).join("");
}

/* choisit le plat du soir d'après la météo du jour */
function pickDinner(d, wx){
  if (d.dinner.fixed) return d.dinner.fixed;
  if (!wx) return d.dinner.mild;
  if (wx.rain >= 3) return d.dinner.wet;
  if (wx.max >= 30) return d.dinner.hot;
  return d.dinner.mild;
}

function paintDinner(d, wx){
  const p = pickDinner(d, wx);
  $(`#din-${d.id}`).innerHTML = `
    <p class="dinner-lab">${d.dinner.fixed && d.n === 4 ? "Apéro du séjour" : "Le soir"}</p>
    <p class="dinner-dish">${p.d}</p>
    <p class="dinner-buy">${p.b}</p>
    <p class="dinner-why">${p.w}</p>`;
}

function paintWeather(d, wx){
  const c = heatColor(wx && wx.max);
  const seg = $(`#seg-${d.id}`), card = $(`#wx-${d.id}`);
  seg.style.setProperty("--heat", c);
  card.style.setProperty("--heat", c);
  $(`.day-place[data-heat="${d.id}"]`).style.setProperty("--heat", c);
  $(`#${d.id} .tl`).style.setProperty("--heat", c);
  $(`#alert-${d.id}`).style.setProperty("--heat", c);

  if (!wx){
    card.innerHTML = `<div class="wx-top"><span class="wx-temp">—</span></div>
      <p class="wx-desc">Prévision indisponible</p>
      <p class="wx-rain">Rouvrez la page plus près du départ.</p>`;
    return;
  }
  const [label, ic] = WMO[wx.code] || ["—","cloud"];
  seg.querySelector(".seg-fill").style.height =
    Math.max(22, Math.min(100, 22 + (wx.max - 15) / 25 * 78)) + "%";
  seg.querySelector(".seg-temp").textContent = Math.round(wx.max) + "°";

  card.innerHTML = `
    <div class="wx-top">${icon(ic)}
      <span class="wx-temp">${Math.round(wx.max)}°</span>
      <span class="wx-min">min ${Math.round(wx.min)}°</span></div>
    <p class="wx-desc">${label}</p>
    <p class="wx-rain">pluie ${wx.rain.toFixed(1)} mm · risque ${wx.prob ?? 0}%</p>`;

  const al = [];
  if (wx.max >= 35) al.push(`<b>Forte chaleur — ${Math.round(wx.max)} °C.</b> Pas de visite exposée entre 13h et 17h, et de l'eau sur soi.`);
  else if (wx.max >= 31) al.push(`<b>Journée chaude.</b> Cherchez l'ombre l'après-midi.`);
  if (wx.prob >= 40 || wx.rain >= 3) al.push(`<b>Pluie probable.</b> Gardez une solution à l'intérieur sous la main.`);
  $(`#alert-${d.id}`).innerHTML = al.length ? `<p class="alert">${al.join(" ")}</p>` : "";
}

async function loadWeather(){
  const lat = TRIP.map(d => d.lat).join(",");
  const lon = TRIP.map(d => d.lon).join(",");
  const url = "https://api.open-meteo.com/v1/forecast"
    + `?latitude=${lat}&longitude=${lon}`
    + "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max"
    + "&timezone=Europe%2FParis&start_date=2026-09-03&end_date=2026-09-08";

  let data = null;
  try {
    const r = await fetch(url);
    if (r.ok) data = await r.json();
  } catch (e) { /* hors ligne : on garde les valeurs par défaut */ }

  let hottest = null;
  TRIP.forEach((d, i) => {
    let wx = null;
    const loc = Array.isArray(data) ? data[i] : (i === 0 ? data : null);
    if (loc && loc.daily){
      const j = loc.daily.time.indexOf(d.date);
      if (j > -1 && loc.daily.temperature_2m_max[j] != null){
        wx = {
          max:  loc.daily.temperature_2m_max[j],
          min:  loc.daily.temperature_2m_min[j],
          rain: loc.daily.precipitation_sum[j] ?? 0,
          prob: loc.daily.precipitation_probability_max[j],
          code: loc.daily.weather_code[j]
        };
        if (!hottest || wx.max > hottest.max) hottest = { max: wx.max, day: d };
      }
    }
    paintWeather(d, wx);
    paintDinner(d, wx);
  });

  $("#ribbon-key").textContent = hottest
    ? `Maximales prévues · pic à ${Math.round(hottest.max)} °C ${hottest.day.wd.toLowerCase()} à ${hottest.day.segPlace.toLowerCase()} · source Open-Meteo`
    : "Prévisions indisponibles — la page marche quand même, la météo se remplira plus tard.";
}

renderRibbon();
renderDays();
renderPractical();
renderCredits();
loadWeather();
