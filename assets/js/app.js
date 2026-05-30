/* JVGC Studio · App
 *
 * Responsibilities:
 *   - Detect & persist language (en | zh)
 *   - Render Featured Game card and thumbnails
 *   - Apply i18n to [data-i18n] elements
 *   - Handle thumbnail clicks and language switch clicks
 *   - Fallback for missing icon images and missing appStoreUrl
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'jvgc-lang';
  var DEFAULT_LANG = 'en';

  var state = {
    lang: DEFAULT_LANG,
    activeIndex: 0,
    fadeTimer: null
  };

  function safeGetLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') return stored;
    } catch (e) { /* localStorage blocked, fall through */ }
    return DEFAULT_LANG;
  }

  function safeSetLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function t(key) {
    var dict = (window.I18N && window.I18N[state.lang]) || {};
    return dict[key] || '';
  }

  /* SAFETY: innerHTML below is safe because all I18N values are hardcoded in
   * the source dictionary (assets/js/i18n.js); never accept user input here. */
  function applyI18n() {
    document.documentElement.setAttribute('lang', state.lang);
    document.title = t('meta.title');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = t(key);
    });
    /* data-i18n-attr value format: "<attribute>:<i18n.key>"; e.g. "aria-label:nav.ariaMain" */
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      var idx = spec.indexOf(':');
      if (idx <= 0) return;
      var attr = spec.slice(0, idx).trim();
      var key = spec.slice(idx + 1).trim();
      el.setAttribute(attr, t(key));
    });
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'zh') return;
    state.lang = lang;
    safeSetLang(lang);
    document.querySelectorAll('.nav__lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    applyI18n();
    renderFeatured(state.activeIndex);
    renderThumbs();
  }

  function renderFeatured(index) {
    var container = document.getElementById('featured');
    if (!container) return;
    var games = window.GAMES || [];
    if (!games.length) return;
    var i = Math.max(0, Math.min(index, games.length - 1));
    state.activeIndex = i;
    var g = games[i];
    var name = g.name[state.lang];
    var tagline = g.tagline[state.lang];
    var category = g.category[state.lang];
    var pill = (i + 1) + ' / ' + games.length + ' · ' + category;
    var hasUrl = !!g.appStoreUrl;
    var ctaLabel = hasUrl ? t('games.cta') : t('games.ctaDisabled');

    container.innerHTML =
      '<div class="featured__icon" id="featured-icon" style="background-image: ' + g.iconGradient + ';" role="img" aria-label="' + escapeAttr(name) + '"></div>' +
      '<div class="featured__info">' +
        '<span class="featured__pill">' + escapeHtml(pill) + '</span>' +
        '<h3 class="featured__name">' + escapeHtml(name) + '</h3>' +
        '<p class="featured__tagline">' + escapeHtml(tagline) + '</p>' +
        (hasUrl
          ? '<a class="featured__cta" href="' + escapeAttr(g.appStoreUrl) + '" target="_blank" rel="noopener">' + escapeHtml(ctaLabel) + '</a>'
          : '<span class="featured__cta is-disabled" aria-disabled="true">' + escapeHtml(ctaLabel) + '</span>') +
      '</div>';

    /* Try to load actual icon, fallback to gradient on error */
    var icon = new Image();
    icon.onload = function () {
      var el = document.getElementById('featured-icon');
      if (el) {
        el.style.backgroundImage = 'url(' + g.icon + ')';
      }
    };
    icon.onerror = function () { /* keep gradient */ };
    icon.src = g.icon;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }

  function escapeAttr(s) {
    return String(s).replace(/"/g, '&quot;');
  }

  function renderThumbs() {
    var container = document.getElementById('thumbs');
    if (!container) return;
    var games = window.GAMES || [];
    container.innerHTML = '';
    games.forEach(function (g, idx) {
      var btn = document.createElement('button');
      btn.className = 'thumb' + (idx === state.activeIndex ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === state.activeIndex ? 'true' : 'false');
      btn.setAttribute('aria-label', g.name[state.lang]);
      btn.setAttribute('data-index', String(idx));
      btn.style.backgroundImage = g.iconGradient;
      /* Try icon image, fallback to gradient */
      var img = new Image();
      img.onload = function () {
        btn.style.backgroundImage = 'url(' + g.icon + ')';
      };
      img.src = g.icon;
      btn.addEventListener('click', function () {
        selectGame(idx);
      });
      container.appendChild(btn);
    });
  }

  function selectGame(idx) {
    state.activeIndex = idx;
    document.querySelectorAll('.thumb').forEach(function (el, i) {
      var on = i === idx;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    /* Fade out current, then snap to new (cancellable on rapid clicks) */
    var icon = document.getElementById('featured-icon');
    var info = document.querySelector('.featured__info');
    if (icon) icon.classList.add('is-fading');
    if (info) info.classList.add('is-fading');
    if (state.fadeTimer !== null) clearTimeout(state.fadeTimer);
    state.fadeTimer = setTimeout(function () {
      renderFeatured(idx);
      state.fadeTimer = null;
    }, 200);
  }

  function updateHeroStats() {
    var el = document.getElementById('hero-titles-count');
    if (el && Array.isArray(window.GAMES)) {
      el.textContent = String(window.GAMES.length);
    }
  }

  function init() {
    state.lang = safeGetLang();
    applyI18n();
    updateHeroStats();
    document.querySelectorAll('.nav__lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
    /* The two below are no-ops until Tasks 9/10 implement them */
    renderThumbs();
    renderFeatured(state.activeIndex);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
