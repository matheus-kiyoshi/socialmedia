import axios from "axios";

const BASEURL = 'https://incognitosocial.vercel.app/api';

async function handleFetch(id:string, token: string, content?: string, media?: File[]) {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	}

	if (content && media) {
		const formData = new FormData()
		formData.append('content', content)
		media.map((file) => formData.append('media', file))
	
		const response = await axios.post(`${BASEURL}/posts/${id}/repost`, formData, config)
		return response.data
	}
	if (content && !media) {
		const formData = new FormData()
		formData.append('content', content)

		const response = await axios.post(`${BASEURL}/posts/${id}/repost`, formData, config)
		return response.data
	}
	if (!content && media) {
		const formData = new FormData()
		media.map((file) => formData.append('media', file))
		
		const response = await axios.post(`${BASEURL}/posts/${id}/repost`, formData, config)
		return response.data
	}

	const response = await axios.post(`${BASEURL}/posts/${id}/repost`, null, config)
	

	return response.data
}

export default async function useRepost(id:string, token: string, content?: string, media?: File[]) {
	try {
		const response = await handleFetch(id, token, content, media)
		if (response) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error('post error:', error);
	}
}