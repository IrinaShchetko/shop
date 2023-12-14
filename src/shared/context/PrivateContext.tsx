import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useFavoritesAndBasket } from '../hooks/useFavoritesAndBasket'
import { BasketContextProps } from '../api/types'

const PrivateContext = createContext<BasketContextProps | undefined>(undefined)

export const PrivateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [privateVisibility, setVisibility] = useState(false)
  const { basket } = useFavoritesAndBasket()
  const [basketCount, setBasketCount] = useState(0)

  const updateBasketCount = () => {
    const accessToken = localStorage.getItem('accessToken')
    const updatedTotalCount = basket.reduce((acc, item) => acc + item.count, 0)
    setBasketCount(updatedTotalCount)
    setVisibility(!!accessToken)
  }

  useEffect(() => {
    updateBasketCount()
  }, [basket])

  return <PrivateContext.Provider value={{ basketCount, updateBasketCount, privateVisibility }}>{children}</PrivateContext.Provider>
}

export const usePrivate = () => {
  const context = useContext(PrivateContext)
  if (!context) {
    throw new Error('usePrivate должен использоваться внутри PrivateProvider')
  }
  return context
}
