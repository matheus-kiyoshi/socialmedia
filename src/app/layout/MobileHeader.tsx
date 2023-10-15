'use client'
import Link from 'next/link'
import '../globals.css'
import { useSession } from 'next-auth/react'
import { NoLinkIcon } from '../components/NoLinkIcon'
import { Popover, Typography } from '@mui/material'
import { useState } from 'react'

export default function MobileHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const session = useSession()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const idButton = open ? 'simple-popover' : undefined

  return (
    <header
      className={`grid-area-header bg-white border-b w-full sticky top-0 z-20 ${
        session.data ? 'h-16' : 'h-24'
      }`}
    >
      <div className="h-14 flex items-center justify-center">
        {session.data && (
          <>
            <button
              aria-describedby={idButton}
              type="button"
              onClick={handleClick}
              className="absolute left-0 ml-4 sm:hidden"
            >
              <NoLinkIcon icon={session.data?.user?.icon} />
            </button>
            <Popover
              id={idButton}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography sx={{ p: 2 }}>
                <Link href={'/api/auth/signout'}>
                  <p className="flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                    Sign Out
                  </p>
                </Link>
                <Link href={`/${session.data?.user?.username}`}>
                  <p className="mt-2 flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                    Profile
                  </p>
                </Link>
              </Typography>
            </Popover>
          </>
        )}
        <h1 className="block font-semibold text-xl">
          <Link href={'/home'}>Home</Link>
        </h1>
      </div>
      {!session.data && (
        <div className="sticky w-full h-10 top-16 flex items-center justify-evenly border-t">
          <Link
            href="/api/auth/signin"
            className="bg-blue-400 h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm text-white hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all duration-150"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="bg-white h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm hover:bg-zinc-100 hover:opacity-95 transition-all duration-200"
          >
            Criar Conta
          </Link>
        </div>
      )}
    </header>
  )
}
