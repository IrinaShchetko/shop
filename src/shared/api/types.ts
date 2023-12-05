export interface GoodsProps {
  _id: string
  vendor_code: string | number
  title: string
  desc: string
  price: number
  images: string | string[]
  category: string
  'fabric structure': string
  size: number[]
  color: string[]
}
export interface CardProductProps {
  item: GoodsProps
  onFavoriteClick: (itemId: number | string, isCurrentlyFavorite: boolean) => void
  onBasketClick: (itemId: number | string, isCurrentlyInBasket: boolean) => void
  isFavorite?: boolean
  isInBasket?: boolean
}
export interface CatalogProps {
  id: number
  category: string
  img: string
  goods: GoodsProps[]
}
export interface QuantityInBasketProps {
  totalQuantityInBasket: number
}
export interface HeaderButtonProps {
  to: string
  imgSrc: string
  alt: string
  className: string
  children?: React.ReactNode
}
export interface CardInBasketProps {
  item: GoodsProps
  image: string
  onFavoriteClick: (itemId: number | string, isCurrentlyFavorite: boolean) => void
  onBasketClick: (itemId: number | string, isCurrentlyInBasket: boolean) => void
  isFavorite?: boolean
  isInBasket?: boolean
  onQuantityChangeMinus: () => void
  onQuantityChangePlus: () => void
  quantity: Record<string, number>
}
export interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface ProductImageCarouselProps {
  images: string[]
}
