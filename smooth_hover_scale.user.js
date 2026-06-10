// ==UserScript==
// @name         AutomationExercise – Smooth Hover Scale
// @namespace    https://automationexercise.com/
// @version      1.2.0
// @description  Tüm metin linkleri, butonlar ve ürün kartlarına (hover durumunda) göz yormayan yumuşak büyüme efekti ekler.
// @author       Antigravity
// @match        https://automationexercise.com/*
// @match        http://automationexercise.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  /* ============================================================
     1. CSS INJECTION — tüm hedef elementlere genel kurallar
     ============================================================ */
  const css = `
    /* ── Genel transition altyapısı ─────────────────────────── */
    .ae-smooth-hover {
      transition: transform 0.3s ease-in-out,
                  box-shadow 0.3s ease-in-out !important;
      will-change: transform;
      backface-visibility: hidden;
    }

    /* Hover anında yumuşak büyüme */
    .ae-smooth-hover:hover {
      transform: scale(1.04) !important;
    }

    /* ── NAV / METİN LİNKLERİ ──────────────────────────────── */
    /* Nav linkleri inline-block değil; yanlış kaymayı önle */
    header .nav li a.ae-smooth-hover,
    .shop-menu .nav li a.ae-smooth-hover,
    .brands-name .nav li a.ae-smooth-hover,
    .panel-body ul li a.ae-smooth-hover,
    .choose .nav li a.ae-smooth-hover {
      display: inline-block;
    }

    header .nav li a.ae-smooth-hover:hover,
    .shop-menu .nav li a.ae-smooth-hover:hover {
      transform: scale(1.08) !important; /* nav linkleri biraz daha belirgin */
    }

    /* ── BUTONLAR ────────────────────────────────────────────── */
    .btn.ae-smooth-hover {
      display: inline-block;
    }

    .btn.ae-smooth-hover:hover {
      transform: scale(1.06) !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18) !important;
    }

    /* ── ÜRÜN KARTLARI (product-image-wrapper) ──────────────── */
    .product-image-wrapper.ae-smooth-hover {
      display: block;
      overflow: hidden;         /* scale sırasında kart dışına taşmayı engelle */
      border-radius: 4px;
    }

    .product-image-wrapper.ae-smooth-hover:hover {
      transform: scale(1.04) !important;
      box-shadow: 0 10px 32px rgba(0, 0, 0, 0.14) !important;
      z-index: 10;
      position: relative;
    }

    /* ── PANEL BAŞLIKLARI (kategori accordion) ──────────────── */
    .panel-heading.ae-smooth-hover {
      display: block;
    }

    .panel-heading.ae-smooth-hover:hover {
      transform: scale(1.02) !important;
    }

    /* ── MARKA LİSTE ÖĞELERİ ───────────────────────────────── */
    .brands-name .nav li.ae-smooth-hover {
      display: block;
    }

    /* ── FOOTER LİNKLERİ ────────────────────────────────────── */
    footer a.ae-smooth-hover {
      display: inline-block;
    }
  `;

  /* GM_addStyle varsa kullan, yoksa <style> etiketi ekle */
  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css);
  } else {
    const style = document.createElement('style');
    style.id   = 'ae-smooth-hover-styles';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  /* ============================================================
     2. ELEMENT SEÇİCİLER
     ============================================================ */
  const SELECTORS = [
    /* Nav + metin linkleri */
    'header .nav li a',
    '.shop-menu .nav li a',
    '.panel-body ul li a',
    '.brands-name .nav li a',
    '.choose .nav li a',
    'footer a',
    '#footer a',

    /* Butonlar */
    'button',
    '.btn',
    'input[type="button"]',
    'input[type="submit"]',
    'a.btn',

    /* Ürün kartları — kart wrapper'ı ölçeklendiriyoruz */
    '.product-image-wrapper',

    /* Kategori accordion başlıkları */
    '.panel-heading',

    /* Marka liste satırları */
    '.brands-name .nav li',
  ];

  /* ============================================================
     3. SINIF EKLE FONKSİYONU
     ============================================================ */
  function applyHoverClass(root) {
    root = root || document;
    SELECTORS.forEach(selector => {
      root.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('ae-smooth-hover')) {
          el.classList.add('ae-smooth-hover');
        }
      });
    });
  }

  /* ============================================================
     4. İLK UYGULAMA
     ============================================================ */
  applyHoverClass(document);

  /* ============================================================
     5. DİNAMİK İÇERİK — MutationObserver
        (sayfa AJAX ile içerik yüklüyorsa yeni elementlere de uygula)
     ============================================================ */
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Eklenen node'un kendisine de seçici uyuyorsa ekle
          SELECTORS.forEach(selector => {
            if (node.matches && node.matches(selector)) {
              node.classList.add('ae-smooth-hover');
            }
          });
          // Alt elementleri de tara
          applyHoverClass(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList : true,
    subtree   : true,
  });

})();
