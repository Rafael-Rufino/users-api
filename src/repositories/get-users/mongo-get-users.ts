import { IGetUsersRepository } from '../../controllers/get-users/protocols'
import { User } from '../../models/users'

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmial.com',
        password: '123456',
      },
    ]
  }
}
