import type { HttpContext } from '@adonisjs/core/http'

export default class TokensController {
  public async token({ request, response }: HttpContext) {
    const { token } = request.only(['token'])
    
    return response.created({ message: 'success'})

  }
}
