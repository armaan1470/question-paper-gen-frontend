// src/features/teachers/components/teachers-dialogs.tsx
import { useTeachers } from '../context/teachers-context'
import { TeachersActionDialog } from './teachers-action-dialog'
import { TeachersDeleteDialog } from './teachers-delete-dialog'

export function TeachersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTeachers()

  return (
    <>
      {/* Add Teacher Dialog */}
      <TeachersActionDialog
        key='teacher-add'
        open={open === 'add'}
        onOpenChange={() => setOpen(null)} // Close dialog properly
      />

      {/* Edit & Delete Teacher Dialogs */}
      {currentRow && (
        <>
          <TeachersActionDialog
            key={`teacher-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen(null)
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />

          <TeachersDeleteDialog
            key={`teacher-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen(null)
              setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
