'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Hands ON! Logo" className="h-16 md:h-20 w-auto object-contain scale-110 md:scale-125 origin-left" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Início</Link>
            
            <div className="relative group py-2">
              <button className="text-slate-600 group-hover:text-blue-600 font-medium text-sm transition-colors flex items-center gap-1">
                Serviços
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/modernizacao-sistemas-legados" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Sistemas Legados</Link>
                  <Link href="/sistema-sem-codigo-fonte" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Sem Código-Fonte</Link>
                  <Link href="/excel-para-sistema" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Excel para Web</Link>
                  <Link href="/migracao-access" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">Migração Access</Link>
                </div>
              </div>
            </div>

            <Link href="/engenharia-reversa-software" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Engenharia Reversa</Link>
            <Link href="/contato" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Contato</Link>
            <Link href="/sobre" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Sobre Nós</Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Link href="/diagnostico" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm">
              ANALISAR MEU SISTEMA
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
            
            <div>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              >
                Serviços
                <svg className={`w-4 h-4 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isServicesOpen && (
                <div className="pl-6 space-y-1 mt-1">
                  <Link href="/modernizacao-sistemas-legados" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Sistemas Legados</Link>
                  <Link href="/sistema-sem-codigo-fonte" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Sem Código-Fonte</Link>
                  <Link href="/excel-para-sistema" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Excel para Web</Link>
                  <Link href="/migracao-access" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Migração Access</Link>
                </div>
              )}
            </div>

            <Link href="/engenharia-reversa-software" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Engenharia Reversa</Link>
            <Link href="/contato" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            <Link href="/sobre" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Sobre Nós</Link>
            
            <div className="mt-4 pt-4 border-t border-slate-200">
              <Link href="/diagnostico" className="block w-full text-center px-4 py-3 rounded-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700" onClick={() => setIsMobileMenuOpen(false)}>
                ANALISAR MEU SISTEMA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
