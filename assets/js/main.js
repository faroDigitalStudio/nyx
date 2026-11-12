/**
 * Eros Photography | MetaLumina Spectrum
 * Adapted from Strada by BootstrapMade
 * https://bootstrapmade.com/strada-bootstrap-agency-template/
 * Original template updated Apr 01 2026 (Bootstrap v5.3.8)
 *
 * Site behaviors: fixed-header state, mobile navigation, scroll-to-top,
 * section highlighting, and Formspark inquiry submission.
 * No jQuery or other runtime library is required by this file.
 */

(function () {
  'use strict';

  const body = document.body;
  const header = document.getElementById('header');
  const nav = document.getElementById('navmenu');
  const mobileToggle = nav?.querySelector('.mobile-nav-toggle');
  const scrollTopButton = document.getElementById('scroll-top');
  const navLinks = Array.from(nav?.querySelectorAll('a[href^="#"]') ?? []);

  // Header contrast and scroll-to-top visibility.
  function updateScrollState() {
    const scrolled = window.scrollY > 100;
    body.classList.toggle('scrolled', scrolled);
    scrollTopButton?.classList.toggle('active', scrolled);

    // Only highlight links to sections actually represented in the nav.
    const marker = window.scrollY + (header?.offsetHeight || 80) + 90;
    let current = null;
    for (const link of navLinks) {
      const target = document.getElementById(link.hash.slice(1));
      if (target && target.offsetTop <= marker) current = link;
    }
    navLinks.forEach((link) => {
      const active = link === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  let scrollScheduled = false;
  window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(() => {
      updateScrollState();
      scrollScheduled = false;
    });
  }, { passive: true });
  window.addEventListener('load', updateScrollState);
  updateScrollState();

  function closeMobileNav() {
    if (!mobileToggle || !body.classList.contains('mobile-nav-active')) return;
    body.classList.remove('mobile-nav-active');
    mobileToggle.classList.remove('bi-x');
    mobileToggle.classList.add('bi-list');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open navigation');
  }

  if (mobileToggle) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-controls', 'navmenu');
    mobileToggle.setAttribute('aria-label', 'Open navigation');
    mobileToggle.addEventListener('click', () => {
      const open = body.classList.toggle('mobile-nav-active');
      mobileToggle.classList.toggle('bi-list', !open);
      mobileToggle.classList.toggle('bi-x', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMobileNav));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('mobile-nav-active')) {
        closeMobileNav();
        mobileToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200) closeMobileNav();
    });
  }

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', (event) => {
      event.preventDefault();
      closeMobileNav();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  // Email-first booking form, using the endpoint already present in index.html.
  const form = document.getElementById('eros-inquiry-form');
  const status = document.getElementById('eros-form-status');
  const submitButton = document.getElementById('eros-submit');

  if (!form || !status || !submitButton) return;

  const originalButtonMarkup = submitButton.innerHTML;
  let submitting = false;
  let submittedSuccessfully = false;

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = 'form-response';
    if (message) status.classList.add('is-visible');
    if (kind === 'success') status.classList.add('is-success');
    if (kind === 'error') status.classList.add('is-error');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting || submittedSuccessfully) return;

    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    // Honeypot remains an actual HTML field for non-JS submissions too.
    if (String(fields.get('_honeypot') ?? '').trim()) {
      setStatus('Please try again or email us directly.', 'error');
      return;
    }

    // Formspark's JSON API expects email customization as a nested object.
    // HTML POST fallback retains the original _email.subject/_email.from names.
    const payload = Object.fromEntries(fields.entries());
    const emailSettings = {
      subject: String(fields.get('_email.subject') || '[EROS] Photography Inquiry'),
      from: String(fields.get('_email.from') || 'Eros Photography')
    };
    delete payload['_email.subject'];
    delete payload['_email.from'];
    payload._email = emailSettings;

    submitting = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending…';
    setStatus('Sending your inquiry…');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // A 403 may be spam filtering; a 402 may indicate an account issue.
        // Keep the visitor-facing message straightforward and offer direct email.
        throw new Error(`Formspark returned HTTP ${response.status}`);
      }

      submittedSuccessfully = true;
      form.reset();
      setStatus('Thank you! Your inquiry was sent. We’ll be in touch by email.', 'success');
      submitButton.textContent = 'Inquiry Sent';
      // Leave disabled after success to avoid accidental repeat submissions.
    } catch (error) {
      console.warn('Eros inquiry submission was not confirmed:', error);
      setStatus('We couldn’t send your inquiry. Please try again, or email book@erosphotos.com directly.', 'error');
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonMarkup;
    } finally {
      submitting = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
})();
