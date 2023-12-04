import { useState } from 'react'
import styles from './burger.module.css'

interface BurgerProps {
  type: 'button'
  className: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export const Burger = ({ type }: BurgerProps) => {
  const [stateOfBurger, setStateOfBurger] = useState(false)
  function handlerClick() {
    setStateOfBurger(!stateOfBurger)
  }

  return (
    <button className={`${styles.burger} ${stateOfBurger ? 'active' : ''}`} aria-label="open menu" onClick={handlerClick} type={type}>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </button>
  )
}
