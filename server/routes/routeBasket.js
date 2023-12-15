import { Router } from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import { config } from 'dotenv'

export const routerBasket = Router()
config()
const url = process.env.MONGO_DB
const mongoClient = new MongoClient(url)

async function runBasket() {
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('basket')
    const results = await collection.find().toArray()
    return results
  } catch (err) {
    console.log(err)
    throw err
  }
}

routerBasket.get('/', async (req, res) => {
  try {
    const data = await runBasket()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

routerBasket.post('/', async (req, res) => {
  const newItem = req.body
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('basket')
    const newObjectId = new ObjectId(newItem._id)
    newItem._id = newObjectId
    await collection.insertOne(newItem)
    res.json(newItem)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})
routerBasket.put('/:id', async (req, res) => {
  const itemId = req.params.id
  const updatedItem = req.body

  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('basket')
    const objectId = new ObjectId(itemId)
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { count: updatedItem.count } }
    )
    if (result.modifiedCount === 1) {
      res.json({ success: true })
    } else {
      res.status(404).json({ success: false, message: 'Item not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})
routerBasket.delete('/:id', async (req, res) => {
  const itemId = req.params.id.slice(1)
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('basket')
    const result = await collection.deleteOne({ _id: new ObjectId(itemId) })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

routerBasket.delete('/all', async (req, res) => {
  try {
    const db = mongoClient.db('zebra')
    const collection = db.collection('basket')
    await collection.deleteMany({})
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})