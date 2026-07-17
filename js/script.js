"use strict";

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

// ============================================================
// SLIDE INDICATOR — shared utility for bab tabs & organ tabs
// Creates a floating "red shadow" that glides between active items
// ============================================================

function createSlideIndicator(container, indicatorClass) {
  const existing = container.querySelector(`.${indicatorClass}`);
  if (existing) return existing;

  const indicator = document.createElement("span");
  indicator.className = indicatorClass;
  indicator.setAttribute("aria-hidden", "true");
  container.insertBefore(indicator, container.firstChild);
  return indicator;
}

function positionIndicator(indicator, targetBtn, container) {
  const btnRect  = targetBtn.getBoundingClientRect();
  const conRect  = container.getBoundingClientRect();
  const scrollLeft = container.scrollLeft || 0;
  const scrollTop  = container.scrollTop  || 0;

  indicator.style.top    = `${btnRect.top  - conRect.top  + scrollTop}px`;
  indicator.style.left   = `${btnRect.left - conRect.left + scrollLeft}px`;
  indicator.style.width  = `${btnRect.width}px`;
  indicator.style.height = `${btnRect.height}px`;
}

// Init indicator — sets position instantly (no transition) then re-enables it
function initIndicator(container, activeBtn, indicatorClass) {
  const indicator = createSlideIndicator(container, indicatorClass);
  indicator.style.transition = "none";
  positionIndicator(indicator, activeBtn, container);
  // re-enable transition after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      indicator.style.transition = "";
    });
  });
  return indicator;
}


const paths = {
  main: "assets/teks/main.json",
  bab: "assets/teks/bab1_7.json",
  closing: "assets/teks/closing.json",
  facts: "assets/data/facts.json",
  stats: "assets/data/stats.json",
  faq: "assets/data/faq.json"
};

const svgMap = {
  // SVG per bab
  lungs:           "assets/svg/lungs-damage.svg",
  kardiovaskular:  "assets/svg/kardiovaskular.svg",
  brain:           "assets/svg/brain.svg",
  kecanduan:       "assets/svg/kecanduan.svg",
  ekonomi_sosial:  "assets/svg/ekonomi-sosial.svg",
  sosial_remaja:   "assets/svg/sosial-remaja.svg",
  zat_narkoba:     "assets/svg/zat-narkoba.svg",
  // SVG generik / fallback
  heart:           "assets/svg/heart-pulse.svg",
  warning:         "assets/svg/warning-shape.svg",
  cross:           "assets/svg/narkoba-cross.svg",
  smoke:           "assets/svg/partikel.svg",
  // SVG organ khusus untuk bagian Titik Kerusakan Organ
  secondary_lungs: "assets/svg/secondary_lungs.svg",
  heart_organ:     "assets/svg/heart.svg",
  hati:            "assets/svg/hati.svg"
};

