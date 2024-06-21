import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('full_name').nullable()
      table.string('mobile',15).unique()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.date('DOB')
      table.string('address')
      table.string('gender')
      table.integer('zipcode')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
   
  }


  async down() {
    this.schema.dropTable(this.tableName)
  }
}



