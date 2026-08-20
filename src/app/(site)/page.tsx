import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-white pt-12 pb-32 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-6">
              Seu sistema ficou antigo. <br className="hidden md:block"/>
              <span className="text-blue-600">Seu negócio não precisa ficar.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Modernizamos sistemas legados, Access, Excel, bancos de dados e aplicações sem código-fonte — preservando seus dados e reconstruindo o conhecimento do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href="https://wa.me/5561994005941" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-sm flex items-center justify-center">
                FALAR COM UM ESPECIALISTA
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500 font-medium">
              Avaliação inicial em aproximadamente 5 minutos.
            </p>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="absolute inset-0 bg-blue-100 transform translate-x-4 translate-y-4 rounded-2xl opacity-50 blur-lg max-w-md mx-auto"></div>
            <img src="/hero.jpg" alt="Equipe analisando arquitetura de software em tela de vidro corporativa" className="relative mx-auto rounded-2xl shadow-2xl border border-slate-200 object-cover w-full max-w-md h-[350px]" />
          </div>
        </div>
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </section>

      {/* BLOCO DE IDENTIFICAÇÃO (DORES) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Sua empresa vive alguma dessas situações?</h2>
            <p className="mt-4 text-lg text-slate-600">Identifique se o seu negócio está em risco tecnológico.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Sistema Antigo', desc: '"Temos um sistema importante que ninguém quer mexer."' },
              { title: 'Sem Código-Fonte', desc: '"O sistema funciona, mas perdemos ou não possuímos o código."' },
              { title: 'Excel virou sistema', desc: '"Nosso negócio depende de várias planilhas e o controle foi perdido."' },
              { title: 'Access Limite', desc: '"Temos um banco em Access que cresceu demais e trava frequentemente."' },
              { title: 'Tecnologia Obsoleta', desc: '"O sistema utiliza uma tecnologia que quase ninguém mais mantém."' },
              { title: 'Funcionário-Chave', desc: '"Só uma ou duas pessoas sabem como tudo funciona por aqui."' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center flex flex-col items-center">
            <Link href="/diagnostico" className="inline-flex items-center text-blue-600 font-bold text-lg hover:text-blue-800 transition-colors">
              Descubra o risco do seu sistema 
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Nossos Serviços</h2>
            <p className="mt-4 text-lg text-slate-600">Soluções completas para a evolução digital do seu negócio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Modernização de Sistemas Legados', link: '/modernizacao-sistemas-legados', desc: 'Refatoração, reengenharia, reconstrução e migração progressiva de aplicações críticas.' },
              { title: 'Engenharia Reversa', link: '/engenharia-reversa-software', desc: 'Reconstrução de sistemas mesmo quando o código-fonte original não está disponível, analisando dados e telas.' },
              { title: 'Excel → Software', link: '/excel-para-sistema', desc: 'Transformação de processos arriscados baseados em planilhas para aplicações web modernas, seguras e auditáveis.' },
              { title: 'Migração de Dados', link: '/migracao-banco-dados', desc: 'Extração, transformação, limpeza, validação e migração de bases históricas legadas para novos bancos de dados.' }
            ].map((svc, idx) => (
              <div key={idx} className="flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{svc.title}</h3>
                <p className="text-slate-600 flex-grow mb-4">{svc.desc}</p>
                <Link href={svc.link} className="text-blue-600 font-semibold hover:underline">Saber mais &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAL COM IMAGEM */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold sm:text-4xl mb-6 text-white">Não começamos programando.</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Primeiro entendemos o que não pode ser perdido. Recuperamos o conhecimento tecnológico da sua empresa, auditamos o código (ou a falta dele) e criamos um plano seguro antes de escrever a primeira linha do novo software.
            </p>
            
            <div className="flex flex-col items-start space-y-6 text-lg font-bold tracking-wide text-slate-300">
              <div className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-slate-800 text-green-400 flex items-center justify-center text-sm">1</span> DESCOBRIR</div>
              <div className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-slate-800 text-green-400 flex items-center justify-center text-sm">2</span> DOCUMENTAR</div>
              <div className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-slate-800 text-green-400 flex items-center justify-center text-sm">3</span> VALIDAR</div>
              <div className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">4</span> <span className="text-blue-400">MODERNIZAR</span></div>
              <div className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-slate-800 text-green-400 flex items-center justify-center text-sm">5</span> MIGRAR E EVOLUIR</div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute inset-0 bg-blue-500 transform -translate-x-4 -translate-y-4 rounded-2xl opacity-20 blur-xl"></div>
             <img src="/modernization.jpg" alt="Transformando processos antigos em software moderno" className="relative rounded-2xl shadow-2xl border border-slate-800 object-cover w-full" />
          </div>
        </div>
      </section>
    </div>
  )
}
