// ---------- Ano dinâmico no footer ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Header: fundo sólido ao fazer scroll ----------
const header = document.getElementById("site-header");
const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- Navegação interna sem alterar a URL ----------
const internalLinks = document.querySelectorAll(".nav-link, .logo, .scroll-indicator");

const scrollToSection = (targetId) => {
  const targetElement = document.getElementById(targetId.replace("#", ""));

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href") || "";

    if (href.startsWith("#")) {
      event.preventDefault();
      scrollToSection(href);
      window.history.replaceState(null, "", window.location.pathname);
    }
  });
});

// ---------- Menu hambúrguer (mobile) ----------
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navOverlay = document.getElementById("nav-overlay");
const primaryNav = document.getElementById("primary-nav");

const setMenuState = (isOpen) => {
  primaryNav.classList.toggle("is-open", isOpen);
  navOverlay.classList.toggle("is-visible", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", isOpen);
};

navToggle.addEventListener("click", () => {
  const isOpen = !primaryNav.classList.contains("is-open");
  setMenuState(isOpen);
});

navClose.addEventListener("click", () => setMenuState(false));
navOverlay.addEventListener("click", () => setMenuState(false));

primaryNav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
    setMenuState(false);
  }
});

// ---------- Vídeos do YouTube (thumbnails automáticas) ----------
const youtubeVideos = [
  {
    id: "ad4Mmrjz_48",
    title: "Treinão de Peitão e Tríceps",
    meta: "Missão Impossível (ep.04)"
  },
  {
    id: "5bxsSxdy9qc",
    title: "Treino da Ofensa com Dois Zé Ruelas",
    meta: "Missão Impossível (ep.03)"
  },
  {
    id: "AnrsXE-Q5ao",
    title: "Treino de Perna Insano",
    meta: "Missão Impossível (ep.02)"
  },
  {
    id: "GkPhi8HGQAQ",
    title: "Treino de Dorsal",
    meta: "Missão Impossível (ep.01)"
  },
  {
    id: "M1OLIte0Wzg",
    title: "#academia #gym",
    meta: ""
  }
];

const youtubeVideosEl = document.getElementById("youtube-videos");

const renderYoutubeVideos = () => {
  if (!youtubeVideosEl) return;

  const visibleCount = window.innerWidth <= 720 ? 2 : 3;
  const videos = youtubeVideos.slice(0, visibleCount);

  youtubeVideosEl.innerHTML = videos
    .map(
      (video) => `
        <a class="video-card" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener" aria-label="Assistir ${video.title}">
          <span class="video-thumb-wrap">
            <img class="video-thumb" src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" loading="lazy">
          </span>
          <span class="video-info">
            <span class="video-title">${video.title}</span>
            <span class="video-meta">${video.meta}</span>
          </span>
        </a>
      `
    )
    .join("");
};

window.addEventListener("resize", renderYoutubeVideos);
renderYoutubeVideos();

// ---------- Reveal on scroll (fade-in subtil) ----------
const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}