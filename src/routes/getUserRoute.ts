import { Router } from 'express'
import { GetUsersController } from '../controllers/get-users/get-users'
import { MongoGetUsersRepository } from '../repositories/get-users/mongo-get-users'

const router = Router()

router.get('/users', (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository()

  const getUsersController = new GetUsersController(mongoGetUsersRepository)

  const response = getUsersController.handle().then((response) => {
    res.status(response.statusCode).json(response.body)
  })

  return response
})

export default router
