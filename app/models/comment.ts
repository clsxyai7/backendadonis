import { CommentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Teacher from './teacher.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Student from './student.ts'

export default class Comment extends CommentSchema {

    @belongsTo(() => Student)
    declare student : BelongsTo<typeof Student>

    @belongsTo(()=>Teacher)
    declare teacher: BelongsTo<typeof Teacher>

    
}