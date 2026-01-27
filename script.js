// Configuration dynamique du positionnement
function setupGearPositioning() {
  const gearModule = document.getElementById('gear-module');
  const rootStyles = getComputedStyle(document.documentElement);
  const positionSide = rootStyles.getPropertyValue('--gear-position-side').trim();
  
  gearModule.setAttribute('data-side', positionSide);
}

// Éléments DOM
const svg       = document.getElementById("gear-svg");
const gearGroup = document.getElementById("gearGroup");
const teeth     = SECTIONS.length;

// Configuration de la roue
const baseRadius   = 80;
const toothLength  = 38;
const toothWidth   = 52;
const cornerRadius = 10;
const holeRadius   = 35;
const gearColor    = "#d8d8d8";
const outerRadius  = baseRadius + toothLength;

// Construction de la roue SVG
function buildGear() {
  // Corps
  const body = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  body.setAttribute("cx", "0");
  body.setAttribute("cy", "0");
  body.setAttribute("r", String(baseRadius));
  body.setAttribute("fill", gearColor);
  gearGroup.appendChild(body);

  // Dents
  for (let i = 0; i < teeth; i++) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(-toothWidth / 2));
    rect.setAttribute("y", String(-baseRadius - toothLength + 4));
    rect.setAttribute("width", String(toothWidth));
    rect.setAttribute("height", String(toothLength));
    rect.setAttribute("rx", String(cornerRadius));
    rect.setAttribute("ry", String(cornerRadius));
    rect.setAttribute("fill", gearColor);
    rect.setAttribute("transform", `rotate(${(360 / teeth) * i})`);
    gearGroup.appendChild(rect);
  }

  // Trou central
  const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  center.setAttribute("cx", "0");
  center.setAttribute("cy", "0");
  center.setAttribute("r", String(holeRadius));
  center.setAttribute("fill", "#ffffff");
  gearGroup.appendChild(center);
}

// Éléments interactifs supprimés (hotspot et label)





// Gestion des vidéos YouTube
const navItems      = Array.from(document.querySelectorAll("#navList li"));
const gearClickZone = document.getElementById("gearClickZone");
const mainVideo     = document.getElementById("mainVideo");
const videoTitle    = document.getElementById("videoTitle");
const videoDescription = document.getElementById("videoDescription");
const questionsList = document.getElementById("questionsList");

// Variable pour stocker le lecteur YouTube
let player = null;
let playerReady = false;

// Charger l'API YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Fonction appelée quand l'API YouTube est prête
function onYouTubeIframeAPIReady() {
  // Le lecteur sera initialisé lors de la première vidéo
  console.log('YouTube API Ready');
}

// Fonction pour créer/mettre à jour le lecteur YouTube


// Remplace ta fonction updateVideo par celle-ci
function updateVideo(index) {
  const data = VIDEO_CONFIG[index];
  if (!data) return;

  // 1. Mise à jour des textes
  const titleEl = document.querySelector('.video-info h2');
  const descEl = document.querySelector('.video-description');
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.description;

  // 2. Mise à jour de l'iframe YouTube
  const mainVideo = document.getElementById("mainVideo");
  if (mainVideo) {
    const newSrc = `https://www.youtube.com/embed/${data.videoId}?enablejsapi=1&rel=0&modestbranding=1`;
    if (mainVideo.src !== newSrc) {
      mainVideo.src = newSrc;
    }
  }

  // 3. Régénérer le panneau des questions
  const questionsList = document.getElementById("questionsList");
  if (questionsList) {
    questionsList.innerHTML = ""; // On vide
    data.questions.forEach(q => {
      const btn = document.createElement("button");
      btn.className = "question-item";
      btn.textContent = q.question;
      btn.onclick = () => {
        // Envoi de la commande de temps à l'iframe
        const iframe = document.getElementById("mainVideo");
        iframe.contentWindow.postMessage(JSON.stringify({
          "event": "command",
          "func": "seekTo",
          "args": [q.timecode, true]
        }), "*");
      };
      questionsList.appendChild(btn);
    });
  }
}

