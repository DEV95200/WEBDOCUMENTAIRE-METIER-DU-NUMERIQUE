// Configuration des vidéos YouTube et rubriques
// IMPORTANT: Pour intégrer vos vidéos YouTube:
// 1. Uploadez votre vidéo sur YouTube en "Non répertoriée"
// 2. Copiez l'ID de la vidéo (la partie après "watch?v=" dans l'URL)
//    Exemple: https://www.youtube.com/watch?v=dQw4w9WgXcQ -> l'ID est "dQw4w9WgXcQ"
// 3. Remplacez les videoId ci-dessous par vos propres IDs
// 4. Ajustez les timecodes (en secondes) selon vos vidéos montées

const SECTIONS = [
  "Maîtrise du Front-End",
  "Maîtrise du Back-End",
  "Communication Front / Back",
  "Niveau d'expertise & progression",
  "Vision & culture technologique",
  "Développeur full stack"
];

const VIDEO_CONFIG = [
  {
    title: "Maîtrise du Front-End",
    description: `Dans cet extrait de notre webdocumentaire, Samad Abdul partage une vision très concrète de la maîtrise du front-end et de ce qui compte vraiment sur le terrain : la documentation, la veille, la capacité à s’adapter… et le fait de ne pas dépendre uniquement de l’IA.\n\nIdée principale : en front-end, on ne “sait” jamais tout une bonne fois pour toutes. Les technologies évoluent, les dépendances changent, et le vrai skill, c’est de savoir chercher, comprendre et corriger.\n\nCe contenu s’inscrit dans notre projet de webdocumentaire réalisé en BUT MMI, pensé pour aider les étudiants et personnes en orientation à comprendre les réalités des métiers du développement web.`,
    videoId: "wYjARlmy_8g",
    tags: [
      "développement web", "front end", "front-end", "développeur web", "full stack", "react", "javascript", "veille technologique", "documentation", "dépendances", "apprentissage développement", "alternance développeur", "BUT MMI", "webdocumentaire", "métiers du numérique", "orientation", "étudiant", "junior dev"
    ],
    questions: [
      { question: "Quelles compétences vous semblent indispensables pour être efficace sur la partie front-end ?", timecode: 0 },
      { question: "Comment faites-vous pour rendre une interface agréable et intuitive ?", timecode: 61 },
      { question: "Quel est le piège le plus fréquent en front-end ?", timecode: 100 }
    ],
    transcript: [
      { time: 0, text: "Introduction : la compétence n°1 en front-end" },
      { time: 10, text: "Veille et adaptation : les technologies évoluent (exemple React)" },
      { time: 45, text: "Dépendances : mises à jour, obsolescence et réalité du terrain" },
      { time: 68, text: "Trouver l’inspiration : références UI et communautés (Pinterest / React)" },
      { time: 100, text: "Le piège : croire que l’IA suffit (importance de la documentation)" }
    ]
  },
  {
    title: "Maîtrise du Back-End",
    description: `\nIntervenant\n\nSamad Abdul — Développeur web / full stack\nMerci pour son retour d’expérience et son regard concret sur le back-end.\n\nDans cet extrait de notre webdocumentaire MMI, Samad Abdul revient sur sa maîtrise du back-end, les outils qu’il utilise au quotidien et sa manière de travailler côté serveur, bases de données et API.\n\nIl évoque notamment son utilisation de MongoDB et PostSQL, aussi bien dans un cadre universitaire que personnel, ainsi que les raisons pour lesquelles MongoDB lui semble plus fluide et efficace dans certains contextes, notamment pour le débogage rapide.\n\nCe contenu s’inscrit dans notre projet de webdocumentaire réalisé en BUT MMI, pensé pour aider les étudiants et personnes en orientation à comprendre les réalités des métiers du développement web.\n\nChapitres\n\n00:00 - Quelles outils ou langages back-end utilisez-vous et pourquoi ces choix ?\n00:49 - Préférez-vous REST, GraphQL ou autre approche ? Pourquoi ?\n`,
    videoId: "BOA6qwF_qLo",
    tags: [
      "back end", "backend", "développeur back end", "développement web", "full stack", "mongodb", "node js", "api rest", "graphql", "javascript", "bases de données", "debug", "IDE", "VS Code", "WebStorm", "BUT MMI", "webdocumentaire", "métiers du numérique", "PostSQL"
    ],
    questions: [
      { question: "Quelles outils ou langages back-end utilisez-vous et pourquoi ces choix ?", timecode: 0 },
      { question: "Préférez-vous REST, GraphQL ou autre approche ? Pourquoi ?", timecode: 49 }
    ],
    transcript: [
      { time: 0, text: "Quelles outils ou langages back-end utilisez-vous et pourquoi ces choix ?" },
      { time: 49, text: "Préférez-vous REST, GraphQL ou autre approche ? Pourquoi ?" }
    ]
  },
  {
    title: "Communication Front / Back",
    description: `Intervenant\n\nSamad Abdul — Développeur web / full stack\nMerci pour son retour d’expérience et son regard concret sur le back-end.\n\nDans cet extrait de notre webdocumentaire MMI, Samad Abdul explique comment s’organise la communication entre le front-end et le back-end dans un projet de développement web.\n\nIl revient sur un point essentiel : le front et le back peuvent être pensés séparément, mais ils doivent obligatoirement communiquer pour fonctionner ensemble. Cette communication passe par le back-end, qui gère la logique et la base de données, et par des scripts ou des requêtes qui permettent d’afficher des données dynamiques côté front.\n\nSamad évoque notamment l’utilisation de PHP, un langage capable de faire le lien entre front et back, en assurant la connexion à la base de données et l’affichage dynamique des contenus. Il partage également son point de vue sur les méthodes de communication, en mettant en avant l’utilisation des requêtes POST, souvent plus adaptées et plus propres dans de nombreux cas.\n\nCe contenu s’inscrit dans notre projet de webdocumentaire réalisé en BUT MMI, pensé pour aider les étudiants et personnes en orientation à comprendre les réalités des métiers du développement web.\n\nChapitres :\n00:00 - Comment vous assurez-vous que le front et le back communiquent correctement entre eux ?\n00:39 - Comment faites-vous pour rendre une interface agréable et intuitive ?`,
    videoId: "16sr7D_tqyY",
    tags: [
      "communication front back", "front end back end", "développement web", "full stack", "php", "base de données", "api", "requête post", "formulaires", "backend", "frontend", "dynamique web", "BUT MMI", "webdocumentaire", "métiers du numérique"
    ],
    questions: [
      { question: "Comment vous assurez-vous que le front et le back communiquent correctement entre eux ?", timecode: 0 },
      { question: "Comment faites-vous pour rendre une interface agréable et intuitive ?", timecode: 39 }
    ],
    transcript: [
      { time: 0, text: "Comment vous assurez-vous que le front et le back communiquent correctement entre eux ?" },
      { time: 39, text: "Comment faites-vous pour rendre une interface agréable et intuitive ?" }
    ]
  },
  {
    title: "Niveau d'expertise & progression",
    description: `Intervenant\n\nSamad Abdul — Développeur web / full stack\nMerci pour son retour d’expérience et son regard concret sur le back-end.\n\nDans cet extrait de notre webdocumentaire MMI, Samad Abdul aborde une question centrale pour tout développeur : le niveau d’expertise et la progression dans le temps.\n\nIl explique pourquoi certains langages, comme Python, sont souvent perçus comme plus accessibles au départ, notamment dans un cadre scolaire, tout en soulignant que leur maîtrise réelle demande bien plus que des bases. À travers la comparaison avec le langage C, Samad met en évidence une réalité importante : un langage peut sembler simple au début, mais devenir plus complexe dès que l’on travaille sur des projets longs et professionnels.\n\nCette vidéo met en avant un point clé du métier : apprendre à apprendre. La progression d’un développeur repose sur la documentation, la veille, la curiosité et la capacité à rester à jour dans un environnement en constante évolution.\n\nCe contenu s’inscrit dans notre projet de webdocumentaire réalisé en BUT MMI, pensé pour aider les étudiants et personnes en orientation à comprendre les réalités des métiers du développement web.\n\nChapitres :\n00:00 - Quel langage vous a demandé le plus de temps pour la maîtriser ?\n00:32 - Comment vous formez-vous pour rester à jour ?\n01:16 - Quelle langage aimeriez-vous maîtriser davantage dans les années à venir ?`,
    videoId: "zz_vee7mjvs",
    tags: [
      "niveau expertise développeur", "progression développeur", "apprentissage programmation", "python", "langage c", "documentation développeur", "veille technologique", "développement web", "full stack", "IA et développement", "BUT MMI", "webdocumentaire", "métiers du numérique"
    ],
    questions: [
      { question: "Quel langage vous a demandé le plus de temps pour la maîtriser ?", timecode: 0 },
      { question: "Comment vous formez-vous pour rester à jour ?", timecode: 32 },
      { question: "Quelle langage aimeriez-vous maîtriser davantage dans les années à venir ?", timecode: 76 }
    ],
    transcript: [
      { time: 0, text: "Quel langage vous a demandé le plus de temps pour la maîtriser ?" },
      { time: 32, text: "Comment vous formez-vous pour rester à jour ?" },
      { time: 76, text: "Quelle langage aimeriez-vous maîtriser davantage dans les années à venir ?" }
    ]
  },
  {
    title: "Vision & culture technologique",
    description: `Intervenant\n\nSamad Abdul — Développeur web / full stack\nMerci pour son retour d’expérience et son regard concret sur le back-end.\n\nDans cet extrait de notre webdocumentaire MMI, Samad Abdul partage sa vision du monde technologique, de l’évolution des langages et de la culture qui entoure le métier de développeur full stack.\n\nIl revient sur un constat fréquent dans le numérique : certains langages sont régulièrement annoncés comme « dépassés » ou « en fin de vie », alors qu’ils restent pourtant très utilisés en entreprise. Samad évoque notamment PHP, Python et Java, en expliquant pourquoi ces technologies continuent d’exister malgré l’arrivée de solutions plus récentes comme Kotlin ou d’autres frameworks modernes.\n\nSamad aborde également la question de l’intelligence artificielle, qu’il compare à une technologie encore « en phase d’adolescence ». Bien qu’elle progresse rapidement et puisse être très utile, elle reste imparfaite et ne doit pas remplacer l’esprit critique, la collaboration et la compréhension humaine.\n\nCe contenu s’inscrit dans notre projet de webdocumentaire réalisé en BUT MMI, pensé pour aider les étudiants et personnes en orientation à comprendre les réalités des métiers du développement web.\n\nChapitres :\n00:00 - Quels outils ou langages vous semblent sous-estimés aujourd’hui ?\n00:45 - Le rythme rapide d’évolution du secteur : stimulant ou épuisant ?`,
    videoId: "zKez1l6J_Kw",
    tags: [
      "vision technologique", "culture tech", "développeur full stack", "php", "python", "java", "kotlin", "intelligence artificielle", "ia et développement", "métiers du numérique", "développement web", "tendances tech", "BUT MMI", "webdocumentaire"
    ],
    questions: [
      { question: "Quels outils ou langages vous semblent sous-estimés aujourd’hui ?", timecode: 0 },
      { question: "Le rythme rapide d’évolution du secteur : stimulant ou épuisant ?", timecode: 45 }
    ],
    transcript: [
      { time: 0, text: "Quels outils ou langages vous semblent sous-estimés aujourd’hui ?" },
      { time: 45, text: "Le rythme rapide d’évolution du secteur : stimulant ou épuisant ?" }
    ]
  },
  {
    title: "Développeur full stack",
    description: "Vue d'ensemble du métier de développeur full stack",
    videoId: "dQw4w9WgXcQ", // ⚠️ Remplacez par votre ID YouTube
    questions: [
      { question: "Qu'est-ce qu'un développeur full stack pour vous ?", timecode: 0 },
      { question: "Quels sont les avantages et défis ?", timecode: 50 },
      { question: "Comment équilibrez-vous front et back ?", timecode: 100 },
      { question: "Quels conseils pour les débutants ?", timecode: 150 }
    ]
  }
];
