export const metadata = {
  title: 'Política de Privacidade | Hands On!',
  description: 'Nossa política de privacidade.'
}

export default function PrivacidadePage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Política de Privacidade</h1>
        <div className="prose prose-lg text-slate-700 max-w-none">
          <p>Última atualização: {new Date().getFullYear()}</p>
          <p>
            A Hands On! leva a privacidade dos seus dados a sério. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Coleta de Informações</h2>
          <p>Coletamos informações fornecidas voluntariamente por meio de nossos formulários de contato e diagnóstico, incluindo nome, e-mail e informações sobre os sistemas da sua empresa.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso das Informações</h2>
          <p>Utilizamos suas informações exclusivamente para:</p>
          <ul>
            <li>Entrar em contato para fornecer os serviços solicitados.</li>
            <li>Realizar análises técnicas preliminares.</li>
            <li>Enviar comunicações sobre nossos serviços, quando autorizado.</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Compartilhamento e Segurança</h2>
          <p>Não vendemos, alugamos ou compartilhamos suas informações com terceiros. Adotamos as melhores práticas de segurança técnica e administrativa para proteger seus dados contra acesso não autorizado.</p>
          
          <p className="mt-8">Para dúvidas sobre nossa política de privacidade, entre em contato através de contato@handson.com.br.</p>
        </div>
      </div>
    </div>
  )
}