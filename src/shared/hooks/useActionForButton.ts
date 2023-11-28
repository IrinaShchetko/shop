import { GoodsProps } from '../api/types'
import { useDispatch } from 'react-redux'
//TODO: change types
export const useActionForButton = () => {
  const dispatch = useDispatch()

  const handleActionForButton = (item: GoodsProps, isCurrentlyInList: boolean, addToAction: any, removeFromAction: any) => {
    const itemData = {
      _id: item._id,
      images: item.images,
      title: item.title,
      price: item.price,
      vendor_code: item.vendor_code,
      desc: item.desc,
      category: item.category,
      'fabric structure': item['fabric structure'],
      size: item.size,
      color: item.color,
    }

    if (!isCurrentlyInList) {
      dispatch(addToAction(itemData))
    } else {
      dispatch(removeFromAction(itemData))
    }
  }

  return handleActionForButton
}
