import { User } from '../../models/users'
import { HttpRequest, HttpResponse } from '../protocols'
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from './protocols'

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id
      const body = httpRequest?.body

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
