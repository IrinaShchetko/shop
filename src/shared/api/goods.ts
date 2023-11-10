import Api from "."
import { GoodsProps } from './types'

class GoodsApi extends Api {
    // endpoint = 'dresses/'
    async fetchGoods(category:string): Promise<GoodsProps[]> {
        const response = await this.api.get<GoodsProps[]>(`${category}/`)
        console.log(response)
        const products = response.data

        products.forEach((item) => {
            item.img = `${import.meta.env.VITE_BASE_URL}${item.img}`
        })

        return products
    }
}

export default new GoodsApi()