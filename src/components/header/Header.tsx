import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import img from '../../assets/header/fone.png'
import contact from '../../assets/header/contact.svg'
import chat from '../../assets/header/chat.svg'
import favorites from '../../assets/header/favorites.svg'
import user from '../../assets/header/user.svg'
import logo from '../../assets/header/zebra1.svg'
import { Burger } from './burger'
import { useState } from 'react'
import { Search } from '../search'
import { useSearch } from '../../shared/hooks/useSearch'
import BasketButton from './basket/BasketButton'
import { QuantityInBasketProps } from '../../shared/api/types'
//TODO: add styles
export const Header = ({ totalQuantityInBasket }: QuantityInBasketProps) => {
  const [stateOfBurger, setStateOfBurger] = useState(false)
  function handlerClick() {
    setStateOfBurger(!stateOfBurger)
  }
  const { searchValue, handleInput } = useSearch()

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.siteCover} src={img} alt="website cover in the form of zebra colors" />
        <img src={logo} alt="logo of website" />
      </div>
      <Burger type={'button'} onClick={handlerClick} />
      <Search className={styles.search} type="text" value={searchValue} onChange={handleInput} />
      <button className={styles.contact}>
        <img src={contact} alt="" />
      </button>
      <button className={styles.chat}>
        <img src={chat} alt="" />
      </button>
      <NavLink to="/favorites">
        <button className={styles.favorites}>
          <img src={favorites} alt="favorites" />
        </button>
      </NavLink>
      <BasketButton totalQuantityInBasket={totalQuantityInBasket} />
      <NavLink to="/account">
        <button className={styles.user}>
          <img src={user} alt="account" />
        </button>
      </NavLink>
    </header>
  )
}
