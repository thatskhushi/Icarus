import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  
  protected tableName = 'question_updates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('q_id').primary()
      table.string('question')
      table.string('answer_mode')
      table.string('nextpotion_que')
      table.string('nextkeyword_que')
      table.string('options')
      table.string('keywords')
      table.boolean('isdisplay')
      table.boolean('ismultipleanswer')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}