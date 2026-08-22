/**
 * ==============================================================================
 * BUMBLE BURGER - CLIENT CONTROLLER (UNIVERSAL COMPATIBLE SCRIPT)
 * Works under both http:// and file:// protocols seamlessly!
 * ==============================================================================
 */

(function () {
  'use strict';

  function initApp() {
    renderFullMenu();

    // 1. Setup Category Filtering on Menu Page
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-item-card');
    const menuHeadings = document.querySelectorAll('.menu-section-heading, .menu-subcategory');
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

      menuHeadings.forEach(function (heading) {
        const section = heading.getAttribute('data-section');
        const hasVisibleCard = Array.from(menuCards).some(function (card) {
          return card.getAttribute('data-category') === section && card.style.display !== 'none';
        });
        heading.style.display = hasVisibleCard ? '' : 'none';
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

    // 3. Mobile Hamburger Menu Toggle
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

    // 4. Highlight Active Navigation Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === '/' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // 5. Sticky Header Shadow on Scroll
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

    // 6. Language Switcher (Arabic RTL <-> English LTR)
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

    function renderFullMenu() {
      const grid = document.getElementById('menuItemsGrid');
      if (!grid || typeof BUMBLE_MENU === 'undefined') return;

      const sectionOrder = [
        { id: 'sandwiches', title: 'ساندوتشات البرجر', categories: ['beef_sandwiches', 'chicken_sandwiches', 'smash_burger'] },
        { id: 'combos', title: 'الوجبات العائلية والكومبو', categories: ['combo_bumble'] },
        { id: 'appetizers', title: 'المقبلات والأطباق الجانبية', categories: ['appetizers'] },
        { id: 'extras', title: 'الصوصات والإضافات', categories: ['sauces', 'additions'] },
        { id: 'bar', title: 'البار والمشروبات', categories: ['fresh_juices', 'fresh_mixes', 'mix_soda', 'soft_drinks'] },
        { id: 'coffee', title: 'القهوة والمشروبات الساخنة والآيس كوفي', categories: ['espresso', 'hot_drinks', 'ice_coffee'] },
        { id: 'desserts', title: 'الديزرت والآيس كريم', categories: ['desserts', 'ice_cream', 'milkshake'] }
      ];
      const categoryMap = Object.fromEntries(BUMBLE_MENU.categories.map(category => [category.category_id, category]));

      grid.innerHTML = sectionOrder.map(section => {
        const categories = section.categories.map(id => categoryMap[id]).filter(Boolean);
        const categoryMarkup = categories.map(category => {
          const note = category.note ? `<p class="menu-category-note">${category.note}</p>` : '';
          return `<div class="menu-subcategory" data-section="${section.id}"><h3>${category.category_name}</h3>${note}</div>${category.items.map(item => createMenuCard(item, category, section)).join('')}`;
        }).join('');
        return `<div class="menu-section-heading" data-section="${section.id}"><h2>${section.title}</h2></div>${categoryMarkup}`;
      }).join('');
    }

    function createMenuCard(item, category, section) {
      const imageMap = {
        chicken_sandwiches: 'assets/images/chicken-island.svg',
        beef_sandwiches: 'assets/images/buzz.svg',
        smash_burger: 'assets/images/burger-classic.svg',
        combo_bumble: 'assets/images/combo-solo.svg',
        appetizers: 'assets/images/fries-loaded.svg',
        sauces: 'assets/images/sauce-bumble.svg',
        additions: 'assets/images/sauce-cheddar.svg',
        fresh_juices: 'assets/images/drink-soda.svg',
        fresh_mixes: 'assets/images/drink-soda.svg',
        mix_soda: 'assets/images/drink-soda.svg',
        soft_drinks: 'assets/images/drink-soda.svg',
        espresso: 'assets/images/drink-soda.svg',
        hot_drinks: 'assets/images/drink-soda.svg',
        ice_coffee: 'assets/images/drink-soda.svg',
        desserts: 'assets/images/dessert-waffle.svg',
        ice_cream: 'assets/images/dessert-ice-cream.svg',
        milkshake: 'assets/images/dessert-milkshake.svg'
      };
      const originalPrice = item.price_original ?? item.price;
      const stuffedPrice = item.price_stuffed;
      const prices = stuffedPrice
        ? `<span class="price-note">أوريجينال (150 جرام): ${originalPrice} ج.م</span><span class="price-note">ستافد (180 جرام): ${stuffedPrice} ج.م</span>`
        : `<span class="suggested-price">${originalPrice} <span>ج.م</span></span>`;
      const badge = item.is_new ? '<span class="item-badge">NEW 🔥</span>' : '';
      const description = item.description || buildItemDescription(item, category);
      const itemId = `${category.category_id}-${item.name}`;

      return `<article class="menu-item-card" data-category="${section.id}" data-name="${item.name} ${description}">
        <div class="menu-item-thumb"><img src="${imageMap[category.category_id] || 'assets/images/Logo.svg'}" alt="${item.name}" loading="lazy" />${badge}</div>
        <div class="menu-item-body"><h3 class="menu-item-title">${item.name}</h3><p class="menu-item-desc">${description}</p>
          <div class="menu-item-footer"><div class="price-wrapper">${prices}</div>
            <button class="btn btn-primary btn-sm menu-order-btn" data-item="${itemId}" data-price="${originalPrice}">اطلب الآن 📱</button>
          </div>
        </div>
      </article>`;
    }

    function buildItemDescription(item, category) {
      const descriptions = {
        sauces: `صوص ${item.name.replace(/^صوص\s*/, '')} المحضر بعناية ليكمل نكهة ساندوتشك من بامبل برجر.`,
        additions: `${item.name} إضافة مختارة بعناية من بامبل برجر لرفع مستوى ساندوتشك وإكمال كل قضمة.`,
        bar_additions: `${item.name} لمسة إضافية من بار بامبل برجر لتحصل على مشروبك بالطعم الذي تفضله.`,
        fresh_juices: `${item.name} طازج ومحضر عند الطلب ليمنحك انتعاشًا حقيقيًا مع وجبتك من بامبل برجر.`,
        soft_drinks: `${item.name} مشروب بارد ومنعش يكمّل تجربة بامبل برجر بكل بساطة.`,
        espresso: `${item.name} قهوة محضرة بعناية لعشاق المذاق الأصيل في بامبل برجر.`,
        hot_drinks: `${item.name} مشروب ساخن غني يضيف لحظتك الهادئة لمسة مميزة من بامبل برجر.`,
        ice_coffee: `${item.name} مزيج بارد ومنعش لمحبي القهوة، محضر بأسلوب بامبل برجر.`,
        desserts: `${item.name} حلوى شهية محضرة لتختم تجربة بامبل برجر بمذاق لا يُنسى.`,
        ice_cream: `${item.name} تحلية باردة ومنعشة تمنحك نهاية مثالية لوجبتك في بامبل برجر.`,
        milkshake: `${item.name} ميلك تشيك كريمي غني بالنكهة، من اختيارات بار بامبل برجر المميزة.`
      };

      return descriptions[category.category_id] || `${item.name} اختيار مميز أعده لك فريق بامبل برجر بجودة تليق بكل قضمة.`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
