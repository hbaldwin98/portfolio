const footerYear = document.getElementById('footerDateTime');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeColor = document.getElementById('themeColor');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

function getTheme() {
  return document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
}

function updateThemeControls() {
  const theme = getTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  themeToggle.title = `Switch to ${nextTheme} mode`;
  themeIcon.src = `resources/theme-${nextTheme}.svg`;
  themeColor.content = theme === 'dark' ? '#12161c' : '#f7f6f2';
}

if (themeToggle && themeIcon && themeColor) {
  updateThemeControls();

  themeToggle.addEventListener('click', () => {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem('theme', nextTheme);
    } catch { }

    updateThemeControls();
  });

  systemTheme.addEventListener('change', () => {
    if (!document.documentElement.dataset.theme) updateThemeControls();
  });
}
