'use client'
import Link from 'next/link'
import '../globals.css'
import Icon from '../components/Icon'
import { useSession } from 'next-auth/react'

export default function MobileHeader({handleClick}: any) {
	const session = useSession()

	return (
		<header className={`grid-area-header bg-white border-b w-full sticky top-0 z-20 ${session.data ? 'h-16' : 'h-24'}`}>
          <div className="h-14 flex items-center justify-center">
            {session.data && (
              <div className="absolute left-0 ml-4 sm:hidden">
                <Icon username={session.data?.user?.username} icon={session.data?.user?.icon} />
              </div>
            )}
            <h1 className="sm:hidden">Incógnito</h1>
            <h1 className="hidden sm:block">Home</h1>
          </div>
        {!session.data && (
          <div className="sticky w-full h-10 top-16 flex items-center justify-evenly border-t">
            <Link href='/api/auth/signin' className="bg-blue-400 h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm text-white hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all duration-150">Entrar</Link>
            <Link href='/register' className="bg-white h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm hover:bg-zinc-100 hover:opacity-95 transition-all duration-200">Criar Conta</Link>
          </div>
        )}
      </header>
	)
}
