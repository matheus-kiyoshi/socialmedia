'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useFollow from '../customHooks/useFollow'
import useUnfollow from '../customHooks/useUnfollow'
import axios from 'axios'
import ProfileEdit from './ProfileEdit'

export default function ProfileButton({ username }: { username: string }) {
  const [following, setFollowing] = useState(false)
  const session = useSession()

  useEffect(() => {
    verifyIfIsFollowing()
  }, [])

  const HandleFollow = async () => {
    const jwt = session.data?.user.accessToken || ''
    if (jwt === '') {
      return
    }
    if (!username) {
      return
    }
    if (username === session.data?.user.username) {
      return
    }

    if (!following) {
      setFollowing(true)
      await useFollow(username, jwt)
    } else {
      setFollowing(false)
      await useUnfollow(username, jwt)
    }
  }

  const verifyIfIsFollowing = async () => {
    if (session.data?.user.username === username) {
      return
    }
    await axios
      .get(
        `https://incognitosocial.vercel.app/api/users/${username}/follower`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setFollowing(true)
        }
      })
      .catch((error) => {
        console.log(error)
        setFollowing(false)
      })
  }

  return (
    <>
      {session.data?.user.username === username ? (
        <ProfileEdit />
      ) : (
        <button
          onClick={HandleFollow}
          className={`rounded-3xl py-2 px-6  font-medium text-xl ${
            following
              ? 'bg-white text-blue-400 border-2'
              : 'bg-blue-400 text-white'
          }`}
        >
          {following ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </>
  )
}
