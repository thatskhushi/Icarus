import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('q_id').primary()
      table.string('question')
      table.string('flow')
      table.string('depended_question')
      table.string('answer_mode')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}