/**
 * ==============================================================================
 * BUMBLE BURGER - CLIENT CONTROLLER (UNIVERSAL COMPATIBLE SCRIPT)
 * Works under both http:// and file:// protocols seamlessly!
 * ==============================================================================
 */

(function () {
  'use strict';

  function initApp() {
    // 1. Initialize WhatsApp Order Engine
    const orderEngine = window.WhatsAppOrderEngine ? new window.WhatsAppOrderEngine() : null;

    // 2. Setup Category Filtering on Menu Page
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-item-card');
    const noResultsBox = document.getElementById('noResultsBox');
    const searchInput = document.getElementById('menuSearchInput');

    let currentCategory = 'all';
    let currentSearch = '';

    function filterMenu() {
      if (!menuCards.length) return;
      let visibleCount = 0;

      const query = currentSearch.toLowerCase().trim();

      menuCards.forEach(function (card) {
        const itemCat = card.getAttribute('data-category');
        const itemName = (card.getAttribute('data-name') || card.innerText || '').toLowerCase();

        const matchCat = (currentCategory === 'all' || itemCat === currentCategory);
        const matchSearch = (!query || itemName.includes(query));

        if (matchCat && matchSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsBox) {
        noResultsBox.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    if (categoryButtons.length) {
      categoryButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          categoryButtons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          currentCategory = btn.getAttribute('data-category') || 'all';
          filterMenu();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        currentSearch = e.target.value;
        filterMenu();
      });
    }

    // 3. Attach Order Buttons to WhatsApp Modal
    document.querySelectorAll('.menu-order-btn, .offer-order-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const itemName = e.currentTarget.getAttribute('data-item') || 'وجبة بامبل برجر';
        if (orderEngine) {
          orderEngine.openOrderModal(itemName);
        } else {
          const url = 'https://wa.me/201002194064?text=' + encodeURIComponent('مساء الخير، حابب أطلب ' + itemName + ' من Bumble Burger أسيوط 🍔');
          window.open(url, '_blank');
        }
      });
    });

    // 4. Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener('click', function () {
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
          navMenu.classList.remove('open');
          hamburgerBtn.classList.remove('active');
          document.body.style.overflow = '';
        } else {
          navMenu.classList.add('open');
          hamburgerBtn.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // 5. Highlight Active Navigation Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === '/' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // 6. Sticky Header Shadow on Scroll
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function () {
      if (header) {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // 7. Language Switcher (Arabic RTL <-> English LTR)
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      const savedLang = localStorage.getItem('bumble_lang') || 'ar';
      applyLang(savedLang);

      langBtn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('lang') || 'ar';
        const next = current === 'ar' ? 'en' : 'ar';
        applyLang(next);
      });
    }

    function applyLang(lang) {
      localStorage.setItem('bumble_lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      if (langBtn) {
        langBtn.innerHTML = lang === 'ar' ? '🌐 English' : '🌐 العربية';
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
