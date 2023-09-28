import { User } from '../../models/users'

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
        return {
          statusCode: 400,
          body: 'Missing body param',
        }
      }

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing param id',
        }
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
        return {
          statusCode: 400,
          body: 'Some field is not allow to update',
        }
      }

      const user = await this.updateUserRepository.updateUser(id, body)

      return {
        statusCode: 200,
        body: user,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong',
      }
    }
  }
}
