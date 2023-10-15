import axios from 'axios'

const BASEURL = 'https://incognitosocial.vercel.app/api'

async function handleFetch(username: string, password: string) {
  const response = await axios.post(`${BASEURL}/login`, {
    username,
    password,
  })
  return response.data
}

export default async function useLogin(username: string, password: string) {
  console.log(username, password)
  try {
    const response = await handleFetch(username, password)
    console.log(response)
    if (response.msg === 'Login successful') {
      localStorage.setItem('token', response.token)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('login error:', error)
  }
}
