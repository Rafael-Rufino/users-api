import validator from 'validator'
import { User } from '../../models/users'

import { HttpRequest, HttpResponse, IController } from '../protocols'

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
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          }
        }
      }

      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: 'Please especify body',
        }
      }
      const { firstName, lastName, email, password } = httpRequest.body

      const emailIsValid = validator.isEmail(email)

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: 'E-mail is invalid',
        }
      }

      const user = await this.createUserRepository.createUser({
        firstName,
        lastName,
        email,
        password,
      })

      return {
        statusCode: 201,
        body: user,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      }
    }
  }
}
