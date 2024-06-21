// interface Option {
//   option: string;
  
// }

import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Questions extends BaseModel {
  @column({ isPrimary: true })
  declare q_id: number

  @column()
  declare question: string

  @column()
  declare flow: string

  @column() 
  declare answer_mode: string

  @column()
  declare depended_question: string

  @column()
  declare sr_no:number

 @column()
 declare option:string
 
 @column()
 declare option_dependent:string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
