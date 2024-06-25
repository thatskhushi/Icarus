import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class QuestionUpdate extends BaseModel {
  @column({ isPrimary: true })
  declare q_id: number

  @column()
  declare question: string

  @column() 
  declare answer_mode: string

  @column()
  declare nextpotion_que: string

  @column()
  declare nextkeyword_que: string
  
  @column()
  declare options: string

  @column()
  declare keywords:number

 @column()
 declare isdisplay:boolean
 
 @column()
 declare ismultipleanswer:boolean


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
