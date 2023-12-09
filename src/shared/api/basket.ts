import Api from '.'
import { GoodsProps } from './types'

class BasketApi extends Api {
  endpoint = 'basket/'

  async fetchBasket(): Promise<GoodsProps[]> {
    const response = await this.api.get<GoodsProps[]>(this.endpoint)
    const products = response.data

    products.forEach(item => {
      if (Array.isArray(item.images) && item.images.length > 0) {
        item.images = item.images.map(img => img)
      }
    })
    return products
  }

  async addToBasket(item: GoodsProps): Promise<void> {
    await this.api.post(this.endpoint, item)
  }

  async removeFromBasket(item: GoodsProps): Promise<void> {
    await this.api.delete(`${this.endpoint}:${item._id}`, { data: item })
  }
  async updateBasketItem(item: { _id: string; count: number }): Promise<void> {
    await this.api.put(`${this.endpoint}${item._id}`, { count: item.count })
  }
}
export default new BasketApi()
