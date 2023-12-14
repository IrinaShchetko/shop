import { ChangeEvent, ReactNode } from 'react'

export interface GoodsProps {
  _id: string
  vendor_code: string | number
  title: string
  desc: string
  price: number
  images: string | string[]
  'washing instructions'?: string
  category: string
  'fabric structure': string
  'fabric density'?: string
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
export interface DescProps {
  product: GoodsProps
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
export interface SavingButtonProps {
  item: GoodsProps
  className: string
  onButtonClick: (itemId: string, isCurrentlySave: boolean, actionType: 'favorites' | 'basket') => void
  isSaving?: boolean
  typeButton: 'favorites' | 'basket'
  children: ReactNode
}
export interface UserProps {
  email?: string
  id?: string
  password?: string
}
export interface AuthResponseProps {
  accessToken: string
  refreshToken: string
  user: UserProps
}
export interface BasketSumProps {
  total: number
  onButtonClick: () => void
}
export interface BasketContextProps {
  basketCountVisibility: boolean
  updateBasketCount: () => void
  basketCount: number
}
