'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineRetweet } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import useLike from '../customHooks/useLike'
import { useRouter } from 'next/navigation'
import { Popover, Typography } from '@mui/material'
import Link from 'next/link'
import useRepost from '../customHooks/useRepost'
import useDeleteRepost from '../customHooks/useDeleteRepost'

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
}

export function PostActions({
  comments,
  likes,
  reposts,
  repostsAuthorId,
  id,
}: {
  comments: number
  likes: string[]
  reposts: string[]
  repostsAuthorId: string[]
  id: string
}) {
  const [liked, setLiked] = useState(false)
  const [reposted, setReposted] = useState(false)
  const [likedCount, setLikedCount] = useState(likes.length)
  const [repostedCount, setRepostedCount] = useState(reposts.length)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.data) {
      if (likes.length > 0) {
        if (likes.includes(session.data.user.id)) {
          setLiked(true)
        }
      }
      if (reposts.length > 0) {
        if (repostsAuthorId.includes(session.data.user.id)) {
          setReposted(true)
        }
      }
    }
  }, [])

  const HandleLike = async () => {
    setLiked(!liked)
    setLikedCount(liked ? likedCount - 1 : likedCount + 1)
    const jwt = session.data?.user.accessToken || ''
    if (jwt === '') {
      return
    }
    if (!id) {
      return
    }
    await useLike(id, jwt)
  }

  const HandleRepost = async () => {
    setReposted(!reposted)
    setRepostedCount(reposted ? repostedCount - 1 : repostedCount + 1)
    const jwt = session.data?.user.accessToken || ''
    if (jwt === '') {
      return
    }
    if (!id) {
      return
    }
    const response = await useRepost(id, jwt)
    if (response) {
      router.refresh()
    }
  }

  const HandleDeleteRepost = async () => {
    setReposted(false)
    setRepostedCount(repostedCount - 1)
    const jwt = session.data?.user.accessToken || ''
    if (jwt === '') {
      return
    }
    if (!id) {
      return
    }
    if (!session.data) {
      return
    }
    const response = await useDeleteRepost(id, session.data.user.id, jwt)
    if (response) {
      router.refresh()
    }
  }

  const formatNumber = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M'
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k'
    } else {
      return number.toString()
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const idButton = open ? 'simple-popover' : undefined

  return (
    <div className="flex items-center mt-2 gap-6">
      <Link href={`/compose/${id}/comment`}>
        <p className="flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1 hover:opacity-80">
          <FaRegComment className="h-5 w-5" />
          {formatNumber(comments)}
        </p>
      </Link>
      <button aria-describedby={idButton} type="button" onClick={handleClick}>
        <p
          className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-green-700 ${
            reposted ? 'text-green-700' : 'text-gray-600'
          }`}
        >
          <AiOutlineRetweet className="h-5 w-5" />
          {formatNumber(repostedCount)}
        </p>
      </button>
      <Popover
        id={idButton}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          {reposted ? (
            <>
              <button onClick={HandleDeleteRepost}>
                <p className="flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                  Delete Repost
                </p>
              </button>
            </>
          ) : (
            <>
              <button onClick={HandleRepost}>
                <p className="flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                  Repost
                </p>
              </button>
              <Link href={`/compose/${id}/repost`}>
                <p className="flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                  Repost with content
                </p>
              </Link>
            </>
          )}
        </Typography>
      </Popover>
      <button onClick={HandleLike}>
        <p
          className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-red-600 ${
            liked ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <AiFillHeart className="h-5 w-5" />
          {formatNumber(likedCount)}
        </p>
      </button>
    </div>
  )
}
