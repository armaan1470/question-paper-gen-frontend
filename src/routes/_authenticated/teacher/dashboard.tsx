// src/routes/_authenticated/teacher/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/teacher/dashboard')({
  component: Dashboard,
})
