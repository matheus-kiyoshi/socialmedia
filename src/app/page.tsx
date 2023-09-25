import Link from "next/link"
import './globals.css'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

export default function Home() {
  const isLogged = false
  let activePage = '/'

  return (
    <div className="h-[5000px] grid grid-layout-template">
      <header className={`grid-area-header bg-white border-b w-full sticky top-0 ${isLogged ? 'h-16' : 'h-24'}`}>
          <div className="h-14 flex items-center justify-center">
            {isLogged && (
              <div className="absolute left-0 ml-4">
                <figure className="w-12 h-12 rounded-full border border-black">
                  <img src="favicon.ico" alt="Profile Picture" className="w-full h-full bg-cover"></img>
                </figure>
              </div>
            )}
            <h1>Incógnito</h1>
          </div>
        {!isLogged && (
          <div className="sticky w-full h-10 top-16 flex items-center justify-evenly border-t">
            <Link href='/login' className="bg-blue-400 h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm text-white hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all duration-150">Entrar</Link>
            <Link href='/register' className="bg-white h-5/6 w-5/12 border border-gray-700 rounded-3xl flex justify-center items-center cursor-pointer font-light text-sm hover:bg-zinc-100 hover:opacity-95 transition-all duration-200">Criar Conta</Link>
          </div>
        )}
      </header>
    <main className="grid-area-main">
      <h1>Hello World</h1>
    </main>
    <nav className="grid-area-footer w-full h-16 fixed bottom-0 bg-slate-200 flex justify-around items-center">
      <Link href='/' className={`h-full flex items-center rounded-t-sm ${activePage === '/' && 'border-t-4 border-blue-400'}`}>
        <AiFillHome className="h-8 w-8 cursor-pointer hover:opacity-80 transition-all duration-300" />
      </Link>
      <Link href='/search' className={`h-full flex items-center rounded-t-sm ${activePage === '/search' && 'border-t-4 border-blue-400'}`}>
        <AiOutlineSearch className="h-8 w-8 cursor-pointer hover:opacity-80 transition-all duration-300" />
      </Link>
      <Link href='/profile' className={`h-full flex items-center rounded-t-sm ${activePage === '/profile' && 'border-t-4 border-blue-400'}`}>
        <CgProfile className="h-8 w-8 cursor-pointer hover:opacity-80 transition-all duration-300" />
      </Link>
    </nav>
    </div>
  )
}
