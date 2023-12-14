import { BasketSumProps } from '../../shared/api/types'
import styles from './styles.module.css'

export const BasketSum = ({ total, onButtonClick }: BasketSumProps) => {
  return (
    <div className={styles.total}>
      <span className={styles.sum}>Order Total: {total} BYN </span>
      <button className={styles.payment} onClick={onButtonClick}>
        BUY
      </button>
    </div>
  )
}
