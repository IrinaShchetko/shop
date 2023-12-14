import { NavLink } from 'react-router-dom'
import styles from './basket.module.css'
import basketSvg from '../../../assets/header/basket.svg'
import { BasketProps } from '../../../shared/api/types'

const BasketButton = ({ totalQuantityInBasket, className }: BasketProps) => {
  return (
    <div className={className}>
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
