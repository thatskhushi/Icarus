interface QAData {
  qId:number;
  question: string;
  answer: string;
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({
    prepare: (value: QAData[]) => JSON.stringify(value), 
    consume: (value: string) => JSON.parse(value) 
  })
  declare qa:QAData[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
}