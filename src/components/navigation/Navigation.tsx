import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useAppSelector } from '../../shared/hooks/useRedux'
import { RootStore } from '../../redux/store'
import { useState } from 'react'

//TODO: add styles
export const Navigation = () => {
  const navigate = useNavigate()

  const handleNavigation = (category: string) => {
    navigate(category === 'home' ? '/' : `/${category}`)
  }
  const { catalog } = useAppSelector((state: RootStore) => state.catalog)
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className={styles.navigation}>
      <button className={styles.burger} onClick={handleNav}>
        {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      {nav && (
        <ul className={styles.dropdown}>
          <li className={styles.option} onClick={() => handleNavigation('home')}>
            HOME
          </li>
          {catalog.map(categoryItem => (
            <li className={styles.option} key={categoryItem.id} value={categoryItem.category} onClick={() => handleNavigation(categoryItem.category)}>
              {categoryItem.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
