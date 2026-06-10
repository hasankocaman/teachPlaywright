/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  AutomationExercise — Smooth Hover Scale (Konsol versiyonu) │
 * │  Tarayıcı konsoluna yapıştırıp çalıştırın (F12 → Console)  │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Etki alanı : https://automationexercise.com/*
 * Gereksinim : Tampermonkey gerekmez; doğrudan DevTools konsolunda çalışır.
 */

(function injectSmoothHoverScale() {

  /* ── 1. Zaten enjekte edildiyse tekrar çalışma ─────────────── */
  if (document.getElementById('ae-smooth-hover-styles')) {
    console.info('[AE Hover] Zaten aktif. Yeniden uygulanıyor…');
  }

  /* ── 2. CSS kuralları ──────────────────────────────────────── */
  const css = `
    /* Temel geçiş */
    .ae-smooth-hover {
      transition: transform 0.3s ease-in-out,
                  box-shadow 0.3s ease-in-out !important;
      will-change: transform;
      backface-visibility: hidden;
    }

    /* Genel hover */
    .ae-smooth-hover:hover {
      transform: scale(1.04) !important;
    }

    /* ── Nav / metin linkleri ──────────────────────────────── */
    header .nav li a.ae-smooth-hover,
    .shop-menu .nav li a.ae-smooth-hover,
    .brands-name .nav li a.ae-smooth-hover,
    .panel-body ul li a.ae-smooth-hover,
    .choose .nav li a.ae-smooth-hover,
    footer a.ae-smooth-hover {
      display: inline-block;
    }

    header .nav li a.ae-smooth-hover:hover,
    .shop-menu .nav li a.ae-smooth-hover:hover {
      transform: scale(1.08) !important;
    }

    /* ── Butonlar ──────────────────────────────────────────── */
    .btn.ae-smooth-hover {
      display: inline-block;
    }

    .btn.ae-smooth-hover:hover {
      transform: scale(1.06) !important;
      box-shadow: 0 6px 20px rgba(0,0,0,0.18) !important;
    }

    /* ── Ürün kartları ─────────────────────────────────────── */
    .product-image-wrapper.ae-smooth-hover {
      display: block;
      overflow: hidden;
      border-radius: 4px;
    }

    .product-image-wrapper.ae-smooth-hover:hover {
      transform: scale(1.04) !important;
      box-shadow: 0 10px 32px rgba(0,0,0,0.14) !important;
      z-index: 10;
      position: relative;
    }

    /* ── Kategori accordion başlıkları ────────────────────── */
    .panel-heading.ae-smooth-hover {
      display: block;
    }

    .panel-heading.ae-smooth-hover:hover {
      transform: scale(1.02) !important;
    }

    /* ── Marka satırları ───────────────────────────────────── */
    .brands-name .nav li.ae-smooth-hover {
      display: block;
    }
  `;

  /* Var olan style etiketini güncelle veya yeni oluştur */
  let styleEl = document.getElementById('ae-smooth-hover-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'ae-smooth-hover-styles';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;

  /* ── 3. Hedef element seçiciler ────────────────────────────── */
  const SELECTORS = [
    'header .nav li a',
    '.shop-menu .nav li a',
    '.panel-body ul li a',
    '.brands-name .nav li a',
    '.choose .nav li a',
    'footer a',
    '#footer a',
    'button',
    '.btn',
    'input[type="button"]',
    'input[type="submit"]',
    'a.btn',
    '.product-image-wrapper',
    '.panel-heading',
    '.brands-name .nav li',
  ];

  /* ── 4. Sınıf uygulayıcı ────────────────────────────────────── */
  function applyHoverClass(root) {
    root = root || document;
    let count = 0;
    SELECTORS.forEach(sel => {
      root.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('ae-smooth-hover')) {
          el.classList.add('ae-smooth-hover');
          count++;
        }
      });
    });
    return count;
  }

  /* ── 5. İlk uygulama ───────────────────────────────────────── */
  const total = applyHoverClass(document);
  console.info(`[AE Hover] ✅ ${total} elemente 'ae-smooth-hover' sınıfı eklendi.`);

  /* ── 6. MutationObserver — dinamik içerik için ─────────────── */
  if (window.__aeHoverObserver) {
    window.__aeHoverObserver.disconnect();
  }

  window.__aeHoverObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        SELECTORS.forEach(sel => {
          if (node.matches && node.matches(sel)) {
            node.classList.add('ae-smooth-hover');
          }
        });
        applyHoverClass(node);
      });
    });
  });

  window.__aeHoverObserver.observe(document.body, {
    childList : true,
    subtree   : true,
  });

  console.info('[AE Hover] 👁  MutationObserver aktif — dinamik içerik izleniyor.');

})();
