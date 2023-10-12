import axios from "axios";

const BASEURL = 'https://incognitosocial.vercel.app/api';

async function handleFetch(nickname: string, bio: string, icon: File, banner: File, token: string) {
	const formData = new FormData()
	formData.append('nickname', nickname)
	formData.append('bio', bio)
	formData.append('icon', icon)
	formData.append('banner', banner)

	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	}

	const response = await axios.patch(`${BASEURL}/profile`, formData, config)
	return response.data
}

export default async function useEditProfile(nickname: string, bio: string, icon: File, banner: File, token: string) {
	try {
		const response = await handleFetch(nickname, bio, icon, banner, token)
		if (response) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error('edit profile error:', error);
	}
}