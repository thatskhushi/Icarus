import { DateTime } from 'luxon'
// import hash from '@adonisjs/core/services/hash'
// import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
// import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 as uuidv4 } from 'uuid'
import AuthAccessToken from './auth_access_token.js'
// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

export default class User extends (BaseModel) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare full_name: string | null

  @column()
  declare email: string

  @column()
  declare gender: string

  @column()
  declare mobile: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare DOB: Date

  @column()
  declare address: String

  @column()
  declare zipcode: Number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
  public async generateToken() {
    const token = uuidv4()
    // Store the token in the database or any persistent storage
    await AuthAccessToken.create({ tokenable_id: this.id, hash: token })
    return token
  }
}
