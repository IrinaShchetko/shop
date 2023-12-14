import styles from './header.module.css'
import img from '../../assets/header/fone.png'
import contact from '../../assets/header/contact.svg'
import feedback from '../../assets/header/chat.svg'
import favorites from '../../assets/header/favorites.svg'
import account from '../../assets/header/user.svg'
import logo from '../../assets/header/zebra1.svg'
import { useState } from 'react'
import { Search } from '../search'
import { useSearch } from '../../shared/hooks/useSearch'
import BasketButton from './basket/BasketButton'
import { BasketProps } from '../../shared/api/types'
import { HeaderButton } from './button'
import { Modal } from '../modal'
import { Feedback } from '../feedback'
import { Navigation } from '../navigation'

export const Header = ({ totalQuantityInBasket }: BasketProps) => {
  const { searchValue, handleInput } = useSearch()
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const toggleFeedbackModal = () => {
    setIsFeedbackModalOpen(!isFeedbackModalOpen)
  }
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <img className={styles.siteCover} src={img} alt="website cover in the form of zebra colors" />
          <img className={styles.logo} src={logo} alt="logo of website" />
        </div>
        <div className={styles.navigation}>
          <Navigation />
          <Search className={styles.search} type="text" value={searchValue} onChange={handleInput} />
          <a href="tel:+375295575967" className={styles.contact}>
            <img src={contact} alt="contact" />
            +375-29-557-59-**
          </a>
          <button className={styles.feedback} onClick={toggleFeedbackModal}>
            <img src={feedback} alt="feedback" />
          </button>
          <HeaderButton to={'favorites'} className={styles.favorites} imgSrc={favorites} alt={'favorites'}></HeaderButton>
          <BasketButton className={styles.basket} totalQuantityInBasket={totalQuantityInBasket} />
          <HeaderButton to={'account'} className={styles.account} imgSrc={account} alt={'account'}></HeaderButton>
          {isFeedbackModalOpen && (
            <Modal open={isFeedbackModalOpen} onClose={toggleFeedbackModal}>
              <Feedback />
            </Modal>
          )}
        </div>
      </div>
    </header>
  )
}
