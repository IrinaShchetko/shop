import Api from '.'
import { GoodsProps } from './types'

class FavoritesApi extends Api {
  endpoint = 'favorites/'

  async fetchFavorites(): Promise<GoodsProps[]> {
    const response = await this.api.get<GoodsProps[]>(this.endpoint)
    const products = response.data

    products.forEach(item => {
      if (Array.isArray(item.images) && item.images.length > 0) {
        const imageUrl = new URL(item.images[0], import.meta.env.VITE_BASE_URL)
        item.images = imageUrl.href
      } else if (typeof item.images === 'string') {
        const imageUrl = new URL(item.images, import.meta.env.VITE_BASE_URL)
        item.images = imageUrl.href
      }
    })
    return products
  }

  async addToFavorites(item: GoodsProps): Promise<void> {
    await this.api.post(this.endpoint, item)
  }

  async removeFromFavorites(item: GoodsProps): Promise<void> {
    await this.api.delete(`${this.endpoint}:${item._id}`, { data: item })
  }
}
export default new FavoritesApi()
