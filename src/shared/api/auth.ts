const endpoint = 'auth/'

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    const { accessToken, refreshToken } = data
    const statusCode = response.status

    return { accessToken, refreshToken, statusCode }
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    const { accessToken, refreshToken } = data
    console.log(`Refresh token: ${refreshToken}`)
    console.log(`Access token: ${accessToken}`)
    const statusCode = response.status

    return { accessToken, refreshToken, statusCode }
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}
