import { Router } from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017/zebra/'
const mongoClient = new MongoClient(url)

export const routerCrud = Router()

async function runOperation(collectionName, operation, data, itemId) {
  try {
    const db = mongoClient.db("zebra")
    const collection = db.collection(collectionName)

    if (operation === 'get') {
      const results = await collection.find().toArray()
      return results
    } else if (operation === 'post') {
      const newObjectId = new ObjectId(data._id)
      data._id = newObjectId
      await collection.insertOne(data)
      return data
    } else if (operation === 'delete') {
      const result = await collection.deleteOne({ _id: new ObjectId(itemId) })
      return { success: true }
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

routerCrud.get('/:collection', async (req, res) => {
  const { collection } = req.params
  try {
    const data = await runOperation(collection, 'get')
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

routerCrud.post('/:collection', async (req, res) => {
  const { collection } = req.params
  const newItem = req.body
  try {
    const data = await runOperation(collection, 'post', newItem)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

routerCrud.delete('/:collection/:id', async (req, res) => {
  const { collection, id } = req.params
  try {
    const data = await runOperation(collection, 'delete', null, id)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})