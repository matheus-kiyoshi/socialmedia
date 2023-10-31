import axios from 'axios'

const BASEURL = 'https://incognitosocial.vercel.app/api'

async function handleFetch(username: string, reason: string, token: string) {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(
		`${BASEURL}/users/${username}/report`,
		{ reason },
		config,
	)
	return response.data
}

export default async function useReportUser(username: string, reason: string, token: string) {
  try {
    const response = await handleFetch(username, reason, token)
    if (response.message === 'User reported') {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('report error:', error)
  }
}
