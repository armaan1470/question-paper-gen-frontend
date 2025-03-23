// src/routes/_authenticated/admin/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/admin/dashboard')({
  component: Dashboard,
})
