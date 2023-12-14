import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useFavoritesAndBasket } from '../../shared/hooks/useFavoritesAndBasket'
import { BasketContextProps } from '../api/types'

const BasketContext = createContext<BasketContextProps | undefined>(undefined)

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [basketCountVisibility, setBasketCountVisibility] = useState(false)
  const { basket } = useFavoritesAndBasket()
  const [basketCount, setBasketCount] = useState(0)

  const updateBasketCount = () => {
    const accessToken = localStorage.getItem('accessToken')
    const updatedTotalCount = basket.reduce((acc, item) => acc + item.count, 0)
    setBasketCount(updatedTotalCount)
    setBasketCountVisibility(!!accessToken)
  }

  useEffect(() => {
    updateBasketCount()
  }, [basket])

  return <BasketContext.Provider value={{ basketCount, updateBasketCount, basketCountVisibility }}>{children}</BasketContext.Provider>
}

export const useBasket = () => {
  const context = useContext(BasketContext)
  if (!context) {
    throw new Error('useBasket должен использоваться внутри BasketProvider')
  }
  return context
}
