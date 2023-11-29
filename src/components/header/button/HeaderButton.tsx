import { NavLink } from 'react-router-dom'
import { HeaderButtonProps } from '../../../shared/api/types'

export const HeaderButton = ({ to, imgSrc, alt, className }: HeaderButtonProps) => {
  return (
    <NavLink to={`/${to}`}>
      <button className={className}>
        <img src={imgSrc} alt={alt} />
      </button>
    </NavLink>
  )
}
