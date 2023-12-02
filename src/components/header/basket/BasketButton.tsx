import { NavLink } from 'react-router-dom'
import styles from './basket.module.css'
import basketSvg from '../../../assets/header/basket.svg'
import { QuantityInBasketProps } from '../../../shared/api/types'

const BasketButton = ({ totalQuantityInBasket }: QuantityInBasketProps) => {
  return (
    <div className={styles.basketButton}>
      <NavLink to="/basket">
        <button className={styles.basket}>
          <img src={basketSvg} alt="basket" />
          {totalQuantityInBasket > 0 && <span className={styles.quantityIndicator}>{totalQuantityInBasket}</span>}
        </button>
      </NavLink>
    </div>
  )
}

export default BasketButton
