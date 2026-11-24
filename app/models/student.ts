import { StudentSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import class_group from '#models/class_group'
import Comment from './comment.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'



export default class Student extends StudentSchema {
    @belongsTo(() => class_group)
    declare class_group: BelongsTo<typeof class_group>

    @hasMany(()=> Comment)
    declare comments : HasMany<typeof Comment>
}
