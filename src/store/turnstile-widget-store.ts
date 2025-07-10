import { create } from 'zustand'

interface TurnstileModel {
  _captcha_token: string | null
  setCaptchaToken: (token: string) => void
}

export const useTurnstileStore = create<TurnstileModel>(set => ({
  _captcha_token: null,
  setCaptchaToken: (token: string) => set({ _captcha_token: token })
}))
