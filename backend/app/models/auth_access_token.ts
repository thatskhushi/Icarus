import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AuthAccessToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tokenable_id:number

  @column()
  declare hash:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}