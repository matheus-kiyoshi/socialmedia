import axios from 'axios'

const BASEURL = 'https://incognitosocial.vercel.app/api'

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
}

async function getRepost(postId: string, userID: string) {
  const response = await axios.get(`${BASEURL}/posts/${postId}`)
  const post = response.data
  if (post.repostsAuthorId.includes(userID)) {
    const index = post.repostsAuthorId.indexOf(userID)
    const postID = post.reposts[index]
    return postID
  } else {
    return null
  }
}

async function handleFetch(postID: string, token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${BASEURL}/posts/${postID}`, config)
  return response.data
}

export default async function useDeleteRepost(
  postId: string,
  userID: string,
  token: string,
) {
  try {
    const id = await getRepost(postId, userID)
    if (id) {
      const response = await handleFetch(id, token)
      if (response) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error('post error:', error)
  }
}
