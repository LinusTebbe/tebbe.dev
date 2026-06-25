export type ThemePreference = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

function isDarkFor(preference: ThemePreference) {
  if (preference === 'dark') return true
  if (preference === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyClass(preference: ThemePreference) {
  document.documentElement.classList.toggle('dark', isDarkFor(preference))
}

const preference = ref<ThemePreference>('system')

export function useTheme() {
  function setPreference(next: ThemePreference) {
    preference.value = next
    if (next === 'system') {
      localStorage.removeItem(STORAGE_KEY)
    }
    else {
      localStorage.setItem(STORAGE_KEY, next)
    }
    applyClass(next)
  }

  function init() {
    const stored = localStorage.getItem(STORAGE_KEY)
    preference.value = stored === 'light' || stored === 'dark' ? stored : 'system'
    applyClass(preference.value)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (preference.value === 'system') applyClass('system')
    })
  }

  return { preference, setPreference, init }
}
