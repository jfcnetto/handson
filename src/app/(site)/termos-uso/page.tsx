export const metadata = {
  title: 'Termos de Uso | Hands On!',
  description: 'Nossos termos de uso.'
}

export default function TermosUsoPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Termos de Uso</h1>
        <div className="prose prose-lg text-slate-700 max-w-none">
          <p>Última atualização: {new Date().getFullYear()}</p>
          <p>
            Ao acessar e usar o site da Hands On!, você concorda com estes Termos de Uso.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Serviços</h2>
          <p>As informações fornecidas neste site sobre modernização de sistemas, engenharia reversa e migração de bancos de dados são de caráter informativo. O escopo exato de qualquer serviço será definido em contrato específico.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Propriedade Intelectual</h2>
          <p>Todo o conteúdo deste site, incluindo textos, gráficos, logotipos e metodologias (como o "Legacy Assessment"), são propriedade exclusiva da Hands On! ou licenciados para nós, estando protegidos pelas leis de direitos autorais.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Limitação de Responsabilidade</h2>
          <p>Embora nos esforcemos para manter as informações do site atualizadas, não garantimos a exatidão, integridade ou atualidade do conteúdo. O uso das informações é por sua conta e risco.</p>
          
          <p className="mt-8">Reservamo-nos o direito de modificar estes termos a qualquer momento. Para dúvidas, contate-nos através de contato@handson.com.br.</p>
        </div>
      </div>
    </div>
  )
}