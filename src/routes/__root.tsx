// src/routes/__root.tsx
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthContext } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/toaster'
import { AuthGuard } from '@/components/auth/auth-guard'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

type RouterContext = {
  authentication: AuthContext
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

function RootComponent() {
  return (
    <>
      <AuthGuard />
      <Outlet />
      <Toaster />
      {import.meta.env.MODE === 'development' && (
        <>
          {/* <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' /> */}
        </>
      )}
    </>
  )
}
