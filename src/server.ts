import { config } from 'dotenv'
import express from 'express'

config()

const app = express()

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('Hes!')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
