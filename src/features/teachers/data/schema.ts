// src/features/teachers/data/schema.ts
import { z } from 'zod'

// Define the schema for classes assigned to teachers
const classSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

// Define the teacher schema
const teacherSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().optional(),
  email: z.string(),
  classes: z.array(classSchema), // Include assigned classes
  // Keeping these commented so you can enable them later

  // phoneNumber: z.string(),
  // status: z.union([
  //   z.literal('active'),
  //   z.literal('inactive'),
  //   z.literal('invited'),
  //   z.literal('suspended'),
  // ]),
  // role: z.union([
  //   z.literal('superadmin'),
  //   z.literal('admin'),
  //   z.literal('cashier'),
  //   z.literal('manager'),
  // ]),
  // createdAt: z.coerce.date(),
  // updatedAt: z.coerce.date(),
})

export type Teacher = z.infer<typeof teacherSchema>
export const teacherListSchema = z.array(teacherSchema)

