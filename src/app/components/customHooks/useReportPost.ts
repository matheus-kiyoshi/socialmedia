import axios from 'axios'

const BASEURL = 'https://incognitosocial.vercel.app/api'

async function handleFetch(id: string, reason: string, token: string) {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(
		`${BASEURL}/posts/${id}/report`,
		{ reason },
		config,
	)
	return response.data
}

export default async function useReportPost(id: string, reason: string, token: string) {
  try {
    const response = await handleFetch(id, reason, token)
    if (response.message === 'Post reported') {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('report error:', error)
  }
}
