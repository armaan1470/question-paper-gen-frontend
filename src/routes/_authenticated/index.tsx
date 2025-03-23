// src/routes/_authenticated/index.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { ROLES } from '@/constants/roles.constants'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/')({
  beforeLoad: async ({ context }) => {
    const { authentication } = context

    // If not authenticated, redirect to login
    if (!authentication.isAuthenticated()) {
      throw redirect({
        to: '/login',
      })
    }

    // If authenticated, redirect based on role
    if (authentication.authStore.user?.roles.includes(ROLES.ADMIN)) {
      throw redirect({
        to: '/admin/dashboard',
      })
    }

    if (authentication.authStore.user?.roles.includes(ROLES.TEACHER)) {
      throw redirect({
        to: '/teacher/dashboard',
      })
    }
  },
  component: Dashboard,
})
