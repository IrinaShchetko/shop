import Api from '.'
import { CatalogProps } from './types'

class CatalogApi extends Api {
  endpoint = 'catalog/'
  async fetchCatalog(): Promise<CatalogProps[]> {
    const response = await this.api.get<CatalogProps[]>(this.endpoint)
    const products = response.data

    products.forEach(item => {
      item.img = `${import.meta.env.VITE_BASE_URL}${item.img}`
    })

    return products
  }
}

export default new CatalogApi()
