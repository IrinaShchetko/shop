import { useEffect } from "react"
import { CardProduct } from "../../components/cardProduct"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux"
import { RootStore } from "../../context/store"
import { fetchGoodsThunk } from "../../context/goods/thunk"
import styles from './products.module.css'

export const Products = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
      dispatch(fetchGoodsThunk())
    }, [dispatch])
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
 
