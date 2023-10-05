import axios from "axios";

const BASEURL = 'https://incognitosocial.vercel.app/api';

async function handleFetch(content: string, media: File[], id: string, token: string) {
	const formData = new FormData()
	formData.append('content', content)
	media.map((file) => formData.append('media', file))

	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	}

	const response = await axios.post(`${BASEURL}/posts/${id}/comments`, formData, config)
	return response.data
}

export default async function useComment(content: string, media: File[], id: string, token: string) {
	try {
		const response = await handleFetch(content, media, id, token)
		if (response) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error('post error:', error);
	}
}