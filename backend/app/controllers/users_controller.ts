import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import Hash from '@adonisjs/core/services/Hash'
import { OAuth2Client } from 'google-auth-library'
import env from '#start/env'
import { messages } from '@vinejs/vine/defaults'

const client = new OAuth2Client(env.get('GOOGLE_CLIENT_ID'))

export default class UsersController {
  public async register({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'name',
        'mobile',
        'gender',
        'mail',
        'dob',
        'address',
        'pincode',
        'password',
      ])

      data.password = await Hash.make(data.password)

      const user = await User.create({
        full_name: data.name,
        mobile: data.mobile,
        email: data.mail,
        password: data.password,
        DOB: data.dob,
        zipcode: data.pincode,
        address: data.address,
        gender: data.gender,
      })

      return response.created({ message: 'success' })
    } catch (e) {
      return response.created({ messages: 'failed',error:e })
    }
  }

  public async login({ request, response }: HttpContext) {
    const data = request.only(['mail', 'password'])

    try {
      const user = await User.query().where('email', data.mail).first()
      console.log(user)

      if (!user) {
        return response.status(400).send({ error: 'Invalid credentials' })
      }

      const isPasswordValid = await Hash.verify(user.password, data.password)

      if (isPasswordValid) {
        const token = await User.accessTokens.create(user)

        return {
          message: 'success',
          type: 'bearer',
          value: token.value!.release(),
          id: user.id,
        }
      } else {
        return response.send({ message: 'wrong' })
      }
    } catch (error) {
      console.error('Error during Login:', error)
      return response.status(500).send({ error: 'failed' })
    }
  }

  public async googleLogin({ request, response }: HttpContext) {
    const { tokenId } = request.only(['tokenId'])
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: env.get('GOOGLE_CLIENT_ID'),
    })

    const payload = ticket.getPayload()
    if (!payload) {
      return response.status(401).json({ message: 'Invalid Google token' })
    }

    let user = await User.query().where('email', payload.email).first()
    if (!user) {
      user = await User.create({
        email: payload.email,
        full_name: payload.name,
        password: '',
      })
    }

    const token = await user.generateToken()
    return response.json({ message: 'success', value: token, id: user.id })
  }
}
