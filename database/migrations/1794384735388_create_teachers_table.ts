import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'teachers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('firstname').notNullable()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .unique().nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}