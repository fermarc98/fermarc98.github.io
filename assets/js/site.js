/*
	site.js — minimal vanilla JS for the static multi-page site.
	1. Mobile off-canvas sidebar drawer toggle.
	2. Current year in the sidebar copyright.
	No dependencies; replaces the HTML5 UP jQuery stack.
*/
(function () {
	'use strict';

	var body = document.body;
	var menuBtn = document.getElementById('menuBtn');
	var scrim = document.getElementById('scrim');

	function openNav() {
		body.classList.add('nav-open');
		if (scrim) scrim.hidden = false;
		if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
	}

	function closeNav() {
		body.classList.remove('nav-open');
		if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
		// keep scrim in DOM but visually hidden via CSS; un-hide for transition out
	}

	function toggleNav() {
		if (body.classList.contains('nav-open')) closeNav();
		else openNav();
	}

	if (menuBtn) menuBtn.addEventListener('click', toggleNav);
	if (scrim) scrim.addEventListener('click', closeNav);

	// Close the drawer with Escape.
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeNav();
	});

	// Close when a nav link is tapped (navigation also handles this, but feels snappier).
	var navLinks = document.querySelectorAll('.nav a');
	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener('click', closeNav);
	}

	// Stamp the current year.
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
