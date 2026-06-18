import { create } from "zustand"
import { applyTheme, getStoredTheme } from "../utils/theme"

export const useThemeStore = create((set) => ({
  theme: getStoredTheme(),

  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },

  toggleTheme: () => {
    const next = useThemeStore.getState().theme === "dark" ? "light" : "dark"
    useThemeStore.getState().setTheme(next)
  },
}))
