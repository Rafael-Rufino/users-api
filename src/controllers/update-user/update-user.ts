import { User } from '../../models/users'
import { badRequest, ok, serverError } from '../helpers'

import { HttpRequest, HttpResponse, IController } from '../protocols'

import { IUpdateUserRepository, UpdateUserParams } from './protocols'

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id
      const body = httpRequest?.body

      if (!body) {
        return badRequest('Missing body param')
      }

      if (!id) {
        return badRequest('Missing param id')
      }

      const allowedFiledsToUpdate: (keyof UpdateUserParams)[] = [
        'firstName',
        'lastName',
        'password',
      ]

      const someFieldIsNotAllowToUpdate = Object.keys(body).some(
        (key) => !allowedFiledsToUpdate.includes(key as keyof UpdateUserParams)
      )

      if (someFieldIsNotAllowToUpdate) {
        return badRequest('Some field is not allow to update')
      }

      const user = await this.updateUserRepository.updateUser(id, body)
      return ok(user)
    } catch (error) {
      return serverError('Something went wrong')
    }
  }
}
