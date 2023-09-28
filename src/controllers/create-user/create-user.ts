import validator from 'validator'
import { User } from '../../models/users'

import { HttpRequest, HttpResponse, IController } from '../protocols'

import { badRequest, created, serverError } from '../helpers'
import { CreateUserParams, ICreateUserRepository } from './protocols'

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]) {
          return badRequest(`Field ${field} is required`)
        }
      }

      if (!httpRequest.body) {
        return badRequest('Please especify body')
      }
      const { firstName, lastName, email, password } = httpRequest.body

      const emailIsValid = validator.isEmail(email)

      if (!emailIsValid) {
        return badRequest('E-mail is invalid')
      }

      const user = await this.createUserRepository.createUser({
        firstName,
        lastName,
        email,
        password,
      })
      return created(user)
    } catch (err) {
      return serverError('Internal server error')
    }
  }
}
