// src/routes/_authenticated/teachers/index.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import Teachers from '@/features/teachers'

export const Route = createLazyFileRoute('/_authenticated/teachers/')({
  component: Teachers,
})
