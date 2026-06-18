export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function getStoredTheme() {
  const stored = localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") return stored
  return getSystemTheme()
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem("theme", theme)
}

export function initTheme() {
  applyTheme(getStoredTheme())
}
