import Api from "."
import { GoodsProps } from './types'

class FavoritesApi extends Api {
    endpoint = "/favorites/"

  async fetchFavorites(): Promise<GoodsProps[]> {
    const response = await this.api.get<GoodsProps[]>(this.endpoint)
    console.log(this.endpoint)
    const products = response.data

    products.forEach((item) => {
      if (Array.isArray(item.images) && item.images.length > 0) {
        item.images = `${import.meta.env.VITE_BASE_URL}${item.images[0]}`
      } else if (typeof item.images === "string") {
        item.images = `${import.meta.env.VITE_BASE_URL}${item.images}`
      }
    })
    return products
  }

  async addToFavorites(item: GoodsProps): Promise<void> {
    await this.api.post(this.endpoint, item)
  }

  async removeFromFavorites(itemId: number): Promise<void> {
    await this.api.delete(`${this.endpoint}/${itemId}`)
  }
}

export default new FavoritesApi()