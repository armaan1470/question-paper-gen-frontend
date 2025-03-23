// src/features/teachers/services/teachers-services.ts
import { httpRequest } from '@/utils/httpRequest'
import { ENDPOINTS } from '@/constants/endpoints.constants'
import { Teacher } from '../data/schema'

export const createTeacher = async (teacherData: Partial<Teacher>) => {
    return httpRequest('POST', ENDPOINTS.TEACHERS.CREATE_TEACHER, teacherData)
}

export const editTeacher = async (teacherData: Partial<Teacher>) => {
    return httpRequest('POST', `${ENDPOINTS.TEACHERS.CREATE_TEACHER}/${teacherData.id}`, teacherData)
}
