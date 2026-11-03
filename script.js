(() => {
  'use strict';
  const translations = window.PORTFOLIO_TRANSLATIONS;
  const page = document.body.dataset.page || 'home';
  let locale = 'en';
  // The landing page defaults to games; query links can open the apps gallery.
  const requestedCategory = new URLSearchParams(window.location.search).get('category');
  let filter = requestedCategory === 'apps' ? 'apps' : 'game';
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
      if (typeof value === 'string') element.innerHTML = value; // HTML is from this trusted, local dictionary only.
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

  function renderProjects() {
    const grid = document.getElementById('project-grid');
    if (!grid) return;
    const t = dictionary();
    const projects = window.PORTFOLIO_PROJECTS || [];
    grid.replaceChildren();
    projects.filter(project => filter === 'all' || project.category === filter).forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      const media = document.createElement('div');
      media.className = 'project-image';
      if (project.image) {
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.alt || project.name;
        img.loading = project === projects[0] ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.width = 1600;
        img.height = 1200;
        media.appendChild(img);
      }
      const info = document.createElement('div');
      info.className = 'project-info';
      const name = document.createElement('h2');
      name.textContent = project.name;
      const category = document.createElement('p');
      category.textContent = t.projectCategoryLabels[project.category] || project.category;
      const year = document.createElement('time');
      year.textContent = project.year;
      info.append(name, category, year);
      card.append(media, info);
      grid.appendChild(card);
    });
    document.querySelectorAll('[data-category-link]').forEach(link => {
      const active = link.dataset.categoryLink === filter;
      link.classList.toggle('is-active', active);
      if (page === 'home' && active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  // The two links work from both pages without requiring JavaScript.
  // On the gallery itself, switch categories without a full page reload.
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
      filter = new URLSearchParams(window.location.search).get('category') === 'apps' ? 'apps' : 'game';
      renderProjects();
    });
  }
  translate();
})();
