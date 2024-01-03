import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import back from '../../assets/main/back.svg'
export const BackButton = () => {
  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate(-1)
  }
  //TODO: add styles
  return (
    <button className={styles.backButton} onClick={navigateToHome}>
      <img className={styles.backImg} width={20} height={20} src={back} alt="back arrow" />
      <p>BACK</p>
    </button>
  )
}
