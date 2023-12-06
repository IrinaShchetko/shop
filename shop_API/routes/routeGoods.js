import { Router } from 'express'
import { MongoClient } from 'mongodb'
export const routerGoods = Router()


const url = 'mongodb://127.0.0.1:27017/zebra/'
const mongoClient = new MongoClient(url)
async function runCategory(category) {
    try {
        const db = mongoClient.db('zebra')
        const collection = db.collection('goods')
        const query = category === 'all' ? {} : { category: category }
        const results = await collection.find(query).toArray()
        return results
    } catch (err) {
        console.log(err)
        throw err
    }
}
routerGoods.get('/:category', async (req, res) => {
    const { category } = req.params
    try {
        const data = await runCategory(category)
        res.json(data)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }
})
