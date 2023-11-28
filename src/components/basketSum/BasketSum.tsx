import styles from './styles.module.css'
interface BasketTotalProps {
  total: number
  onButtonClick: () => void
}
export const BasketSum = ({ total, onButtonClick }: BasketTotalProps) => {
  return (
    <div className={styles.total}>
      <span className={styles.sum}>Order Total: {total} BYN </span>
      <button className={styles.payment} onClick={onButtonClick}>
        BUY
      </button>
    </div>
  )
}
