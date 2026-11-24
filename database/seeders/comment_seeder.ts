import Comment from '#models/comment'
import Student from '#models/student'
import Teacher from '#models/teacher'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const student = await Student.findOrFail(2)
    const teacher = await Teacher.findOrFail(2)

    await Comment.createMany([
      {
        content:'Well done',
        studentId:student.id,
        teacherId:teacher.id,

      },

       {
        content:'gg keep up',
        studentId:student.id,
        teacherId:teacher.id,

      },
    ])
  }
}