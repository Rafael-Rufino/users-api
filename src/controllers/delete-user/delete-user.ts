import { User } from '../../models/users'
import { badRequest, ok } from '../helpers'

import { HttpRequest, HttpResponse, IController } from '../protocols'

import { IDeleteUserRepository } from './protocols'

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id

      if (!id) {
        return badRequest('Missing param id')
      }

      const user = await this.deleteUserRepository.deleteUser(id)
      return ok(user)
    } catch (error) {
      return badRequest('Something went wrong')
    }
  }
}
