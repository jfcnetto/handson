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
            <li className="flex items-center gap-2 mb-2">
              <a href="https://wa.me/5561992809250" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-bold flex items-center gap-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                (61) 99280-9250
              </a>
            </li>
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