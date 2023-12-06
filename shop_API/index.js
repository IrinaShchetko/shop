import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { router } from './routes/routes.js'
import { MongoClient } from 'mongodb'

const url = "mongodb://127.0.0.1:27017/zebra/"
const mongoClient = new MongoClient(url)

const app = express()
app.use(express.static('assets'))
app.use(cors())
app.use(bodyParser.json())

const connectToDatabase = () => new Promise((resolve, reject) => {
  mongoClient.connect()
    .then(() => {
      console.log("Connected to the database")
      resolve()
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err)
      reject(err)
    })
})

connectToDatabase()
  .then(() => {
    app.use(router)
    const port = process.env.PORT || 5500

    app.listen(port, () => {
      console.log(`Listening on Port: ${port}`)
    })
  })
  .catch((err) => {
    console.error("Error starting the server:", err)
  })
