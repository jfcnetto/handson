import Link from 'next/link'

export const metadata = {
  title: 'Sobre Nós | Hands On!',
  description: 'Conheça a história da Hands On!, especialistas em modernização de sistemas.'
}

export default function SobrePage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Sobre Nós</h1>
        <div className="prose prose-lg text-slate-700 max-w-none">
          <p>
            Desde a nossa fundação em <strong>2007</strong>, a Hands On! tem sido uma referência em engenharia reversa, modernização de sistemas legados e migração de bancos de dados.
          </p>
          <p>
            Com mais de uma década e meia de experiência, atuamos no coração das operações das empresas, resolvendo os problemas mais complexos de tecnologia: a dependência de sistemas antigos, a perda de código-fonte e o risco de bancos de dados obsoletos.
          </p>
          <p>
            Acreditamos que a tecnologia deve ser um impulsionador de crescimento, e não uma âncora.<br/><br/>
            Por isso, não começamos programando.<br/><br/>
            Nossa abordagem científica baseada em Legacy Assessment permite que mapeemos completamente o seu negócio antes de qualquer migração, garantindo a evolução digital da sua empresa com segurança e previsibilidade.
          </p>
        </div>
      </div>
    </div>
  )
}