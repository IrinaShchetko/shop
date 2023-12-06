import { SearchProps } from '../../shared/api/types'

export const Search = ({ type, value, onChange, className }: SearchProps) => {
  return <input className={className} type={type} value={value} onChange={onChange} />
}
