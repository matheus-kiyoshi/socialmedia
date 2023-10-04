import axios from "axios";

const BASEURL = 'https://incognitosocial.vercel.app/api';

async function handleFetch(content: string, media: File[], token: string) {
	const formData = new FormData()
	formData.append('content', content)
	media.map((file) => formData.append('media', file))

	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	}

	const response = await axios.post(`${BASEURL}/posts`, formData, config)
	return response.data
}

export default async function useCreatePost(content: string, media: File[], token: string) {
	try {
		const response = await handleFetch(content, media, token)
		if (response) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error('post error:', error);
	}
}