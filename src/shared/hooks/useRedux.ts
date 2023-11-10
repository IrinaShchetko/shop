import { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { RootStore } from '../../redux/store'
import { AnyAction } from 'redux'

export const useAppDispatch = useDispatch<ThunkDispatch<RootStore, void, AnyAction>>
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector
export const useAppStore = useStore<RootStore>