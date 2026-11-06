(function () {
  'use strict';

  var root = document.documentElement;
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileButton = document.querySelector('.mobile-menu-button');
  var mobileBackdrop = document.querySelector('.mobile-backdrop');

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  function closePopovers(except) {
    document.querySelectorAll('[data-popover-button][aria-expanded="true"]').forEach(function (button) {
      if (button === except) return;
      button.setAttribute('aria-expanded', 'false');
      button.nextElementSibling.hidden = true;
    });
  }

  document.querySelectorAll('[data-popover-button]').forEach(function (button) {
    button.addEventListener('click', function () {
      var opening = button.getAttribute('aria-expanded') !== 'true';
      closePopovers(button);
      button.setAttribute('aria-expanded', String(opening));
      button.nextElementSibling.hidden = !opening;
    });
  });

  function markPreferences() {
    document.querySelectorAll('[data-mode]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.mode === root.dataset.krdsMode));
    });
    document.querySelectorAll('[data-scale]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.scale === root.dataset.krdsScale));
    });
  }

  document.querySelectorAll('[data-mode]').forEach(function (button) {
    button.addEventListener('click', function () {
      root.dataset.krdsMode = button.dataset.mode;
      store('krds-mode', button.dataset.mode);
      markPreferences();
    });
  });
  document.querySelectorAll('[data-scale]').forEach(function (button) {
    button.addEventListener('click', function () {
      root.dataset.krdsScale = button.dataset.scale;
      store('krds-scale', button.dataset.scale);
      markPreferences();
    });
  });
  markPreferences();

  var gnbTriggers = Array.prototype.slice.call(document.querySelectorAll('.gnb-trigger'));
  function closeGnb(returnFocus) {
    gnbTriggers.forEach(function (button) {
      if (button.getAttribute('aria-expanded') !== 'true') return;
      button.setAttribute('aria-expanded', 'false');
      document.getElementById(button.getAttribute('aria-controls')).hidden = true;
      if (returnFocus) button.focus();
    });
  }
  gnbTriggers.forEach(function (button) {
    button.addEventListener('click', function () {
      var opening = button.getAttribute('aria-expanded') !== 'true';
      closeGnb(false);
      if (opening) {
        button.setAttribute('aria-expanded', 'true');
        document.getElementById(button.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  function closeMobile(returnFocus) {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    mobileBackdrop.hidden = true;
    document.body.classList.remove('menu-open');
    mobileButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) mobileButton.focus();
  }
  if (mobileButton) {
    mobileButton.addEventListener('click', function () {
      mobileMenu.hidden = false;
      mobileBackdrop.hidden = false;
      document.body.classList.add('menu-open');
      mobileButton.setAttribute('aria-expanded', 'true');
      mobileMenu.querySelector('button').focus();
    });
    document.querySelectorAll('[data-mobile-close]').forEach(function (button) {
      button.addEventListener('click', function () { closeMobile(true); });
    });
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.control-wrap')) closePopovers();
    if (!event.target.closest('.site-nav')) closeGnb(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && mobileMenu && !mobileMenu.hidden) {
      var focusable = Array.prototype.slice.call(mobileMenu.querySelectorAll('a, button:not([disabled])'));
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key !== 'Escape') return;
    if (mobileMenu && !mobileMenu.hidden) { closeMobile(true); return; }
    if (document.querySelector('.gnb-trigger[aria-expanded="true"]')) { closeGnb(true); return; }
    var popoverButton = document.querySelector('[data-popover-button][aria-expanded="true"]');
    if (popoverButton) { closePopovers(); popoverButton.focus(); }
  });
}());
