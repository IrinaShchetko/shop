import { ChangeEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'
import { RootStore } from '../../redux/store'
import { setSearcher } from '../../redux/search/slice'
import { GoodsProps } from '../api/types'
import debounce from 'lodash/debounce'

export const useSearch = () => {
  const searchValue = useAppSelector((state: RootStore) => state.search.searchValue)
  const dispatch = useAppDispatch()
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase()
    handleDebouncedInput(inputValue)
  }
  const handleDebouncedInput = debounce((inputValue: string) => {
    dispatch(setSearcher(inputValue))
    console.log(inputValue)
  }, 20)
  useEffect(() => {
    return () => handleDebouncedInput.cancel()
  }, [handleDebouncedInput])
  const filteredData = (data: GoodsProps[]) => {
    return data.filter(item => item.category.toLowerCase().includes(searchValue) || item.title.toLowerCase().includes(searchValue))
  }
  return {
    searchValue,
    handleInput,
    filteredData,
  }
}
