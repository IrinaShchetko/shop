import { SavingButtonProps } from '../../shared/api/types'

export const ButtonFavAndBasket = ({ item, className, onButtonClick, isSaving = false, typeButton, children }: SavingButtonProps) => {
  const handleClick = () => {
    onButtonClick(item._id.toString(), !isSaving, typeButton)
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  )
}
