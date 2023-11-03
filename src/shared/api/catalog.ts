import Api from "."
import { CatalogProps } from './types'

class CatalogApi extends Api {
    endpointCatalog = 'catalog'
    async fetchCatalog(): Promise<CatalogProps[]> {
        const response = await this.api.get<CatalogProps[]>(this.endpointCatalog)
        const products = response.data

        products.forEach((item) => {
            item.img = `${import.meta.env.VITE_BASE_URL}${item.img}`
            //   item.goods.forEach((good) => {
            //     good.img = `http://localhost:5500${good.img}`;
            //   })
        })

        return products
    }
}

export default new CatalogApi()