const fallback = {
  main: {
    typing_texts: [
      "Narkoba Tidak Memberi — Ia Membajak.",
      "Satu Zat, Ribuan Sinyal Otak Dikelabui.",
      "Kenali. Pahami. Lindungi."
    ],
    subtitle: "Lebih dari 316 juta orang di dunia menggunakan narkoba setiap tahun (UNODC). Halaman ini hadir untuk menyajikan informasi yang jelas dan berbasis data tentang apa yang sesungguhnya terjadi pada otak dan tubuh ketika narkotika masuk.",
    counters: [
      { value: 316000000, suffix: "+", label: "Pengguna narkoba di dunia setiap tahun (UNODC)" },
      { value: 4150000, suffix: "", label: "Jiwa di Indonesia terpapar penyalahgunaan narkoba (BNN–BRIN)" },
      { value: 450000, suffix: "+", label: "Kematian per tahun secara global terkait narkoba (UNODC)" }
    ],
    intro_cards: [
      {
        icon: "assets/svg/brain.svg",
        title: "Membajak Otak, Bukan Sekadar 'Fly'",
        desc: "Narkotika meniru, memblokir, atau memaksa keluarnya neurotransmiter alami seperti dopamin, jauh melampaui batas yang pernah dikenal otak."
      },
      {
        icon: "assets/svg/heart-pulse.svg",
        title: "Kecanduan Adalah Penyakit Otak",
        desc: "Paparan berulang mengubah sirkuit dopamin dan melemahkan kendali impuls — bukan sekadar soal lemahnya kemauan."
      }
    ]
  },
  bab: {
    bab: [
      {
        number: 1,
        tag: "Neurologi",
        title: "Ketika Zat Asing Membajak Kimiawi Otak",
        svg: "brain",
        desc: "Narkotika adalah senyawa asing yang meniru, memblokir, atau memaksa pelepasan neurotransmiter alami seperti dopamin, jauh melampaui sinyal yang biasa dikenal otak.",
        highlights: [
          { icon: "🔴", text: "Setiap golongan narkotika punya 'kunci' kimiawi berbeda, namun semuanya bermuara pada banjir dopamin di luar kemampuan alami otak." },
          { icon: "⚠️", text: "Otak 'salah membaca' narkoba sebagai kebutuhan yang lebih penting dari makanan atau rasa aman." }
        ]
      }
    ]
  },
  facts: {
    facts: [
      {
        title: "Napas Berhenti, Bukan Jantung yang Berhenti Dulu",
        desc: "Pada overdosis opioid, kematian paling sering disebabkan oleh berhentinya napas akibat tertekannya pusat pernapasan di batang otak, bukan serangan jantung.",
        tag: "Overdosis"
      }
    ]
  },
  stats: {
    stats: [
      { icon: "🌍", value: 316, suffix: " juta+", label: "Pengguna narkoba di dunia per tahun (UNODC)" },
      { icon: "🇮🇩", value: 4150000, suffix: "", label: "Jiwa di Indonesia terpapar penyalahgunaan narkoba (BNN–BRIN)" }
    ]
  },
  faq: {
    faq: [
      {
        q: "Apakah ganja aman karena 'alami' dan berasal dari tumbuhan?",
        a: "Tidak. Kanabinoid pada ganja berevolusi sebagai racun pertahanan tanaman, bukan untuk dikonsumsi manusia. THC tetap mengikat reseptor CB1 di otak dan dapat memicu ketergantungan serta gangguan memori jangka pendek."
      }
    ]
  },
  closing: {
    title: "Satu Langkah Bisa Menyelamatkan Nyawa",
    desc: "Pemulihan dari kecanduan bukan tentang kekuatan kemauan semata — ini tentang strategi yang tepat, dukungan yang nyata, dan penanganan medis.",
    steps: [
      {
        num: 1,
        title: "Akui dan Bicarakan",
        desc: "Mengakui ada masalah dan membicarakannya dengan orang yang dipercaya atau tenaga profesional adalah langkah pertama yang paling menentukan."
      },
      {
        num: 2,
        title: "Hubungi Layanan Resmi",
        desc: "Call Center BNN di 184 (aktif 24 jam) menyediakan konsultasi gratis dan rahasia mengenai akses layanan rehabilitasi."
      }
    ],
    cta_primary: {
      label: "Kembali ke Beranda",
      url: "#beranda"
    },
    cta_secondary: {
      label: "Layanan Rehabilitasi BNN",
      url: "https://rehabilitasi.bnn.go.id"
    }
  }
};

async function getJson(url, fallbackData) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Gagal memuat ${url}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallbackData;
  }
}

function showToast(message, duration = 2200) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

function formatNumber(value) {
  return Number(value).toLocaleString("id-ID");
}

