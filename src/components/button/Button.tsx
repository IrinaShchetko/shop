import { useEffect, useState, ReactNode } from 'react'
import { GoodsProps } from '../../shared/api/types'

interface ButtonProps {
  item: GoodsProps
  className: string
  onButtonClick: (
    itemId: string,
    isCurrentlySave: boolean,
    actionType: 'favorites' | 'basket',
  ) => void
  isSaving?: boolean
  typeButton: 'favorites' | 'basket'
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  item,
  className,
  onButtonClick,
  isSaving = false,
  typeButton,
  children,
}) => {
  const [localIsSave, setLocalIsSave] = useState(isSaving)

  useEffect(() => {
    setLocalIsSave(isSaving)
  }, [isSaving])

  function handleClick() {
    setLocalIsSave(!localIsSave)
    onButtonClick(item._id.toString(), !localIsSave, typeButton)
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  )
}