// Fonction pour mettre à jour les questions

function updateQuestions(index) {
  const data = VIDEO_CONFIG[index];
  if (!data || !data.questions) return;

  questionsList.innerHTML = '';

  data.questions.forEach((q, i) => {
    const li = document.createElement('li');
    li.textContent = q.question;
    li.dataset.timecode = q.timecode;
    li.dataset.questionIndex = i;

    // Clic pour aller au timecode
    li.addEventListener('click', () => {
      // Fallback : si player API absente, changer src avec timecode
      if (typeof YT === 'undefined' || !YT.Player || !player) {
        const currentVideoId = data.videoId;
        mainVideo.src = `https://www.youtube.com/embed/${currentVideoId}?start=${q.timecode}&autoplay=1&controls=1&rel=0&modestbranding=1`;
      } else if (player && playerReady) {
        // Si la vidéo affichée est déjà la bonne
        const currentId = player.getVideoData && player.getVideoData().video_id;
        if (currentId === data.videoId) {
          player.seekTo(q.timecode, true);
          player.playVideo();
        } else {
          // Charger la vidéo puis seekTo
          player.loadVideoById({videoId: data.videoId, startSeconds: q.timecode});
          player.playVideo();
        }
      }
      // Marquer comme active
      document.querySelectorAll('.questions-list li').forEach(item => {
        item.classList.remove('active');
      });
      li.classList.add('active');
    });

    questionsList.appendChild(li);
  });
}

// Variables de navigation
let currentIndex = 0;
const stepAngle = 360 / teeth;

// Mise à jour globale de l'interface
function updateUI() {
  gearGroup.style.transform = `rotate(${currentIndex * stepAngle}deg)`;

  navItems.forEach((li, i) => li.classList.toggle("active", i === currentIndex));
  
  // Mettre à jour la vidéo centrale
  updateVideo(currentIndex);
  // Mettre à jour le SEO dynamique
  updateMetaSEO(currentIndex);
}
// SEO dynamique : génère les balises meta keywords et description à partir de VIDEO_CONFIG
function updateMetaSEO(index = 0) {
  // Récupère toutes les infos de toutes les rubriques
  let allKeywords = [];
  let allQuestions = [];
  let allTitles = [];
  let allTags = [];
  let allDescriptions = [];
  VIDEO_CONFIG.forEach(section => {
    if (section.title) allTitles.push(section.title);
    if (section.description) allDescriptions.push(section.description);
    if (section.tags) allTags = allTags.concat(section.tags);
    if (section.questions) allQuestions = allQuestions.concat(section.questions.map(q => q.question));
  });
  // Pour la rubrique active, description prioritaire
  const current = VIDEO_CONFIG[index] || {};
  const metaDesc = current.description || allDescriptions[0] || '';
  // Keywords globaux
  const keywords = [...allTitles, ...allTags, ...allQuestions].join(", ");
  // Mise à jour des balises meta
  const metaKeywords = document.getElementById('meta-dynamic-keywords');
  const metaDescription = document.getElementById('meta-dynamic-description');
  if (metaKeywords) metaKeywords.setAttribute('content', keywords);
  if (metaDescription) metaDescription.setAttribute('content', metaDesc);
}


// Navigation
function goNext() {
  currentIndex = (currentIndex + 1) % SECTIONS.length;
  updateUI();
}

function goPrev() {
  currentIndex = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
  updateUI();
}

// Event listeners
gearClickZone.addEventListener("click", (e) => {
  const rect = gearClickZone.getBoundingClientRect();
  const centerY = rect.top + rect.height / 2;
  if (e.clientY < centerY) goNext();
  else goPrev();
});

navItems.forEach((li) => {
  li.addEventListener("click", () => {
    const index = Number(li.dataset.index);
    if (!Number.isNaN(index)) {
      currentIndex = index;
      updateUI();
    }
  });
});

// Gestion du menu burger
const burgerMenu = document.getElementById('burgerMenu');
const navList = document.getElementById('navList');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  navList.classList.toggle('active');
});

