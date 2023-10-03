import axios from "axios";

const BASEURL = 'https://incognitosocial.vercel.app/api';

async function handleFetch(id: string, token: string) {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	}

	const response = await axios.post(`${BASEURL}/posts/${id}/like`, null, config)
	return response.data
}

export default async function useLike(id: string, token: string) {
	try {
		const response = await handleFetch(id, token)
		if (response.status == 200) {
			return true
		} else {
			return false
		}
		
	} catch (error) {
		console.error('post error:', error);
	}
}