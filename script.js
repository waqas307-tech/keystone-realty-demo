// Sarah Mitchell, Realtor — small helpers: mobile menu, today's hours,
// scroll animations, footer year, and the contact form thank-you note.

// 1) Mobile menu: the three-line button opens and closes the links.
var menuButton = document.getElementById('menu-button');
var mainNav = document.getElementById('main-nav');

menuButton.addEventListener('click', function () {
  var isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close the menu after a link is tapped (nicer on phones).
mainNav.addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

// 2) Today's hours: pick the right line for the real day of the week.
// getDay() gives 0 = Sunday, 1 = Monday, ... 6 = Saturday.
var hoursByDay = {
  0: 'By appointment',        // Sunday
  1: '9:00 AM – 6:00 PM',     // Monday
  2: '9:00 AM – 6:00 PM',     // Tuesday
  3: '9:00 AM – 6:00 PM',     // Wednesday
  4: '9:00 AM – 6:00 PM',     // Thursday
  5: '9:00 AM – 6:00 PM',     // Friday
  6: '10:00 AM – 4:00 PM'     // Saturday
};

var today = new Date().getDay();
document.getElementById('today-hours').textContent = hoursByDay[today];

// Highlight today's row in the hours table and add a friendly note.
var rows = document.querySelectorAll('#hours-table tr');
rows.forEach(function (row) {
  var days = row.getAttribute('data-days').split(',');
  if (days.indexOf(String(today)) !== -1) {
    row.classList.add('today');
    document.getElementById('today-note').textContent =
      today === 0
        ? 'Today is Sunday — the office is closed, but Sarah takes calls by appointment.'
        : 'That highlighted row is today — the office is open ' + hoursByDay[today] + '.';
  }
});

// 3) Reveal on scroll: sections fade up gently as they appear on screen.
// The hidden starting state (.reveal-init) is added HERE, by JavaScript
// itself — so if JavaScript is off or broken, every section stays visible.
var revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  revealItems.forEach(function (item) { item.classList.add('reveal-init'); });
  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        watcher.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (item) { watcher.observe(item); });
}

// 4) Footer year: keep the copyright line current on its own.
document.getElementById('year').textContent = new Date().getFullYear();

// 5) Contact form: there is no server behind this demo,
// so we thank the visitor on the page instead of sending anything.
var form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
  var name = document.getElementById('name').value.trim();
  document.getElementById('form-note').textContent =
    'Thank you' + (name ? ', ' + name : '') + '! Your note is on its way — Sarah replies within one working day.';
  form.reset();
});
