import axios from 'axios'

const BASEURL = 'https://incognitosocial.vercel.app/api'

async function handleFetch(username: string, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(
    `${BASEURL}/users/${username}/unfollow`,
    config,
  )
  return response.data
}

export default async function useUnfollow(username: string, token: string) {
  try {
    const response = await handleFetch(username, token)
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('post error:', error)
  }
}
