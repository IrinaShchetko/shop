import { useEffect } from "react"
import {useParams} from 'react-router-dom'
import { CardProduct } from "../../components/cardProduct"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux"
import { RootStore } from "../../redux/store"
import { fetchGoodsThunk } from "../../redux/goods/thunk"
import styles from './products.module.css'

export const Products = () => {
  const {category} = useParams()
    const dispatch = useAppDispatch()
    useEffect(() => { 
      if (category) {
      dispatch(fetchGoodsThunk(category))
    }
    }, [dispatch, category])
    const { goods , error } = useAppSelector((state: RootStore) => state.goods)
    console.log(error)

    return ( 
        <div className={styles.products}>
        {goods.map(items =>(
            <CardProduct key={items.id} item={items}/>
)
   )}
        
        </div>
     )
}
 
