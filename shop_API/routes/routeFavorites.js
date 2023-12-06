import { Router } from 'express'
import { MongoClient, ObjectId } from 'mongodb'


const url = 'mongodb://127.0.0.1:27017/zebra/'
const mongoClient = new MongoClient(url)
export const routerFavorites = Router()

async function runFavorites() {
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('favorites')
    const results = await collection.find().toArray()
    return results
  } catch (err) {
    console.log(err)
    throw err
  }
}
routerFavorites.get('/', async (req, res) => {
  try {
    const data = await runFavorites()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

routerFavorites.post('/', async (req, res) => {
  const newItem = req.body
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('favorites')
    const newObjectId = new ObjectId(newItem._id)
    newItem._id = newObjectId
    await collection.insertOne(newItem)
    res.json(newItem)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})
routerFavorites.delete('/:id', async (req, res) => {
  const itemId = req.params.id.slice(1)
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('favorites')
    const result = await collection.deleteOne({ _id: new ObjectId(itemId) })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})