// Fermer le menu après avoir cliqué sur un élément
navItems.forEach(li => {
  li.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      burgerMenu.classList.remove('active');
      navList.classList.remove('active');
    }
  });
});

// Gestion des overlays
const overlays = {
  podcast: {
    btn: document.getElementById('podcastBtn'),
    overlay: document.getElementById('podcastOverlay')
  },
  credits: {
    btn: document.getElementById('creditsBtn'),
    overlay: document.getElementById('creditsOverlay')
  },
  about: {
    btn: document.getElementById('aboutBtn'),
    overlay: document.getElementById('aboutOverlay')
  },
  sitemap: {
    btn: document.getElementById('sitemapBtn'),
    overlay: document.getElementById('sitemapOverlay')
  }
};

// Fonction pour ouvrir un overlay
function openOverlay(overlayElement) {
  overlayElement.classList.add('active');
}

// Fonction pour fermer un overlay
function closeOverlay(overlayElement) {
  overlayElement.classList.remove('active');
}

// Ajouter les event listeners pour tous les overlays
Object.values(overlays).forEach(({ btn, overlay }) => {
  if (!btn || !overlay) return; // Ignore si le bouton ou l'overlay n'existe pas
  // Ouvrir l'overlay au clic sur le bouton
  btn.addEventListener('click', () => {
    openOverlay(overlay);
  });
  // Fermer l'overlay au clic sur le fond
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay(overlay);
    }
  });
});

// Gérer les boutons de fermeture
document.querySelectorAll('.overlay-close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const overlayId = closeBtn.getAttribute('data-overlay');
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      closeOverlay(overlay);
    }
  });
});

// Gestion du diagramme interactif du plan du site
const sitemapItems = document.querySelectorAll('.sitemap-item');

sitemapItems.forEach(item => {
  const video = item.querySelector('.sitemap-video');
  
  // Jouer la vidéo au survol
  item.addEventListener('mouseenter', () => {
    if (video) {
      video.play().catch(e => console.log('Video play prevented:', e));
    }
  });
  
  // Pauser la vidéo quand on quitte
  item.addEventListener('mouseleave', () => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
  
  // Navigation au clic
  item.addEventListener('click', () => {
    const index = parseInt(item.getAttribute('data-index'));
    
    // Fermer l'overlay du plan du site
    closeOverlay(overlays.sitemap.overlay);
    
    // Naviguer vers la section correspondante
    if (index >= 0 && index < SECTIONS.length) {
      currentIndex = index;
      updateUI();
    }
  });
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  setupGearPositioning();
  buildGear();
  updateUI();
  updateMetaSEO(0);

});

const searchInput = document.getElementById("search-input");
const overlay = document.getElementById("search-overlay");
const overlayInput = document.getElementById("overlay-search-input");
const closeBtn = document.getElementById("close-search");
const resultsContainer = document.getElementById("search-results");

if (searchInput) {
  searchInput.addEventListener("focus", () => {
    searchInput.parentElement.classList.add("active");
    overlay.classList.remove("hidden");
    overlayInput.focus();
  });

  searchInput.addEventListener("blur", () => {
    searchInput.parentElement.classList.remove("active");
  });
}

closeBtn.addEventListener("click", closeSearch);

function closeSearch() {
  overlay.classList.add("hidden");
  resultsContainer.innerHTML = "";
  overlayInput.value = "";
}


overlayInput.addEventListener("input", () => {
  const query = overlayInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";
  if (!query) return;

  let found = false;
  VIDEO_CONFIG.forEach((section, sectionIndex) => {
    const slug = section.slug || `section-${sectionIndex}`;
    // Recherche dans le titre
    if (section.title && section.title.toLowerCase().includes(query)) {
      resultsContainer.appendChild(createSearchResult({
        text: section.title,
        query,
        sectionTitle: section.title,
        slug
      }));
      found = true;
    }
    // Recherche dans la description
    if (section.description && section.description.toLowerCase().includes(query)) {
      resultsContainer.appendChild(createSearchResult({
        text: section.description,
        query,
        sectionTitle: section.title,
        slug
      }));
      found = true;
    }
    // Recherche dans les tags SEO
    if (section.tags && Array.isArray(section.tags)) {
      section.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) {
          resultsContainer.appendChild(createSearchResult({
            text: tag,
            query,
            sectionTitle: section.title,
            slug
          }));
          found = true;
        }
      });
    }
    // Recherche dans les questions
    if (section.questions && Array.isArray(section.questions)) {
      section.questions.forEach(q => {
        if (q.question.toLowerCase().includes(query)) {
          resultsContainer.appendChild(createSearchResult({
            text: q.question,
            query,
            sectionTitle: section.title,
            slug,
            timecode: q.timecode
          }));
          found = true;
        }
      });
    }
    // Recherche dans les transcripts (future)
    if (section.transcript && Array.isArray(section.transcript)) {
      section.transcript.forEach(segment => {
        if (segment.text.toLowerCase().includes(query)) {
          resultsContainer.appendChild(createSearchResult({
            text: segment.text,
            query,
            sectionTitle: section.title,
            slug,
            timecode: segment.time
          }));
          found = true;
        }
      });
    }
  });
  // Si aucun résultat exact, ne rien afficher
  if (!found) {
    resultsContainer.innerHTML = "";
  }
});


