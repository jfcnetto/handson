'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { getUserProfile } from '@/actions/user'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [firebaseUser, setFirebaseUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        setFirebaseUser(user)
        const profile = await getUserProfile(user.email)
        if (profile) {
          setUserProfile(profile)
        } else {
          // User exists in Firebase but not in our Prisma DB
          await signOut(auth)
          router.push('/login?error=unauthorized')
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  if (loading) {
    return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">Carregando...</div>
  }

  if (!userProfile) {
    return null
  }

  const isRestrictedRoute = pathname.includes('/financas') || pathname.includes('/usuarios')
  if (isRestrictedRoute && userProfile.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full border border-slate-200">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Acesso Restrito</h2>
          <p className="text-slate-600 mb-6">Esta área é restrita a administradores. Seu perfil ({userProfile.role}) não tem permissão para acessar esta página.</p>
          <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition w-full block">
            Voltar para o Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const navItems = [
    { name: 'Leads', href: '/dashboard' },
    ...(userProfile.role === 'ADMIN' ? [
      { name: 'Finanças', href: '/dashboard/financas' },
      { name: 'Usuários', href: '/dashboard/usuarios' }
    ] : [])
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex-shrink-0 flex items-center gap-8">
              <span className="text-2xl font-bold text-slate-800 tracking-tight">Hands <span className="text-blue-600">O</span>N! <span className="text-slate-400 text-lg font-normal ml-2">CRM</span></span>
              
              <nav className="hidden md:flex space-x-4">
                {navItems.map(item => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${pathname === item.href ? 'bg-slate-100 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-700">{userProfile.name || firebaseUser.displayName || firebaseUser.email}</p>
                  <p className="text-xs text-slate-500 font-medium">{userProfile.role === 'ADMIN' ? 'Administrador' : 'Operador'}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold overflow-hidden">
                  {firebaseUser.photoURL ? (
                    <img src={firebaseUser.photoURL} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    (userProfile.name || firebaseUser.email).charAt(0).toUpperCase()
                  )}
                </div>
              </div>
              
              <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-red-600 transition border-l pl-6 border-slate-200">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  )
}
