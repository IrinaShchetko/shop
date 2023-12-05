import Api from '.'
import { GoodsProps } from './types'

class GoodsApi extends Api {
  endpoint = '/category/'
  async fetchGoods(category: string): Promise<GoodsProps[]> {
    const response = await this.api.get<GoodsProps[]>(`${this.endpoint}${category}/`)
    console.log(`${this.endpoint}${category}/`)
    const products = response.data

    products.forEach(item => {
      if (Array.isArray(item.images) && item.images.length > 0) {
        item.images = item.images.map(img => `${import.meta.env.VITE_BASE_URL}${img}`)
      } else if (typeof item.images === 'string') {
        item.images = `${import.meta.env.VITE_BASE_URL}${item.images}`
      }
    })
    return products
  }
}

export default new GoodsApi()
