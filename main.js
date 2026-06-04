'use strict';

/* ======================================================
   ASHEN PAUL — main.js
   Handles: mobile nav, project filter, contact form
   ====================================================== */

/* ── MOBILE NAV ──────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.primary-nav');

if (toggle && nav) {

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    nav.classList.toggle('open', !open);
  });

  // close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('open');
    }
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggle.focus();
    }
  });
}

/* ── PROJECT FILTER ──────────────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projItems   = document.querySelectorAll('#proj-list li');
const filterStatus = document.getElementById('filter-status');

if (filterBtns.length && projItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // update button states
      filterBtns.forEach(b => {
        b.setAttribute('aria-pressed', 'false');
        b.classList.remove('active');
      });
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('active');

      // show / hide items
      let count = 0;
      projItems.forEach(item => {
        const cats = item.dataset.category || '';
        const show = filter === 'all' || cats.split(' ').includes(filter);
        item.hidden = !show;
        if (show) count++;
      });

      // screen-reader announcement
      if (filterStatus) {
        filterStatus.textContent =
          `Showing ${count} project${count !== 1 ? 's' : ''} — filter: ${
            filter === 'all' ? 'all categories' : filter
          }.`;
      }
    });
  });
}

/* ── CONTACT FORM ────────────────────────────────────── */
const form = document.getElementById('contact-form');

if (form) {
  const nameEl    = form.querySelector('#name');
  const emailEl   = form.querySelector('#email');
  const messageEl = form.querySelector('#message');
  const consentEl = form.querySelector('#consent');
  const charCount = document.getElementById('char-count');
  const formMsg   = document.getElementById('form-msg');
  const submitBtn = form.querySelector('[type="submit"]');
  const spinner   = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  /* Live character count */
  if (messageEl && charCount) {
    messageEl.addEventListener('input', () => {
      const n = messageEl.value.length;
      charCount.textContent = n ? `${n} character${n !== 1 ? 's' : ''} so far.` : '';
    });
  }

  /* Helpers */
  function showErr(input, errId, msg) {
    const el = document.getElementById(errId);
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearErr(input, errId) {
    const el = document.getElementById(errId);
    if (!el) return;
    el.textContent = '';
    el.hidden = true;
    input.removeAttribute('aria-invalid');
  }

  /* Validators */
  function checkName() {
    if (!nameEl.value.trim()) {
      showErr(nameEl, 'name-err', 'Please enter your name.'); return false;
    }
    clearErr(nameEl, 'name-err'); return true;
  }

  function checkEmail() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim()) {
      showErr(emailEl, 'email-err', 'Please enter your email address.'); return false;
    }
    if (!re.test(emailEl.value.trim())) {
      showErr(emailEl, 'email-err', 'That doesn\'t look like a valid email.'); return false;
    }
    clearErr(emailEl, 'email-err'); return true;
  }

  function checkMessage() {
    if (!messageEl.value.trim()) {
      showErr(messageEl, 'message-err', 'Please write a message.'); return false;
    }
    if (messageEl.value.trim().length < 10) {
      showErr(messageEl, 'message-err', 'Message needs to be at least 10 characters.'); return false;
    }
    clearErr(messageEl, 'message-err'); return true;
  }

  function checkConsent() {
    if (!consentEl.checked) {
      showErr(consentEl, 'consent-err', 'Please check the box to continue.'); return false;
    }
    clearErr(consentEl, 'consent-err'); return true;
  }

  /* Blur validation */
  nameEl.addEventListener('blur',    checkName);
  emailEl.addEventListener('blur',   checkEmail);
  messageEl.addEventListener('blur', checkMessage);
  consentEl.addEventListener('change', checkConsent);

  /* Submit */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const valid = [checkName(), checkEmail(), checkMessage(), checkConsent()].every(Boolean);

    if (!valid) {
      // move focus to first invalid field
      const bad = form.querySelector('[aria-invalid="true"]');
      if (bad) bad.focus();
      showFeedback('error', 'There are a few things to fix before sending — see the fields above.');
      return;
    }

    // Loading state
    if (submitBtn) { submitBtn.disabled = true; submitBtn.setAttribute('aria-busy', 'true'); }
    if (spinner)   { spinner.hidden = false; }

    // Simulate network request (replace with real fetch in production)
    await new Promise(r => setTimeout(r, 1400));

    if (submitBtn) { submitBtn.disabled = false; submitBtn.removeAttribute('aria-busy'); }
    if (spinner)   { spinner.hidden = true; }

    showFeedback('success', '✓ Message sent! I\'ll get back to you soon.');
    form.reset();
    if (charCount) charCount.textContent = '';
  });

  function showFeedback(type, msg) {
    if (!formMsg) return;
    formMsg.textContent = msg;
    formMsg.className   = `form-feedback ${type}`;
    formMsg.hidden      = false;
    formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    formMsg.focus();
  }
}
