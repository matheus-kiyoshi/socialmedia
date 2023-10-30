'use client'
import ReturnButton from '@/app/components/ReturnButton'
import { Alerts } from '@/app/components/alert/Alert'
import useReportPost from '@/app/components/customHooks/useReportPost'
import BasicModal from '@/app/components/modal/Modal'
import { verifyStrings } from '@/utils/verifyString'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function ComposeRepost() {
  const [modal, setModal] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [text, setText] = useState('')
  const session = useSession()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length <= 256) {
      setText(newText)
    }
  }

  const HandleReport = async () => {
    buttonRef.current?.setAttribute('disabled', 'true')
    const jwt = session.data?.user.accessToken || ''
    if (jwt === '') {
      setAlertText('You must be logged in (if you are logged in, please log out and log in and try again)')
      setModal(true)
      buttonRef.current?.removeAttribute('disabled')
      return
    }
    if (!verifyStrings(text)) {
      setAlertText('Please write something')
      setModal(true)
      buttonRef.current?.removeAttribute('disabled')
      return
    }
    const id = pathname.split('/')[2]
    const response = await useReportPost(id, text, jwt)
    if (response) {
      router.push('/home')
    }
    buttonRef.current?.removeAttribute('disabled')
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {modal && (
        <BasicModal open={modal} handleClick={() => setModal(false)}>
          <Alerts.Error text={alertText} />
        </BasicModal>
      )}
      <div className="absolute top-4 left-4">
        <ReturnButton />
      </div>
      <article className="rounded-lg border p-4 max-w-[440px]">
        <h1 className="text-2xl font-bold ml-6 my-2">Report Post</h1>
        {session.data ? (
          <>
            <div className="w-full py-4 flex flex-col justify-between items-center pt-2">
							<textarea
								rows={5}
								placeholder="What's on your mind?"
								className="ml-2 p-3 mb-3 rounded-sm w-5/6 border-b text-left pr-3 leading-5"
								value={text}
								onChange={handleTextChange}
							/>
							<div className="w-5/6 flex items-center justify-between gap-2">
                <p
                  className={`text-xs pr-2 ${
                    text.length === 256 && 'text-red-600'
                  }`}
                >
                  {text.length}/256
                </p>
                <button
                  className="bg-blue-400 text-white py-1 px-2.5 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed"
                  disabled={text.length < 1}
                  onClick={HandleReport}
                  ref={buttonRef}
                >
                  Report
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>
              Log in to report{' '}
              <Link
                href="/api/auth/signin"
                className="bg-blue-400 text-white py-1 px-2.5 rounded-md ml-2 disabled:bg-blue-200 disabled:cursor-not-allowed"
              >
                Sign in
              </Link>
            </p>
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-400">
                Sign up
              </Link>
            </p>
          </>
        )}
      </article>
    </main>
  )
}