// Indexation dynamique du texte des overlays du footer
const FOOTER_SEARCH = [
  {
    label: "Crédits",
    id: "creditsBtn",
    overlay: "creditsOverlay"
  },
  {
    label: "À propos",
    id: "aboutBtn",
    overlay: "aboutOverlay"
  },
  {
    label: "Plan du site",
    id: "sitemapBtn",
    overlay: "sitemapOverlay"
  },
  {
    label: "Podcast",
    id: "podcastBtn",
    overlay: "podcastOverlay"
  }
];

// Ajoute dynamiquement le texte de chaque overlay à FOOTER_SEARCH
FOOTER_SEARCH.forEach(item => {
  const overlayElem = document.getElementById(item.overlay);
  if (overlayElem) {
    // On prend tout le texte visible de l'overlay
    const content = overlayElem.innerText || overlayElem.textContent || '';
    item.text = content;
  } else {
    item.text = '';
  }
});


overlayInput.addEventListener("input", () => {
  const query = overlayInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";
  if (!query) return;

  let found = false;
  // Recherche dans VIDEO_CONFIG (rubriques, vidéos, questions...)
  VIDEO_CONFIG.forEach((section, sectionIndex) => {
    const slug = section.slug || `section-${sectionIndex}`;
    if (section.title && section.title.toLowerCase().includes(query)) {
      resultsContainer.appendChild(createSearchResult({
        text: section.title,
        query,
        sectionTitle: section.title,
        slug
      }));
      found = true;
    }
    if (section.description && section.description.toLowerCase().includes(query)) {
      resultsContainer.appendChild(createSearchResult({
        text: section.description,
        query,
        sectionTitle: section.title,
        slug
      }));
      found = true;
    }
    if (section.tags && Array.isArray(section.tags)) {
      section.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) {
          resultsContainer.appendChild(createSearchResult({
            text: tag,
            query,
            sectionTitle: section.title,
            slug
          }));
          found = true;
        }
      });
    }
    if (section.questions && Array.isArray(section.questions)) {
      section.questions.forEach(q => {
        if (q.question.toLowerCase().includes(query)) {
          resultsContainer.appendChild(createSearchResult({
            text: q.question,
            query,
            sectionTitle: section.title,
            slug,
            timecode: q.timecode
          }));
          found = true;
        }
      });
    }
    if (section.transcript && Array.isArray(section.transcript)) {
      section.transcript.forEach(segment => {
        if (segment.text.toLowerCase().includes(query)) {
          resultsContainer.appendChild(createSearchResult({
            text: segment.text,
            query,
            sectionTitle: section.title,
            slug,
            timecode: segment.time
          }));
          found = true;
        }
      });
    }
  });
  // Recherche dans le texte des overlays du footer
  FOOTER_SEARCH.forEach(item => {
    if (item.text && item.text.toLowerCase().includes(query)) {
      // Trouver un extrait autour du mot recherché
      const idx = item.text.toLowerCase().indexOf(query);
      let extrait = item.text;
      if (idx !== -1) {
        const start = Math.max(0, idx - 30);
        const end = Math.min(item.text.length, idx + 30 + query.length);
        extrait = item.text.substring(start, end);
      }
      resultsContainer.appendChild(createFooterSearchResult(item, query, extrait));
      found = true;
    }
  });
  if (!found) {
    resultsContainer.innerHTML = "";
  }
});


