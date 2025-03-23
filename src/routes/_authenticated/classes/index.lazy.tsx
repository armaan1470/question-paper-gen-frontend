// src/routes/_authenticated/classes/index.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import Apps from '@/features/apps'

export const Route = createLazyFileRoute('/_authenticated/classes/')({
  component: Apps,
})
