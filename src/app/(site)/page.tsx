import Image from 'next/image'
import Link from 'next/link'
import DiagnosticoForm from '@/components/DiagnosticoForm'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-white pb-32 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-start gap-12 pt-4">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight sm:text-6xl mb-6">
              Seu sistema ficou antigo. <br className="hidden md:block"/>
              <span className="text-blue-600">Seu negócio não precisa ficar.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Modernizamos sistemas legados, Access, Excel, bancos de dados e aplicações sem código-fonte — preservando seus dados e reconstruindo o conhecimento do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/diagnostico" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-md flex items-center justify-center">
                ANALISAR MEU SISTEMA GRATUITAMENTE
              </Link>
              <a href="https://wa.me/5561992809250" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-md flex items-center justify-center gap-2 uppercase">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                FALAR COM ESPECIALISTA
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-2 text-slate-600 font-medium text-sm text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Avaliação em aproximadamente 5 minutos
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Identifique riscos e complexidade
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Receba uma análise preliminar
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative w-full flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-blue-100 transform translate-x-4 translate-y-4 rounded-2xl opacity-50 blur-lg max-w-2xl w-full"></div>
            <Image src="/hero.jpg" alt="Equipe analisando arquitetura de software em tela de vidro corporativa" className="relative w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 object-cover aspect-[4/3]" width={1200} height={900} />
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
              { title: 'Sistema de Terceiros Antigo', desc: '"Temos um software comercial ou ERP antigo com anos de dados, integrações e processos ao redor dele."' },
              { title: 'Funcionário-Chave', desc: '"Só uma ou duas pessoas sabem como tudo funciona por aqui."' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <DiagnosticoForm />
          </div>
        </div>
      </section>

      {/* LEGACY ASSESSMENT */}
      <section className="py-24 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl text-white">Antes de modernizar, descubra o que realmente existe.</h2>
            <p className="mt-4 text-xl text-slate-300 font-light">Hands On! Legacy Assessment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">Nós investigamos</h3>
              <div className="flex flex-wrap gap-3 font-semibold text-slate-300">
                <span className="bg-slate-700 px-4 py-2 rounded-lg">Código-fonte</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Banco de dados</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Telas</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Integrações</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Documentação</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Planilhas</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Regras</span>
                <span className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> Pessoas</span>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-2xl shadow-xl shadow-blue-900/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                Você recebe
              </h3>
              <div className="text-xl font-medium mb-4 text-blue-100">Legacy Blueprint</div>
              <ul className="space-y-3 text-white">
                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> arquitetura atual</li>
                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> inventário tecnológico</li>
                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> mapa dos dados e regras de negócio</li>
                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> dependências e riscos</li>
                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> estratégia recomendada e plano de migração</li>
                <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> arquitetura futura, roadmap e estimativa</li>
              </ul>
            </div>
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

            <div className="mt-12 bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Engenharia reversa assistida por IA
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Cruzamos evidências de código, banco de dados, telas, planilhas, documentos e conhecimento dos usuários para acelerar a descoberta das regras do sistema. Toda regra crítica é validada por especialistas antes de entrar no projeto.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute inset-0 bg-blue-500 transform -translate-x-4 -translate-y-4 rounded-2xl opacity-20 blur-xl"></div>
             <Image src="/modernization.jpg" alt="Transformando processos antigos em software moderno" className="relative rounded-2xl shadow-2xl border border-slate-800 object-cover w-full" width={1200} height={800} />
          </div>
        </div>
      </section>
      {/* PORTFOLIO: EXPERIÊNCIA EM AMBIENTES CRÍTICOS */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl text-slate-900">Experiência em Ambientes Críticos</h2>
            <p className="mt-4 text-lg text-slate-600">Experiência que veio antes da tecnologia de hoje. Mais de 20 anos lidando com sistemas corporativos pesados.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Financeiro', title: 'Sistema Crítico Financeiro', prob: 'Integrações e regras complexas de longa data.', act: 'Análise técnica profunda, mapeamento de requisitos e planejamento de evolução.', res: 'Modernização estruturada sem ruptura operacional.' },
              { label: 'Governo', title: 'Plataforma de Alta Complexidade', prob: 'Processos governamentais e integrações institucionais rígidas.', act: 'Análise de conformidade, segurança e reengenharia de fluxo de dados.', res: 'Operação digital otimizada e auditável para milhões de requisições.' },
              { label: 'Seguros', title: 'Core de Seguros Legado', prob: 'Lógicas de cálculo atuariais presas em tecnologia antiga e sem documentação.', act: 'Engenharia reversa assistida para extração de regras matemáticas complexas.', res: 'Novas APIs desenvolvidas espelhando exatamente o comportamento histórico aprovado.' },
              { label: 'Dados', title: 'Migração de Dados Massiva', prob: 'Milhões de registros fragmentados entre DBFs, planilhas e Access.', act: 'ETL completo com validação matemática rigorosa.', res: 'Única fonte da verdade corporativa estruturada em banco relacional moderno em nuvem.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{item.label}</div>
                <h3 className="text-xl font-bold mb-5 text-slate-900">{item.title}</h3>
                <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                  <p><strong className="text-slate-900">Desafio:</strong> {item.prob}</p>
                  <p><strong className="text-slate-900">Atuação:</strong> {item.act}</p>
                  <p><strong className="text-slate-900">Resultado:</strong> {item.res}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO: HANDS ON LABS */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Engenharia Que Você Pode Ver</h2>
            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Não apenas recomendamos tecnologia. Construímos. <strong className="text-slate-900">Hands On! Labs</strong> é nosso espaço de experimentação em IA, SaaS, automação e arquiteturas modernas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Talhão Digital */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col">
              <div className="h-72 bg-slate-50 relative overflow-hidden flex items-center justify-center p-8 border-b border-slate-200">
                <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col relative z-20 group-hover:scale-105 transition-transform duration-700 ease-out border border-slate-200">
                  <div className="h-8 bg-slate-100 flex items-center px-4 gap-2 shrink-0 border-b border-slate-200">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="relative flex-grow bg-slate-50">
                    <Image src="/TalhaoDigital.png" alt="Talhão Digital" fill className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full uppercase tracking-widest">Agritech</span>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-widest">Sistema Web</span>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-widest">Transformação Digital</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">Talhão Digital</h3>
                <p className="text-slate-500 text-sm mb-6 flex-grow font-semibold">Tecnologia aplicada à gestão rural</p>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p><strong className="text-slate-900">Desafio:</strong> Digitalizar processos da operação rural e transformar informações dispersas em uma plataforma centralizada para acompanhamento e tomada de decisão.</p>
                  <p><strong className="text-slate-900">Solução:</strong> Desenvolvimento do Talhão Digital, uma aplicação que estrutura informações da propriedade e da operação agrícola em uma experiência digital centralizada.</p>
                  <p><strong className="text-slate-900">Funcionalidades:</strong> Calculadoras agrícolas e ferramentas de tomada de decisão no campo para agrônomos, técnicos e produtores.</p>
                  <p><strong className="text-slate-900">Engenharia:</strong> Aplicação Web • Banco de Dados • Regras de Negócio • Gestão por Talhão • Dashboards • Automação</p>
                  <p><strong className="text-slate-900">Tecnologias:</strong> Desenvolvido com Next.js 14, TypeScript, Tailwind CSS, Clerk, Drizzle ORM e Neon Postgres.</p>
                </div>
              </div>
            </div>

            {/* Minha Chance de Visto */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col">
              <div className="h-72 bg-slate-50 relative overflow-hidden flex items-center justify-center p-8 border-b border-slate-200">
                <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col relative z-20 group-hover:scale-105 transition-transform duration-700 ease-out border border-slate-200">
                  <div className="h-8 bg-slate-100 flex items-center px-4 gap-2 shrink-0 border-b border-slate-200">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="relative flex-grow bg-slate-50">
                    <Image src="/MinhaChancedeVisto.png" alt="Minha Chance de Visto" fill className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-widest">Produto Digital</span>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-700 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-widest">Automação</span>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-widest">Análise de Dados</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900 group-hover:text-blue-600 transition-colors">Minha Chance de Visto</h3>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p><strong className="text-slate-900">Objetivo:</strong> Minha Chance de Visto é um portal utilitário focado em brasileiros interessados em viajar ou imigrar para os Estados Unidos.</p>
                  <p><strong className="text-slate-900">Desafio:</strong> Transformar um processo complexo de avaliação de perfil em uma experiência digital simples e orientada ao usuário.</p>
                  <p><strong className="text-slate-900">Solução:</strong> Desenvolvimento de uma aplicação web que coleta informações através de um fluxo estruturado, processa critérios de avaliação e apresenta ao usuário uma análise personalizada.</p>
                  <p><strong className="text-slate-900">Engenharia:</strong> Motor de regras • Scoring • Formulários dinâmicos • Jornada personalizada • Automação • Arquitetura web</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ChatFluent */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col p-8">
              <div className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden mb-6">
                 <Image src="/ChatFluent.png" alt="ChatFluent" fill className="object-cover object-left-top group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest">Produto Digital</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">ChatFluent</h3>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  <p>O <strong>ChatFluent</strong> é uma plataforma gratuita para aprender inglês de forma prática e divertida, usando <strong>histórias interativas e situações reais</strong>. Você pratica, recebe feedback imediato e evolui rapidamente, sem precisar de cadastro.</p>
                  <p><strong className="text-slate-900">Problema:</strong> Transformar aprendizado tradicional de idiomas em uma experiência prática e interativa.</p>
                  <p><strong className="text-slate-900">Desafio:</strong> Construir uma experiência acessível internacionalmente, com diferentes idiomas e situações de uso.</p>
                  <p><strong className="text-slate-900">Solução:</strong> Plataforma web baseada em histórias interativas, feedback e experiências contextualizadas.</p>
                  <p className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 tracking-widest uppercase">
                    Competências demonstradas: Produto • UX • Internacionalização • Frontend • Arquitetura Web
                  </p>
                </div>
              </div>
            </div>

            {/* Synapzo */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-dashed border-slate-300 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-500 hover:-translate-y-1 relative p-8">
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 border border-blue-200 px-2 py-1 rounded animate-pulse tracking-widest uppercase">Em Desenvolvimento</span>
              </div>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="text-[9px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase tracking-widest">Labs</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Synapzo</h3>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>O <strong>Synapzo</strong> é uma plataforma SaaS B2B/B2C de inteligência acadêmica que resolve um problema silencioso e devastador para estudantes de alta performance: a ilusão de progresso. Horas de leitura que não viram estrutura. PDFs acumulados que não viram domínio.</p>
                  <p>Plataforma experimental utilizando IA e RAG focada em processar e interagir com conteúdo não estruturado.</p>
                </div>
                <div className="pt-6 mt-auto border-t border-slate-200 text-[10px] text-slate-400 tracking-widest uppercase">
                  AI • RAG • SaaS • POSTGRESQL
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
