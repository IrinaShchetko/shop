import Api from "."
import { GoodsProps } from './types'

class GoodsApi extends Api {
    endpoint = 'dresses/'
    async fetchGoods(): Promise<GoodsProps[]> {
        const response = await this.api.get<GoodsProps[]>(this.endpoint)
        const products = response.data

        products.forEach((item) => {
            item.img = `${import.meta.env.VITE_BASE_URL}${item.img}`
        })

        return products
    }
}

export default new GoodsApi()