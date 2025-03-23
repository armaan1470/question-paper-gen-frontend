// src/features/teachers/index.tsx
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '@/utils/httpRequest'
import { ENDPOINTS } from '@/constants/endpoints.constants'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/teachers-columns'
import { TeachersDialogs } from './components/teachers-dialogs'
import { TeachersPrimaryButtons } from './components/teachers-primary-buttons'
import { TeachersTable } from './components/teachers-table'
import TeachersProvider from './context/teachers-context'
import { teacherListSchema } from './data/schema'

export default function Teachers() {
  const fetchTeachers = async () => {
    const response = await httpRequest(
      'GET',
      ENDPOINTS.TEACHERS.GET_ALL_TEACHERS
    )
    return teacherListSchema.parse(response) // Validate with schema
  }

  const { data: teachers, isLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: fetchTeachers,
  })

  if (!isLoading) {
    console.log('teachers list: ', teachers)
  }

  return (
    <TeachersProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Teacher List</h2>
            <p className='text-muted-foreground'>
              Manage your teachers and their roles here.
            </p>
          </div>
          <TeachersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <TeachersTable data={teachers || []} columns={columns} />
        </div>
      </Main>

      <TeachersDialogs />
    </TeachersProvider>
  )
}
