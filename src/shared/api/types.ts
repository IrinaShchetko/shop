export interface GoodsProps {
    id: number
    vendor_code: string | number
    name: string
    desc: string
    price: number
    img: string
}
export interface CatalogProps {
    id: number
    category: string
    img: string
    goods: GoodsProps[]
}
