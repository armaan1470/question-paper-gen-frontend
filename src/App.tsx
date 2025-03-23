// src/App.tsx
import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from './hooks/use-auth'
import { router } from './router'

function App() {
  const authentication = useAuth()

  return <RouterProvider router={router} context={{ authentication }} />
}

export default App
