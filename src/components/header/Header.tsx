import styles from './header.module.css'
import img from '../../assets/header/fone.png'
import contact from '../../assets/header/contact.svg'
import chat from '../../assets/header/chat.svg'
import favorites from '../../assets/header/favorites.svg'
import basket from '../../assets/header/basket.svg'
import user from '../../assets/header/user.svg'
import logo from '../../assets/header/zebra1.svg'
import { Burger } from './burger'
import { useState } from 'react'


export const Header = () => {
    const [stateOfBurger, setStateOfBurger] = useState(false)
    function handlerClick() {
      setStateOfBurger(!stateOfBurger)
    }
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <img className={styles.siteCover} src={img} alt="website cover in the form of zebra colors" />
                <img src={logo} alt="logo of website" />
            </div>
            {/* <button className={styles.burger}></button> */}
            <Burger type={'button'} onClick={handlerClick} ></Burger>
            <input className={styles.search} type="text" placeholder="Search zebra.com"></input>
            <button className={styles.contact}><img src={contact} alt="" /></button>
            <button className={styles.chat}><img src={chat} alt="" /></button>
            <button className={styles.favorites}><img src={favorites} alt="" /></button>
            <button className={styles.basket}><img src={basket} alt="" /></button>
            <button className={styles.user}><img src={user} alt="" /></button>
        </header>
    )
}
