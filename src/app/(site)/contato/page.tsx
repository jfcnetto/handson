import Link from 'next/link'

export const metadata = {
  title: 'Contato | Hands On!',
  description: 'Fale conosco. Nossa equipe está pronta para entender as necessidades únicas da sua empresa.'
}

export default function ContatoPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Contato</h1>
        <div className="prose prose-lg text-slate-700 max-w-none mb-12">
          <p>
            Estamos prontos para entender as necessidades únicas da sua empresa e desenhar a arquitetura ideal de transição para a nuvem.
          </p>
          <ul className="list-none pl-0">
            <li><strong>WhatsApp:</strong> (61) 99400-5941</li>
            <li><strong>E-mail:</strong> contato@handson.com.br</li>
            <li><strong>Endereço:</strong> Qd. 13 Lote 16 Lj. 01 Setor Leste, Gama - DF, CEP 72.450-130</li>
          </ul>
          <p>Nossa equipe entrará em contato com você o mais rápido possível para agendar uma avaliação inicial gratuita.</p>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
          <form action="https://formsubmit.co/jfcnetto@gmail.com" method="POST" className="space-y-6">
            <input type="hidden" name="_subject" value="Novo contato pelo site Hands On!" />
            <input type="hidden" name="_next" value="http://localhost:3000/contato" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Como podemos ajudar?</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}