import styles from './header.module.css'
import img from '../../assets/header/fone.png'
import contact from '../../assets/header/contact.svg'
import feedback from '../../assets/header/chat.svg'
import favorites from '../../assets/header/favorites.svg'
import account from '../../assets/header/user.svg'
import logo from '../../assets/header/zebra1.svg'
import { Burger } from './burger'
import { useState } from 'react'
import { Search } from '../search'
import { useSearch } from '../../shared/hooks/useSearch'
import BasketButton from './basket/BasketButton'
import { QuantityInBasketProps } from '../../shared/api/types'
import { HeaderButton } from './button'
import { Modal } from '../modal'
import Contacts from '../contacts/Contacts'
//TODO: add styles
export const Header = ({ totalQuantityInBasket }: QuantityInBasketProps) => {
  const [stateOfBurger, setStateOfBurger] = useState(false)
  function handlerClick() {
    setStateOfBurger(!stateOfBurger)
  }
  const { searchValue, handleInput } = useSearch()
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const toggleChatModal = () => {
    setIsChatModalOpen(!isChatModalOpen)
  }
  return (
    <header className="container">
      <div className={styles.wrapper}>
        <img className={styles.siteCover} src={img} alt="website cover in the form of zebra colors" />
        <img src={logo} alt="logo of website" />
      </div>
      <Burger type={'button'} onClick={handlerClick} />
      <Search className={styles.search} type="text" value={searchValue} onChange={handleInput} />
      <a href="tel:+375295575967" className={styles.contact}>
        <img src={contact} alt="contact" />
        +375-29-557-59-67
      </a>
      <button className={styles.feedback} onClick={toggleChatModal}>
        <img src={feedback} alt="feedback" />
      </button>
      <HeaderButton to={'favorites'} className={styles.favorites} imgSrc={favorites} alt={'favorites'}></HeaderButton>
      <BasketButton totalQuantityInBasket={totalQuantityInBasket} />
      <HeaderButton to={'account'} className={styles.account} imgSrc={account} alt={'account'}></HeaderButton>
      {isChatModalOpen && (
        <Modal open={isChatModalOpen} onClose={toggleChatModal}>
          <Contacts />
        </Modal>
      )}
    </header>
  )
}
