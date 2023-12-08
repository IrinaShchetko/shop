import { Router } from 'express'
import { MongoClient } from 'mongodb'


const url = 'mongodb+srv://irinashetko92:3215eras@cluster0.ty7dnme.mongodb.net/zebra?retryWrites=true&w=majority'
const mongoClient = new MongoClient(url)

export const routerCatalog = Router()
async function runCollection() {
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('catalog')
    const results = await collection.find().toArray()
    return results
  } catch (err) {
    console.log(err)
    throw err
  }
}
routerCatalog.get('/', async (req, res) => {
  try {
    const data = await runCollection()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})
