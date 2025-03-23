// src/features/teachers/context/teachers-context.tsx
import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Teacher } from '../data/schema'

type TeachersDialogType = 'add' | 'edit' | 'delete'

interface TeachersContextType {
  open: TeachersDialogType | null
  setOpen: (str: TeachersDialogType | null) => void
  currentRow: Teacher | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Teacher | null>>
}

const TeachersContext = React.createContext<TeachersContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TeachersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TeachersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Teacher | null>(null)

  return (
    <TeachersContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </TeachersContext.Provider>
  )
}

export const useTeachers = () => {
  const teachersContext = React.useContext(TeachersContext)
  if (!teachersContext) {
    throw new Error('useTeachers must be used within <TeachersProvider>')
  }
  return teachersContext
}
