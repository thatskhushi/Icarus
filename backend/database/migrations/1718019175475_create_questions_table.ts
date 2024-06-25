import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('option');
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}