function createFooterSearchResult(item, query, extrait) {
  const regex = new RegExp(`(${query})`, 'gi');
  const highlightedLabel = item.label.replace(regex, '<mark>$1</mark>');
  let highlightedExtrait = '';
  if (extrait) {
    highlightedExtrait = extrait.replace(regex, '<mark>$1</mark>');
  }
  const div = document.createElement("div");
  div.className = "search-result";
  div.innerHTML = `<strong>${highlightedLabel}</strong><br><span>${highlightedExtrait}</span><br><small>Section du site</small>`;
  div.addEventListener("click", () => {
    closeSearch();
    // Ouvre l'overlay correspondant
    const overlay = document.getElementById(item.overlay);
    if (overlay) openOverlay(overlay);
  });
  return div;
}

/**
 * Crée un élément de résultat de recherche
 * @param {Object} params
 * @returns {HTMLElement}
 */


function createSearchResult({ text, query, sectionTitle, slug, timecode }) {
  // Surlignage du mot recherché
  const regex = new RegExp(`(${query})`, 'gi');
  const highlighted = text.replace(regex, '<mark>$1</mark>');

  const div = document.createElement("div");
  div.className = "search-result";
  div.innerHTML = `
    <strong>${sectionTitle}</strong><br>
    <span>${highlighted}</span>
    ${typeof timecode !== 'undefined' ? `<br><small>⏱ ${timecode}s</small>` : ''}
  `;
  div.addEventListener("click", () => {
    closeSearch();
    // Trouver l'index de la rubrique
    const idx = VIDEO_CONFIG.findIndex(v => v.title === sectionTitle);
    if (idx !== -1) {
      currentIndex = idx;
      updateUI();
    }
    // Scroll vers la section
    const sectionElem = document.getElementById(slug);
    if (sectionElem) {
      sectionElem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Si timecode, lancer la vidéo à la minute exacte
    if (typeof timecode !== 'undefined') {
      const data = VIDEO_CONFIG[idx];
      if (data) {
        // YouTube API
        if (typeof YT !== 'undefined' && YT.Player && player && playerReady) {
          // Si la vidéo affichée est déjà la bonne
          const currentId = player.getVideoData && player.getVideoData().video_id;
          if (currentId === data.videoId) {
            player.seekTo(timecode, true);
            player.playVideo();
          } else {
            // Charger la vidéo puis seekTo
            player.loadVideoById({videoId: data.videoId, startSeconds: timecode});
            player.playVideo();
          }
        } else {
          // Fallback iframe
          mainVideo.src = `https://www.youtube.com/embed/${data.videoId}?start=${timecode}&autoplay=1&controls=1&rel=0&modestbranding=1`;
        }
      }
    }
  });
  return div;
}

const copyBtn = document.getElementById("copy-link");

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyBtn.textContent = "✔ Lien copié";
      setTimeout(() => {
        copyBtn.textContent = "📋 Partager";
      }, 2000);
    } catch (err) {
      alert("Impossible de copier le lien");
    }
  });
}

const fullscreenBtn = document.getElementById("fullscreen-btn");

if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      fullscreenBtn.textContent = "⤢";
    } else {
      document.exitFullscreen();
      fullscreenBtn.textContent = "⛶";
    }
  });
}

