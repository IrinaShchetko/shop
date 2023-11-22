import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'
import { RootStore } from '../../redux/store'
import { setSearcher } from '../../redux/search/slice'

export const useSearch = () => {
  const searchValue = useAppSelector(
    (state: RootStore) => state.search.searchValue,
  )
  const dispatch = useAppDispatch()
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase()
    dispatch(setSearcher(inputValue))
  }
  return {
    searchValue,
    handleInput,
  }
}
