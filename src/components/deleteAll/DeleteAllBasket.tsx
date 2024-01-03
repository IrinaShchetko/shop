import styles from './styles.module.css'
interface DeleteProps {
  onClick: () => void
}
export const DeleteAllBasket = ({ onClick }: DeleteProps) => {
  return (
    <button className={styles.button_delete} onClick={onClick}>
      Delete All
    </button>
  )
}
