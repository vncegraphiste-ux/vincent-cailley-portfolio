(() => {
  'use strict';
  const translations = window.PORTFOLIO_TRANSLATIONS;
  const page = document.body.dataset.page || 'home';
  let locale = 'en';
  const requestedCategory = new URLSearchParams(window.location.search).get('category');
  const pathCategory = /^\/apps(?:\/|$)/.test(window.location.pathname) ? 'apps' : 'game';
  let filter = (requestedCategory === 'apps' || requestedCategory === 'game') ? requestedCategory : pathCategory;
  try {
    if (localStorage.getItem('vc-portfolio-language') === 'fr') locale = 'fr';
  } catch (_) { /* local file / private browsing may disable storage */ }

  const dictionary = () => translations[locale];

  function translate() {
    const t = dictionary();
    document.documentElement.lang = locale;
    document.title = page === 'about' ? t.aboutTitle : t.homeTitle;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = t[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const value = t[element.dataset.i18nHtml];
      if (typeof value === 'string') element.innerHTML = value;
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === locale;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
    if (page === 'home') renderProjects();
  }

  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      locale = button.dataset.language;
      try { localStorage.setItem('vc-portfolio-language', locale); } catch (_) { /* optional */ }
      translate();
    });
  });

  function buildProjectImage(project, eager = false) {
    const media = document.createElement('div');
    media.className = 'project-image';
    if (project.image) {
      const img = document.createElement('img');
      img.src = '/' + project.image.replace(/^\/+/, '');
      img.alt = project.alt || project.name;
      img.loading = eager ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.width = 1600;
      img.height = 1200;
      media.appendChild(img);
    }
    return media;
  }

  function buildProjectInfo(project, t) {
    const info = document.createElement('div');
    info.className = 'project-info';
    const name = document.createElement('h2');
    name.textContent = project.name;
    const category = document.createElement('p');
    category.textContent = t.projectCategoryLabels[project.category] || project.category;
    const year = document.createElement('time');
    year.textContent = project.year;
    info.append(name, category, year);
    return info;
  }

  function buildFeaturedCard(project, t, eager) {
    const card = document.createElement('article');
    card.className = 'project-card project-card--featured';
    if (project.gradientFrom) card.style.setProperty('--project-gradient-from', project.gradientFrom);
    if (project.gradientTo) card.style.setProperty('--project-gradient-to', project.gradientTo);

    const header = document.createElement('div');
    header.className = 'project-featured-header';
    header.append(buildProjectInfo(project, t));

    const visualPanel = document.createElement('div');
    visualPanel.className = 'project-visual-panel';

    const gallery = document.createElement('div');
    gallery.className = 'project-gallery';
    if (project.layout) gallery.classList.add('project-gallery--' + project.layout);

    (project.screens || []).forEach((screen, index) => {
      const frame = document.createElement('figure');
      frame.className = 'screen-frame';
      if (screen.type === 'logo') frame.classList.add('screen-frame--logo');
      const img = document.createElement('img');
      img.src = '/' + screen.src.replace(/^\/+/, '');
      img.alt = `${project.name} — ${screen.label || `screen ${index + 1}`}`;
      img.loading = eager && index === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (screen.type === 'logo') {
        img.width = 1000;
        img.height = 810;
      } else if (project.layout === 'landscape' || project.layout === 'landscape-logo') {
        img.width = 2048;
        img.height = 945;
      } else {
        img.width = 921;
        img.height = 1993;
      }
      frame.appendChild(img);
      gallery.appendChild(frame);
    });

    visualPanel.appendChild(gallery);
    card.append(visualPanel, header);
    return card;
  }

  function renderProjects() {
    const grid = document.getElementById('project-grid');
    if (!grid) return;
    const t = dictionary();
    const projects = window.PORTFOLIO_PROJECTS || [];
    grid.replaceChildren();
    let visibleIndex = 0;
    projects.filter(project => filter === 'all' || project.category === filter).forEach(project => {
      const eager = visibleIndex === 0;
      const card = project.featured && Array.isArray(project.screens) && project.screens.length
        ? buildFeaturedCard(project, t, eager)
        : (() => {
            const standardCard = document.createElement('article');
            standardCard.className = 'project-card';
            standardCard.append(buildProjectImage(project, eager), buildProjectInfo(project, t));
            return standardCard;
          })();
      grid.appendChild(card);
      visibleIndex += 1;
    });

    document.title = filter === 'apps'
      ? (locale === 'fr' ? 'Apps & Web UI/UX — Vincent Cailley' : 'App & Web UI/UX — Vincent Cailley')
      : 'Mobile Game UI/UX — Vincent Cailley';
    document.querySelectorAll('[data-category-link]').forEach(link => {
      const active = link.dataset.categoryLink === filter;
      link.classList.toggle('is-active', active);
      if (page === 'home' && active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  if (page === 'home') {
    document.querySelectorAll('[data-category-link]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        filter = link.dataset.categoryLink;
        history.pushState({category: filter}, '', link.getAttribute('href'));
        renderProjects();
        document.getElementById('projects').scrollIntoView({behavior:'smooth', block:'start'});
      });
    });
    window.addEventListener('popstate', () => {
      const requested = new URLSearchParams(window.location.search).get('category');
      filter = requested === 'apps' || requested === 'game' ? requested
        : /^\/apps(?:\/|$)/.test(window.location.pathname) ? 'apps' : 'game';
      renderProjects();
    });
  }
  translate();
})();
