// import axios, { AxiosResponse } from 'axios'
// import { AuthResponseProps } from './types'

// export const API_URL = 'http://localhost:5500/auth'

// export const authpi = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// })

// authpi.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//   return config
// })

// export class AuthApi {
//   static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseProps>> {
//     return authpi.post<AuthResponseProps>('/login', { email, password })
//   }
//   static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponseProps>> {
//     return authpi.post<AuthResponseProps>('/registration', { email, password })
//   }
//   static async logout(): Promise<void> {
//     return authpi.post('/logout')
//   }
// }
import axios from 'axios'
import Api from '.'
import { Response } from './types'

class AuthApi extends Api {
  endpoint = '/auth'

  constructor() {
    const API_URL = 'http://localhost:5500'
    super()
    this.api = axios.create({
      withCredentials: true,
      baseURL: API_URL,
    })
  }

  async login(email: string, password: string) {
    console.log('API Login called')
    return (await this.api.post<Response<{ accessToken: string; refreshToken: string }>>(`${this.endpoint}/login`, { email, password })).data
  }

  async registration(email: string, password: string) {
    console.log('API Регистрация called')
    return (await this.api.post<Response<{ accessToken: string; refreshToken: string }>>(`${this.endpoint}/registration`, { email, password })).data
  }

  async logout() {
    return await this.api.post<Response<void>>(`${this.endpoint}/logout`)
  }

  async refresh() {
    return (await this.api.post<Response<{ accessToken: string; refreshToken: string }>>(`${this.endpoint}/refresh`)).data
  }
}

export default new AuthApi()
