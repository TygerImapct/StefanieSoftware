document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Highlight current page
  const page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === page));

  // Cookie consent - functional without external services
  const KEY = 'stefanie_cookie_preferences_v2';
  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal-backdrop');
  const analytics = document.getElementById('cookie-analytics');
  const marketing = document.getElementById('cookie-marketing');

  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch (e) { return null } };
  const save = (analyticsValue, marketingValue) => {
    const prefs = { necessary: true, analytics: !!analyticsValue, marketing: !!marketingValue, savedAt: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(prefs)) } catch (e) { }
    return prefs;
  };
  const hideBanner = () => { if (banner) banner.classList.remove('show'); };
  const sync = (prefs) => {
    if (analytics) analytics.checked = !!prefs.analytics;
    if (marketing) marketing.checked = !!prefs.marketing;
    hideBanner();
    document.documentElement.dataset.analyticsCookies = prefs.analytics ? 'enabled' : 'disabled';
    document.documentElement.dataset.marketingCookies = prefs.marketing ? 'enabled' : 'disabled';
  };
  const openModal = () => {
    const p = read() || { analytics: false, marketing: false };
    if (analytics) analytics.checked = !!p.analytics;
    if (marketing) marketing.checked = !!p.marketing;
    if (modal) { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); }
  };
  const closeModal = () => { if (modal) { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); } };
  const current = read();
  if (current) sync(current); else if (banner) banner.classList.add('show');

  document.querySelectorAll('[data-cookie-settings]').forEach(b => b.addEventListener('click', openModal));
  document.querySelectorAll('[data-cookie-accept-all]').forEach(b => b.addEventListener('click', () => { sync(save(true, true)); closeModal(); }));
  document.querySelectorAll('[data-cookie-reject]').forEach(b => b.addEventListener('click', () => { sync(save(false, false)); closeModal(); }));
  document.querySelectorAll('[data-cookie-save]').forEach(b => b.addEventListener('click', () => { sync(save(analytics?.checked, marketing?.checked)); closeModal(); }));
  document.querySelectorAll('[data-cookie-close]').forEach(b => b.addEventListener('click', closeModal));
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Demo contact form
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  if (form && result) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      result.textContent = 'ส่งข้อมูลตัวอย่างเรียบร้อยแล้ว — เว็บไซต์นี้ยังไม่ได้เชื่อมต่อระบบอีเมลจริง';
      form.reset();
    });
  }
});