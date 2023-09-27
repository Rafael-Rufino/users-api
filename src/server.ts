import { config } from 'dotenv'

import express from 'express'

import router from './routes/UserRoute'

import { MongoClient } from './database/mongo'

const main = async () => {
  config()
  const app = express()
  app.use(express.json())
  await MongoClient.connect()
  app.use(router)

  const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

main()
