import styles from './styles.module.css'
export const PaymentDelivery = () => {
  return (
    <div className={styles.payment}>
      <p className={styles.text}>Please fill in the delivery address!</p>
      <button className={styles.delivery}>Next</button>
    </div>
  )
}
