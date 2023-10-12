import axios from "axios";

const BASEURL = 'https://incognitosocial.vercel.app/api';

async function handleFetch(username: string, password: string) {
	const response = await axios.post(`${BASEURL}/register`, {
		username,
		password
	})
	return response.data
}

export default async function useCreate(username: string, password: string) {
	try {
		const response = await handleFetch(username, password)
		if (response.message == 'User created') {
			return true
		} else {
			return false
		}
		
	} catch (error) {
		console.error('login error:', error);
	}
}