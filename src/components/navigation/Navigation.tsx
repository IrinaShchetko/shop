import { useLocation, useNavigate } from 'react-router-dom'
import { CatalogProps } from '../../shared/api/types'
import styles from './style.module.css'

interface NavigationProps {
  items: CatalogProps[]
}
//TODO: add styles
export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (category: string) => {
    navigate(category === 'home' ? '/' : `/${category}`)
  }
  //TODO: add styles
  return (
    <form className={styles.dropdown}>
      <select className={styles.select} onChange={event => handleNavigation(event.target.value)} value={location.pathname.substring(1)}>
        <option className={styles.option} value="home">
          HOME
        </option>
        {items.map(categoryItem => (
          <option className={styles.option} key={categoryItem.id} value={categoryItem.category}>
            {categoryItem.category}
          </option>
        ))}
      </select>
    </form>
  )
}