function animateCounter(element, end, suffix = "", duration = 1400) {
  if (!element) return;

  const startTime = performance.now();
  const target = Number(end);

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);

    element.textContent = `${formatNumber(current)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function typeWriter(element, texts, speed = 58, pause = 1700) {
  if (!element || !texts?.length) return;

  let textIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentText = texts[textIndex];
    const shownText = currentText.slice(0, charIndex);

    element.textContent = shownText;

    if (!deleting) {
      charIndex += 1;

      if (charIndex > currentText.length) {
        deleting = true;
        window.setTimeout(tick, pause);
        return;
      }
    } else {
      charIndex -= 1;

      if (charIndex < 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
      }
    }

    window.setTimeout(tick, deleting ? speed / 2 : speed);
  }

  tick();
}

function initNavigation() {
  const navbar = $("#navbar");
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const navLinks = $$("#navLinks a, .footer a[href^='#'], .hero-actions a[href^='#']");

  function closeMenu() {
    links?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 12);
  });

  toggle?.addEventListener("click", () => {
    const isOpen = links?.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  const observedSections = ["beranda", "bahaya", "statistik", "organ", "faq"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = visible.target.id;

      $$("#navLinks a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    },
    {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "-80px 0px -45% 0px"
    }
  );

  observedSections.forEach((section) => observer.observe(section));
}

function initProgressAndScrollTop() {
  const progress = $("#progressBar");
  const scrollTop = $("#scrollTop");

  let lastScrollY    = window.scrollY;
  let scrollUpAccum  = 0;
  const SHOW_THRESHOLD = 80; // px scrolled-up before button appears

  function update() {
    const currentY  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent   = maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;

    if (progress) progress.style.width = `${percent}%`;

    const delta = currentY - lastScrollY;

    if (delta > 0) {
      // Scrolling down → hide immediately, reset accumulator
      scrollUpAccum = 0;
      scrollTop?.classList.remove("visible");
    } else {
      // Scrolling up → accumulate distance
      scrollUpAccum += Math.abs(delta);
      if (currentY > 420 && scrollUpAccum >= SHOW_THRESHOLD) {
        scrollTop?.classList.add("visible");
      } else if (currentY <= 420) {
        scrollTop?.classList.remove("visible");
      }
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", update, { passive: true });

  scrollTop?.addEventListener("click", () => {
    scrollUpAccum = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
}

function renderMain(data) {
  const title = $("#heroTitle");
  const subtitle = $("#heroSubtitle");
  const counters = $("#heroCounters");
  const introGrid = $("#introGrid");

  typeWriter(title, data.typing_texts || ["Kenali. Pahami. Tinggalkan."]);

  if (subtitle) {
    subtitle.textContent = data.subtitle || "";
  }

  if (counters) {
    counters.innerHTML = (data.counters || []).map((item) => `
      <div class="hero-counter">
        <span class="value" data-value="${item.value}" data-suffix="${item.suffix || ""}">0</span>
        <span class="label">${item.label}</span>
      </div>
    `).join("");

    $$(".hero-counter .value", counters).forEach((element) => {
      animateCounter(
        element,
        Number(element.dataset.value || 0),
        element.dataset.suffix || ""
      );
    });
  }

  if (introGrid) {
    introGrid.innerHTML = (data.intro_cards || []).map((card) => `
      <article class="intro-card reveal">
        <img src="${card.icon}" alt="" />
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
      </article>
    `).join("");
  }
}

function renderBab(data) {
  const tabs  = $("#babTabs");
  const panel = $("#babContentArea");
  const list  = data.bab || [];

  if (!tabs || !panel || !list.length) return;

  tabs.innerHTML = list.map((item, index) => {
    const svg = svgMap[item.svg] || svgMap.warning;
    return `
      <button class="bab-tab ${index === 0 ? "active" : ""} reveal" type="button" data-index="${index}" role="tab">
        <img class="bab-tab-thumb" src="${svg}" alt="" onerror="this.style.opacity='0';this.style.width='0'" />
        <div class="bab-tab-body">
          <span class="bab-tab-num">Bab ${item.number}</span>
          <span class="bab-tab-label">${item.tag}</span>
        </div>
      </button>
    `;
  }).join("");

  // Inline SVG warning triangle
  const warningSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

  function renderPanel(index, animate = false) {
    const item = list[index];
    const svg  = svgMap[item.svg] || svgMap.warning;

    panel.innerHTML = `
      <div class="bab-card-layout${animate ? " bab-panel-enter" : ""}">
        <div class="bab-visual">
          <img src="${svg}" alt="" onerror="this.style.opacity='0'" />
          <div class="sonar-badge">
            <div class="sonar-ring sonar-ring-1"></div>
            <div class="sonar-ring sonar-ring-2"></div>
            <div class="sonar-ring sonar-ring-3"></div>
            <div class="sonar-core">${warningSvg}</div>
          </div>
        </div>

        <div>
          <span class="bab-kicker">Bab ${item.number} · ${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>

          <div class="highlight-list">
            ${(item.highlights || []).map((highlight) => `
              <div class="highlight">
                <span>${highlight.icon || "•"}</span>
                <span>${highlight.text}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    // Auto-remove animation class after it finishes so re-triggering works
    if (animate) {
      const layout = panel.querySelector(".bab-card-layout");
      layout?.addEventListener("animationend", () => {
        layout.classList.remove("bab-panel-enter");
      }, { once: true });
    }
  }

  // Init indicator after tabs are in DOM
  requestAnimationFrame(() => {
    const activeTab = tabs.querySelector(".bab-tab.active");
    if (activeTab) {
      const indicator = initIndicator(tabs, activeTab, "bab-slide-indicator");

      tabs.addEventListener("click", (event) => {
        const button = event.target.closest(".bab-tab");
        if (!button) return;

        $$(".bab-tab", tabs).forEach((tab) => tab.classList.remove("active"));
        button.classList.add("active");
        positionIndicator(indicator, button, tabs);

        renderPanel(Number(button.dataset.index), true);
      });

      // Re-position indicator when window resizes
      window.addEventListener("resize", () => {
        const current = tabs.querySelector(".bab-tab.active");
        if (current) positionIndicator(indicator, current, tabs);
      }, { passive: true });
    }
  });

  renderPanel(0, false);
}

function renderStats(data) {
  const grid = $("#statsGrid");
  const stats = data.stats || [];

  if (!grid) return;

  grid.innerHTML = stats.map((item) => `
    <article class="stats-card reveal">
      <div class="stats-icon">${item.icon || "📌"}</div>
      <div class="stats-value">
        <span class="stats-number" data-value="${item.value}" data-suffix="${item.suffix || ""}">0</span>
      </div>
      <p class="stats-label">${item.label}</p>
    </article>
  `).join("");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      $$(".stats-number", entry.target).forEach((element) => {
        animateCounter(
          element,
          Number(element.dataset.value || 0),
          element.dataset.suffix || "",
          1100
        );
      });

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  $$(".stats-card", grid).forEach((card) => observer.observe(card));
}

function renderOrganEngine() {
  const tabs   = $("#organTabs");
  const detail = $("#organDetail");
  const image  = $("#organSvg");

  if (!tabs || !detail || !image) return;

  const organs = [
    {
      key: "otak",
      label: "Otak",
      image: "assets/svg/brain.svg",
      text: "Zat adiktif menembus sawar darah-otak dan meniru atau memaksa pelepasan neurotransmiter alami seperti dopamin. Reseptor yang seharusnya merespons sinyal alami — makan, ikatan sosial, rasa aman — dibanjiri sinyal buatan yang jauh melampaui batas normal. Sebagai respons, otak menurunkan jumlah reseptor dopamin (D2) yang tersisa, sementara area pengendali impuls di korteks prefrontal justru melemah. Hasilnya adalah siklus toleransi, ketagihan, dan menurunnya kemampuan mengendalikan dorongan — bukan tanda kepribadian lemah, melainkan perubahan sirkuit otak yang terukur secara ilmiah."
    },
    {
      key: "jantung",
      label: "Jantung",
      image: "assets/svg/heart.svg",
      text: "Stimulan seperti kokain dan sabu memicu lonjakan hormon adrenalin yang mempercepat detak jantung dan menyempitkan pembuluh darah secara tiba-tiba. Kokain secara khusus memblokir kanal natrium pada sel otot jantung, mengganggu irama listrik jantung dan dapat memicu aritmia fatal. Risiko meningkat tajam bila stimulan dicampur alkohol, karena hati mengubah kombinasi ini menjadi kokaetilen — senyawa yang lebih toksik bagi jantung. Serangan jantung akibat narkoba bisa terjadi mendadak, bahkan pada usia muda tanpa riwayat penyakit jantung sebelumnya."
    },
    {
      key: "paru",
      label: "Pernapasan",
      image: "assets/svg/secondary_lungs.svg",
      text: "Cara paling umum kematian akibat overdosis opioid (seperti heroin atau fentanil) adalah henti napas, bukan serangan jantung. Di batang otak terdapat kelompok kecil sel saraf yang bertugas menjaga ritme napas otomatis; opioid menekan aktivitas area ini hingga sinyal untuk menarik napas berikutnya melemah dan berhenti, sering kali saat korban tidak sadar. Zat yang dihisap atau dihirup langsung — termasuk uap lem dan asap zat tertentu — juga mengiritasi dan merusak jaringan saluran napas secara langsung. Mencampur opioid dengan alkohol atau obat penenang lain melipatgandakan risiko henti napas karena keduanya menekan pusat pernapasan yang sama."
    },
    {
      key: "hati",
      label: "Hati",
      image: "assets/svg/hati.svg",
      text: "Hati sebenarnya sangat efisien memecah sebagian besar racun narkotika hanya dalam hitungan jam melalui enzim Cytochrome P450 — bahaya sesungguhnya jarang terletak pada penumpukan racun, melainkan pada reaksi kimia yang terjadi selama proses itu. Saat kokain dan alkohol dikonsumsi bersamaan, misalnya, enzim hati justru menciptakan senyawa baru yang lebih berbahaya (kokaetilen) alih-alih menetralkannya. Penggunaan narkoba suntik dalam jangka panjang juga meningkatkan risiko hepatitis dan kerusakan hati kronis akibat infeksi maupun zat itu sendiri. Kesehatan hati yang terjaga menjadi salah satu penentu penting keberhasilan proses detoksifikasi dan pemulihan."
    }
  ];

  tabs.innerHTML = organs.map((organ, index) => `
    <button class="organ-tab ${index === 0 ? "active" : ""}" type="button" data-key="${organ.key}">
      ${organ.label}
    </button>
  `).join("");

  // Init slide indicator after DOM paint
  requestAnimationFrame(() => {
    const activeTab = tabs.querySelector(".organ-tab.active");
    if (!activeTab) return;

    const indicator = initIndicator(tabs, activeTab, "organ-slide-indicator");

    tabs.addEventListener("click", (event) => {
      const button = event.target.closest(".organ-tab");
      if (!button) return;

      const selected = organs.find((organ) => organ.key === button.dataset.key);
      if (!selected) return;

      $$(".organ-tab", tabs).forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      positionIndicator(indicator, button, tabs);

      // Animate image swap
      image.classList.remove("organ-img-enter");
      void image.offsetWidth; // reflow
      image.src = selected.image;
      image.alt = `Ilustrasi ${selected.label}`;
      image.classList.add("organ-img-enter");

      // Animate detail text
      detail.classList.remove("organ-detail-enter");
      void detail.offsetWidth;
      detail.textContent = selected.text;
      detail.classList.add("organ-detail-enter");

      // Cleanup animation classes
      image.addEventListener("animationend",  () => image.classList.remove("organ-img-enter"),   { once: true });
      detail.addEventListener("animationend", () => detail.classList.remove("organ-detail-enter"), { once: true });
    });

    window.addEventListener("resize", () => {
      const current = tabs.querySelector(".organ-tab.active");
      if (current) positionIndicator(indicator, current, tabs);
    }, { passive: true });
  });
}

function renderFacts(data) {
  const track = $("#factsTrack");
  const dots  = $("#factsDots");
  const prev  = $("#factsPrev");
  const next  = $("#factsNext");
  const facts = data.facts || [];

  if (!track || !dots || !prev || !next || !facts.length) return;

  let current = 0;
  let isAnimating = false;
  let autoTimer = null;

  track.innerHTML = facts.map((fact, index) => `
    <article class="fact-slide">
      <div class="fact-card">
        <div class="fact-num">${String(index + 1).padStart(2, "0")}</div>
        <div>
          <span class="fact-tag">${fact.tag || "Fakta"}</span>
          <h3>${fact.title}</h3>
          <p>${fact.desc}</p>
        </div>
      </div>
    </article>
  `).join("");

  dots.innerHTML = facts.map((_, index) => `
    <button class="fact-dot ${index === 0 ? "active" : ""}" type="button" data-index="${index}" aria-label="Buka fakta ${index + 1}"></button>
  `).join("");

  function update(index, direction = 1) {
    if (isAnimating) return;
    isAnimating = true;

    const previous = current;
    current = (index + facts.length) % facts.length;

    // Slide transform
    track.style.transform = `translateX(-${current * 100}%)`;

    // Active dot
    $$(".fact-dot", dots).forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === current);
    });

    // Brief blur/scale on the entering slide
    const slides = $$(".fact-slide", track);
    const entering = slides[current];
    if (entering) {
      entering.style.transform   = `scale(0.97) translateX(${direction > 0 ? "12px" : "-12px"})`;
      entering.style.filter      = "blur(3px)";
      entering.style.opacity     = "0.7";
      entering.style.transition  = "none";
      requestAnimationFrame(() => {
        entering.style.transition = "transform 0.46s cubic-bezier(0.22,1,0.36,1), filter 0.38s ease, opacity 0.38s ease";
        entering.style.transform  = "";
        entering.style.filter     = "";
        entering.style.opacity    = "";
        entering.addEventListener("transitionend", () => { isAnimating = false; }, { once: true });
      });
    } else {
      isAnimating = false;
    }

    // Fallback safety: always unlock after 700ms in case transitionend doesn't fire
    window.setTimeout(() => { isAnimating = false; }, 700);
  }

  function startAutoScroll() {
    stopAutoScroll();
    autoTimer = window.setInterval(() => {
      update(current + 1, 1);
    }, 6000);
  }

  function stopAutoScroll() {
    if (autoTimer !== null) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function manualUpdate(index, direction) {
    stopAutoScroll();
    update(index, direction);
    startAutoScroll();
  }

  prev.addEventListener("click", () => manualUpdate(current - 1, -1));
  next.addEventListener("click", () => manualUpdate(current + 1,  1));

  dots.addEventListener("click", (event) => {
    const dot = event.target.closest(".fact-dot");
    if (!dot) return;
    const idx = Number(dot.dataset.index);
    manualUpdate(idx, idx > current ? 1 : -1);
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoScroll();
  }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) update(diff > 0 ? current + 1 : current - 1, diff > 0 ? 1 : -1);
    startAutoScroll();
  }, { passive: true });

  // Pause auto-scroll on hover
  const carousel = track.closest(".facts-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);
  }

  // Start auto-scroll
  startAutoScroll();
}

function renderFaq(data) {
  const list = $("#faqList");
  const items = data.faq || [];

  if (!list) return;

  list.innerHTML = items.map((item) => `
    <article class="faq-item reveal">
      <button class="faq-q" type="button">
        ${item.q}
        <span>⌄</span>
      </button>
      <div class="faq-a">
        <p>${item.a}</p>
      </div>
    </article>
  `).join("");

  list.addEventListener("click", (event) => {
    const question = event.target.closest(".faq-q");
    if (!question) return;

    const item = question.closest(".faq-item");
    const answer = $(".faq-a", item);
    const isOpen = item.classList.contains("open");

    $$(".faq-item", list).forEach((faqItem) => {
      faqItem.classList.remove("open");
      const faqAnswer = $(".faq-a", faqItem);
      if (faqAnswer) faqAnswer.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
}

function normalizeUrl(url) {
  if (!url) return "#beranda";

  const markdownMatch = String(url).match(/\((https?:\/\/[^)]+)\)/);
  if (markdownMatch) return markdownMatch[1];

  return url;
}

function renderClosing(data) {
  const content = $("#closingContent");
  const steps = $("#closingSteps");
  const cta = $("#closingCtaContainer");

  if (!content || !steps || !cta) return;

  content.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.desc}</p>
  `;

  steps.innerHTML = (data.steps || []).map((step) => `
    <article class="closing-step reveal">
      <span class="step-num">${String(step.num).padStart(2, "0")}</span>
      <h4>${step.title}</h4>
      <p>${step.desc}</p>
    </article>
  `).join("");

  const primaryUrl = normalizeUrl(data.cta_primary?.url);
  const secondaryUrl = normalizeUrl(data.cta_secondary?.url);

  cta.innerHTML = `
    <div class="closing-cta">
      <a class="btn btn-safe" href="${primaryUrl}">${data.cta_primary?.label || "Kembali ke Beranda"}</a>
      <a class="btn btn-secondary" href="${secondaryUrl}" target="_blank" rel="noopener">
        ${data.cta_secondary?.label || "Baca Panduan"}
      </a>
    </div>
  `;
}

function initRevealObserver() {
  const elements = $$(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -48px 0px"
    }
  );

  elements.forEach((el) => observer.observe(el));
}

async function boot() {
  initNavigation();
  initProgressAndScrollTop();
  renderOrganEngine();

  const [main, bab, stats, facts, faq, closing] = await Promise.all([
    getJson(paths.main, fallback.main),
    getJson(paths.bab, fallback.bab),
    getJson(paths.stats, fallback.stats),
    getJson(paths.facts, fallback.facts),
    getJson(paths.faq, fallback.faq),
    getJson(paths.closing, fallback.closing)
  ]);

  renderMain(main);
  renderBab(bab);
  renderStats(stats);
  renderFacts(facts);
  renderFaq(faq);
  renderClosing(closing);

  // Aktifkan scroll reveal setelah semua konten di-render
  initRevealObserver();

  showToast("Website berhasil dimuat");
}

document.addEventListener("DOMContentLoaded", boot);