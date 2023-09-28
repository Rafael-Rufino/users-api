import { User } from '../../models/users'
import { ok, serverError } from '../helpers'
import { HttpResponse, IController } from '../protocols'
import { IGetUsersRepository } from './protocols'

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository
  }
  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers()
      return ok(users)
    } catch (error) {
      return serverError()
    }
  }
}
