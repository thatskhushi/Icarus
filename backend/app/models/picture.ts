
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

interface picData {
  pic: string;
  category: string;
}

export default class Picture extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // @column()
  // declare path: String

  @column({
    prepare: (value: picData[]) => JSON.stringify(value), 
    consume: (value: string) => JSON.parse(value) 
  })
  declare path:picData[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}