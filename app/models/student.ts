import { StudentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import class_group from '#models/class_group'

export default class Student extends StudentSchema {
    @belongsTo(() => class_group)
    declare class_group: BelongsTo<typeof class_group>
}