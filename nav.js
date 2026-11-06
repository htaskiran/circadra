(() => {
  'use strict';
  const menu = document.getElementById('menu');
  const toggle = document.getElementById('menu-toggle');
  const buttons = [...document.querySelectorAll('.menu-btn')];
  const desktop = () => window.matchMedia('(min-width: 901px)').matches;

  const closePanels = except => buttons.forEach(b => {
    if (b === except) return;
    b.setAttribute('aria-expanded', 'false');
    document.getElementById(b.getAttribute('aria-controls')).classList.remove('open');
  });
  const setPanel = (btn, open) => {
    if (open) closePanels(btn);
    btn.setAttribute('aria-expanded', String(open));
    document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('open', open);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => setPanel(btn, btn.getAttribute('aria-expanded') !== 'true'));
    const item = btn.parentElement;
    let timer;
    item.addEventListener('mouseenter', () => { if (desktop()) { clearTimeout(timer); setPanel(btn, true); } });
    item.addEventListener('mouseleave', () => { if (desktop()) timer = setTimeout(() => setPanel(btn, false), 140); });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePanels();
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-header')) closePanels();
  });

  toggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    closePanels();
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }));

  /* Section tabs: highlight the section that is currently under the sticky bars. */
  const tabs = [...document.querySelectorAll('.tabbar a')];
  const sections = tabs.map(t => document.querySelector(t.getAttribute('href')));
  if (tabs.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = 0;
      sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= 170) current = i; });
      if (atBottom) current = sections.length - 1;
      tabs.forEach((t, i) => t.classList.toggle('active', i === current));
      const bar = tabs[current].parentElement;   // only scroll the tab strip sideways, never the page
      if (bar.scrollWidth > bar.clientWidth) bar.scrollLeft = tabs[current].offsetLeft - 16;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
