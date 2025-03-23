// src/stores/authStore.ts
import { AuthState } from '@/types/auth.types'
import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'access_token'
const USER_DATA = 'user_data' // ✅ New key to store user data in cookies

export const useAuthStore = create<AuthState>()((set) => {
  const token = Cookies.get(ACCESS_TOKEN) || ''
  const userData = Cookies.get(USER_DATA) // ✅ Get stored user from cookies
  const user = userData ? JSON.parse(userData) : null

  return {
    auth: {
      user,
      accessToken: token,
      setAccessToken: (accessToken) => {
        Cookies.set(ACCESS_TOKEN, accessToken, { secure: true, sameSite: 'Strict' })
        set((state) => ({
          auth: { ...state.auth, accessToken }, // ✅ Preserve other functions
        }))
      },
      setUser: (user) => {
        if (user) {
          Cookies.set(USER_DATA, JSON.stringify(user), { secure: true, sameSite: 'Strict' }) // ✅ Store user in cookies
        } else {
          Cookies.remove(USER_DATA) // ✅ Remove if logging out
        }
        set((state) => ({
          auth: { ...state.auth, user }, // ✅ Preserve other functions
        }))
      },
      resetAccessToken: () => {
        Cookies.remove(ACCESS_TOKEN)
        set((state) => ({
          auth: { ...state.auth, accessToken: '' }, // ✅ Preserve other functions
        }))
      },
      resetUser: () => {
        Cookies.remove(ACCESS_TOKEN)
        Cookies.remove(USER_DATA)
        set((state) => ({
          auth: { ...state.auth, user: null, accessToken: '' }, // ✅ Preserve other functions
        }))
      },
    },
  }
})


