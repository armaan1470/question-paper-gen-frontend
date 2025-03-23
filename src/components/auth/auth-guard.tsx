// src/components/auth/auth-guard.tsx
import { useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export function AuthGuard() {
  const router = useRouter()
  const token = useAuthStore((state) => state.auth.accessToken)

  useEffect(() => {
    if (!token) {
      router.navigate({ to: '/login' })
    }
  }, [token, router])

  return null // This component only runs an effect
}
