const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeColor = document.getElementById('themeColor');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

document.getElementById('year').textContent = new Date().getFullYear();

const getTheme = () => root.dataset.theme || (systemTheme.matches ? 'dark' : 'light');

function updateTheme() {
  const theme = getTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${nextTheme} mode`;

  themeToggle.setAttribute('aria-label', label);
  themeIcon.src = `resources/theme-${nextTheme}.svg`;
  themeColor.content = theme === 'dark' ? '#12161c' : '#f7f6f2';
}

updateTheme();

themeToggle.onclick = () => {
  const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = nextTheme;

  try {
    localStorage.theme = nextTheme;
  } catch { }

  updateTheme();
};

systemTheme.onchange = () => !root.dataset.theme && updateTheme();
