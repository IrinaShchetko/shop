import { AuthForm } from '../../components/authForm'
// import styles from './auth.module.css'
//TODO: add styles
export const Authorization = () => {
  // const dispatch = useAppDispatch()
  // const navigation = useNavigate()
  // const location = useLocation()
  // const from = location.state?.from || '/'

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const formData = new FormData(event.currentTarget)
  //   const login = formData.get('login')?.toString()
  //   const password = formData.get('password')?.toString()
  //   if (login && password) {
  //     dispatch(loginThunk({ login, password }))
  //     navigation('/')
  //   }
  // }
  return <AuthForm />
}
