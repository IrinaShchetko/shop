import axios from 'axios'

class Api {
  private readonly BASE_URL = import.meta.env.VITE_BASE_URL
  protected api
  constructor() {
    this.api = axios.create({
      baseURL: this.BASE_URL,
    })
  }
}
export default Api
