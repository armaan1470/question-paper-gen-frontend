import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useTeachers } from '../context/teachers-context'

export function TeachersPrimaryButtons() {
  const { setOpen } = useTeachers()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Teacher</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
