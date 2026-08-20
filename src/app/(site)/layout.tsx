import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import Header from '@/components/Header'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col">
      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white text-slate-600 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="Hands ON! Logo" className="h-20 w-auto object-contain scale-110 origin-left" width={200} height={80} />
            </Link>
            <p className="mt-4 text-sm text-slate-500">
              Modernizamos sistemas legados preservando seus dados e o conhecimento do seu negócio.
            </p>
            <p className="mt-4 text-sm text-slate-500 font-medium">
              Qd. 13 Lote 16 Lj. 01 Setor Leste<br/>
              Gama - DF<br/>
              CEP 72.450-130
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/modernizacao-sistemas-legados" className="hover:text-blue-600 transition-colors">Sistemas Legados</Link></li>
              <li><Link href="/sistema-sem-codigo-fonte" className="hover:text-blue-600 transition-colors">Sem Código-Fonte</Link></li>
              <li><Link href="/excel-para-sistema" className="hover:text-blue-600 transition-colors">Excel para Web</Link></li>
              <li><Link href="/migracao-access" className="hover:text-blue-600 transition-colors">Migração Access</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Soluções & Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/migracao-banco-dados" className="hover:text-blue-600 transition-colors">Bancos de Dados</Link></li>
              <li><Link href="/engenharia-reversa-software" className="hover:text-blue-600 transition-colors">Engenharia Reversa</Link></li>
              <li><Link href="/consultoria-sistemas" className="hover:text-blue-600 transition-colors">Consultoria</Link></li>
              <li><Link href="/sobre" className="hover:text-blue-600 transition-colors">Sobre Nós</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>contato@handson.com.br</li>
              <li>
                <a href="https://wa.me/5561994005941" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  (61) 99400-5941
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Hands On! - Modernização de Sistemas. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/termos-uso" className="hover:text-blue-600 transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-blue-600 transition-colors">Política de Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}