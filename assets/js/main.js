/* =========================================================
   主程式 — 一般情況下你不需要改這個檔案
   ========================================================= */
(function () {
  "use strict";

  // 目前語言：優先讀使用者上次選的，預設日文
  let lang = localStorage.getItem("as_lang") || "ja";
  let activeCat = "all";

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // 圖片載入失敗時的暗色佔位圖（你放上真圖後就不會出現）
  const PLACEHOLDER =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
        <rect width='100%' height='100%' fill='#15151a'/>
        <text x='50%' y='49%' fill='#3a3a44' font-family='sans-serif' font-size='26' text-anchor='middle'>Angel Setsuna</text>
        <text x='50%' y='55%' fill='#2c2c34' font-family='sans-serif' font-size='15' text-anchor='middle'>image coming soon</text>
      </svg>`
    );
  const onErr = `onerror="this.onerror=null;this.src='${PLACEHOLDER}'"`;

  // 頭貼還沒放上去時的圓形佔位（顯示 AS 字樣）
  const AVATAR_PLACEHOLDER =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
        <rect width='100%' height='100%' fill='#25232b'/>
        <text x='50%' y='50%' dy='.35em' fill='#ef7ca3' font-family='sans-serif' font-size='58' font-weight='700' text-anchor='middle'>AS</text>
      </svg>`
    );

  // 社群品牌圖標（key 對應 SOCIAL 的 label 轉小寫）
  const ICONS = {
    x: `<svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
    pixiv: `<svg viewBox="0 0 24 24"><path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.917c.03.022 1.116.22 1.116 1.36 0 .628-.512 1.137-1.144 1.137l-2.946.001c-.633 0-1.146-.51-1.146-1.137 0-1.058.94-1.282 1.117-1.342V8.475c-.92.85-1.394 1.541-1.498 1.69-.151.22-.396.35-.66.353a.798.798 0 0 1-.474-.153c-.353-.262-.428-.76-.167-1.113.06-.082 1.507-2.005 3.957-3.205 1.444-.708 3.13-1.046 4.853-1.046zm-.187 1.741c-1.342 0-2.498.348-3.43.864v7.567s1.94.819 4.024.819c1.561 0 2.91-.448 3.875-1.211.967-.766 1.553-1.81 1.55-3.205a4.376 4.376 0 0 0-1.518-3.339c-1.003-.876-2.444-1.495-4.5-1.495z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    threads: `<svg viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.166 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.36-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.32.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg>`,
    artstation: `<svg viewBox="0 0 24 24"><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.992a2.424 2.424 0 0 0-.359-1.266L15.547 1.27A2.424 2.424 0 0 0 13.471 0H9.626l8.027 13.953-2.054 3.553 1.79 3.101 6.611-11.45A2.424 2.424 0 0 0 24 14.731zM10.624 13.93l-2.768-4.79-2.789 4.79z"/></svg>`,
  };

  /* ---------- 套用介面文字 ---------- */
  function applyI18n() {
    const dict = I18N[lang] || I18N.ja;
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });

    // mailto 按鈕：依語言帶入信件主旨
    const mailto = $("#mailtoBtn");
    if (mailto) {
      const subj = encodeURIComponent(dict["contact.mailSubject"] || "");
      const addr = ($("#emailText") && $("#emailText").textContent.trim()) || "";
      mailto.href = `mailto:${addr}?subject=${subj}`;
    }

    // 切換語言按鈕高亮
    $$("#langSwitch button").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === lang)
    );
  }

  /* ---------- 渲染篩選列 ---------- */
  function renderFilters() {
    const filters = $("#filters");
    // 統計實際出現的分類
    const used = [...new Set(WORKS.map((w) => w.category))];
    // 分類少於 2 種就不顯示篩選列
    if (used.length < 2) { filters.hidden = true; return; }

    filters.hidden = false;
    const cats = ["all", ...Object.keys(CATEGORIES).filter((k) => k !== "all" && used.includes(k))];

    filters.innerHTML = cats
      .map((k) => {
        const label = (CATEGORIES[k] && CATEGORIES[k][lang]) || k;
        const on = k === activeCat ? " is-active" : "";
        return `<button class="${on.trim()}" data-cat="${k}">${label}</button>`;
      })
      .join("");

    $$("#filters button").forEach((btn) =>
      btn.addEventListener("click", () => {
        activeCat = btn.dataset.cat;
        renderFilters();
        renderGrid();
      })
    );
  }

  /* ---------- 渲染作品牆 ---------- */
  function renderGrid() {
    const grid = $("#grid");
    const list = WORKS.filter((w) => activeCat === "all" || w.category === activeCat);

    grid.innerHTML = list
      .map((w, i) => {
        const title = w.title[lang] || w.title.ja || "";
        const role  = (w.role && (w.role[lang] || w.role.ja)) || "";
        const meta  = [w.client, role, w.year].filter(Boolean).join(" · ");
        return `
          <figure class="card" data-index="${i}">
            <img src="${w.image}" alt="${title}" loading="lazy"${w.focus ? ` style="object-position:${w.focus}"` : ""} ${onErr} />
            <figcaption class="card__overlay">
              <span class="card__title">${title}</span>
              <span class="card__meta">${meta}</span>
            </figcaption>
          </figure>`;
      })
      .join("");

    // 點圖開 Lightbox
    $$("#grid .card").forEach((card) =>
      card.addEventListener("click", () => openLightbox(Number(card.dataset.index), list))
    );

    revealOnScroll();
  }

  /* ---------- 捲動淡入 ---------- */
  function revealOnScroll() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$("#grid .card").forEach((c) => io.observe(c));
  }

  /* ---------- Lightbox ---------- */
  let lbList = [];
  let lbIndex = 0;

  function openLightbox(index, list) {
    lbList = list;
    lbIndex = index;
    updateLightbox();
    $("#lightbox").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    $("#lightbox").hidden = true;
    document.body.style.overflow = "";
  }
  function moveLightbox(dir) {
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    updateLightbox();
  }
  function updateLightbox() {
    const w = lbList[lbIndex];
    if (!w) return;
    const title = w.title[lang] || w.title.ja || "";
    const role  = (w.role && (w.role[lang] || w.role.ja)) || "";
    const meta  = [w.client, role, w.year].filter(Boolean).join(" · ");
    const lbImg = $("#lbImg");
    lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = PLACEHOLDER; };
    lbImg.src = w.image;
    $("#lbImg").alt = title;
    $("#lbCap").textContent = meta ? `${title} — ${meta}` : title;
  }

  /* ---------- Hero 幻燈片 + 頭貼 ---------- */
  function renderHero() {
    const wrap = $("#heroSlides");
    if (wrap) {
      // 若有任何作品標了 hero:true，就只播那些；否則預設前 6 張
      const flagged = WORKS.filter((w) => w.hero === true);
      const imgs = (flagged.length ? flagged : WORKS).slice(0, 8);
      wrap.innerHTML = imgs
        .map((w, i) => {
          const pos = w.focus ? ` style="object-position:${w.focus}"` : "";
          return `<img class="hero__slide${i === 0 ? " is-active" : ""}" src="${w.image}" alt=""${pos} ${onErr} />`;
        })
        .join("");
      const slides = $$(".hero__slide", wrap);
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (slides.length > 1 && !reduce) {
        let idx = 0;
        setInterval(() => {
          slides[idx].classList.remove("is-active");
          idx = (idx + 1) % slides.length;
          slides[idx].classList.add("is-active");
        }, 4500);
      }
    }
    // 頭貼：載入失敗時顯示 AS 佔位
    const av = $("#heroAvatar");
    if (av) {
      av.onerror = () => { av.onerror = null; av.src = AVATAR_PLACEHOLDER; };
      if (av.complete && av.naturalWidth === 0) av.src = AVATAR_PLACEHOLDER;
    }
  }

  /* ---------- Hero 社群圖標 ---------- */
  function renderHeroSocial() {
    const wrap = $("#heroSocial");
    if (!wrap) return;
    wrap.innerHTML = (SOCIAL || [])
      .filter((s) => s.url && s.url !== "#")
      .map((s) => {
        const key = (s.key || s.label || "").toLowerCase();
        const icon = ICONS[key] || `<span style="font-size:.68rem">${s.label}</span>`;
        return `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${icon}</a>`;
      })
      .join("");
  }

  /* ---------- 社群連結（頁尾文字） ---------- */
  function renderSocial() {
    const wrap = $("#social");
    wrap.innerHTML = (SOCIAL || [])
      .filter((s) => s.url && s.url !== "#")
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`)
      .join("");
  }

  /* ---------- 導覽列 / 漢堡選單 / 捲動狀態 ---------- */
  function initNav() {
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const links = $(".nav__links");
    $("#menuBtn").addEventListener("click", () => links.classList.toggle("is-open"));
    $$(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("is-open"))
    );
  }

  /* ---------- 複製 Email ---------- */
  function initCopyMail() {
    const btn = $("#copyMail");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const mail = $("#emailText").textContent.trim();
      try {
        await navigator.clipboard.writeText(mail);
        const dict = I18N[lang] || I18N.ja;
        const old = btn.textContent;
        btn.textContent = dict["contact.copied"] || "OK";
        setTimeout(() => (btn.textContent = dict["contact.copy"] || old), 1600);
      } catch (e) { /* 忽略：部分瀏覽器需 https */ }
    });
  }

  /* ---------- 語言切換 ---------- */
  function initLang() {
    $$("#langSwitch button").forEach((btn) =>
      btn.addEventListener("click", () => {
        lang = btn.dataset.lang;
        localStorage.setItem("as_lang", lang);
        applyI18n();
        renderFilters();
        renderGrid();
      })
    );
  }

  /* ---------- Lightbox 事件 ---------- */
  function initLightbox() {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => moveLightbox(-1));
    $("#lbNext").addEventListener("click", () => moveLightbox(1));
    $("#lightbox").addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if ($("#lightbox").hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    });
  }

  /* ---------- 圖片防護（嚇阻右鍵另存／拖曳，非 100% 防堵） ---------- */
  function initImgGuard() {
    document.addEventListener("contextmenu", (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
    document.addEventListener("dragstart", (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
  }

  /* ---------- 啟動 ---------- */
  function init() {
    $("#year").textContent = new Date().getFullYear();
    applyI18n();
    renderHero();
    renderHeroSocial();
    renderFilters();
    renderGrid();
    renderSocial();
    initNav();
    initLang();
    initLightbox();
    initCopyMail();
    initImgGuard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
