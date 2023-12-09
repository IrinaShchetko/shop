import { ChangeEvent } from 'react'

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
  count: number
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
  onBasketClick: () => void
  isFavorite?: boolean
  isInBasket?: boolean
  changeValue: (itemId: string, value: number) => void
  count: number
}
export interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}
export interface SearchProps {
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  className: string
}
export interface ProductImageCarouselProps {
  images: string[]
}
export interface PaginationProps {
  count: number
  page: number
  setPage: (page: number) => void
  currentPage: number
}
