import axios from 'axios'

const BASEURL = 'https://incognitosocial.vercel.app/api'

async function handleFetch(
  nickname: string,
  bio: string,
  token: string,
  icon?: File,
  banner?: File,
  ) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const formData = new FormData()
  
  if (icon || banner) {
    formData.append('nickname', nickname)
    formData.append('bio', bio)
    if (icon) {
      formData.append('icon', icon)
    }
    if (banner) {
      formData.append('banner', banner)
    }
  } else {
    const payload = {
      nickname,
      bio
    }

    const response = await axios.patch(`${BASEURL}/profile`, payload, config)
    return response.data
  }

  const response = await axios.patch(`${BASEURL}/profile`, formData, config)
  return response.data
}

export default async function useEditProfile(
  nickname: string,
  bio: string,
  token: string,
  icon?: File,
  banner?: File,
) {
  try {
    const response = await handleFetch(nickname, bio, token, icon, banner)
    if (response) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('edit profile error:', error)
  }
}
