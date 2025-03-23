// src/routes/(auth)/login.tsx
import { createFileRoute } from '@tanstack/react-router'
import LogIn from '@/features/auth/login'

export const Route = createFileRoute('/(auth)/login')({
  component: LogIn,
})
