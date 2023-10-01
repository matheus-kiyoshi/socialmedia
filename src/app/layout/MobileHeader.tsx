import Link from 'next/link'
import '../globals.css'
import Icon from '../components/Icon'

export default function MobileHeader() {
	const isLogged = false

	return (
		<header className={`grid-area-header bg-white border-b w-full sticky top-0 z-20 ${isLogged ? 'h-16' : 'h-24'}`}>
          <div className="h-14 flex items-center justify-center">
            {isLogged && (
              <div className="absolute left-0 ml-4 sm:hidden">
                <Icon username='mtyxxx' icon="/favicon.ico" />
              </div>
            )}
            <h1 className="sm:hidden">Incógnito</h1>
            <h1 className="hidden sm:block">Home</h1>
          </div>
        {!isLogged && (
          <div className="sticky w-full h-10 top-16 flex items-center justify-evenly border-t">
            <Link href='/login' className="bg-blue-400 h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm text-white hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all duration-150">Entrar</Link>
            <Link href='/register' className="bg-white h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm hover:bg-zinc-100 hover:opacity-95 transition-all duration-200">Criar Conta</Link>
          </div>
        )}
      </header>
	)
}
