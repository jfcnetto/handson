import Link from 'next/link'

export const metadata = {
  title: 'Modernização de Sistemas Legados: O Guia Completo para Evoluir Seu ERP',
  description: 'Saiba por que manter um sistema legado custa caro e como a modernização de sistemas pode transformar a arquitetura do seu negócio com segurança e performance em nuvem.',
}

export default function ModernizacaoSistemasLegadosPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 prose prose-lg prose-blue">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Modernização de Sistemas Legados: O Guia Completo para Evoluir Seu ERP</h1>
        
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" 
          alt="Tecnologia moderna e migração para a nuvem" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
        />

        <p>
          Se a sua empresa ainda depende de um software desenvolvido há mais de 10 anos, você sabe bem a dor de cabeça que é mantê-lo rodando.
        </p>
        <p>
          Erros constantes, telas lentas, dificuldade de integração e a impossibilidade de trabalhar pelo celular ou fora do escritório.
        </p>
        <p>
          A solução definitiva para isso chama-se <strong>Modernização de Sistemas Legados</strong>.
        </p>

        <h2>O que é um Sistema Legado?</h2>
        <p>
          No mundo da TI corporativa, chamamos de "legado" qualquer software, tecnologia ou método que já é obsoleto, mas continua sendo utilizado porque desempenha um papel crítico nos processos da empresa.
        </p>
        <p>
          Geralmente, são sistemas monolíticos, instalados em servidores físicos locais, que utilizam linguagens de programação que a maioria dos desenvolvedores atuais não conhece mais (como Delphi, VB6, Cobol, etc).
        </p>

        <h2>Por que Manter um Sistema Antigo Custa Caro?</h2>
        <p>
          Muitos gestores adiam a modernização pensando em economia.
        </p>
        <p>
          Mas a verdade é que o sistema legado drena recursos de forma silenciosa:
        </p>
        <ul>
          <li><strong>Custo de Manutenção:</strong> Encontrar programadores experientes em linguagens antigas é raro e muito caro.</li>
          <li><strong>Falta de Mobilidade:</strong> Seus funcionários precisam estar na empresa para usar o sistema, limitando home-office e vendas externas.</li>
          <li><strong>Vulnerabilidade de Segurança:</strong> Ferramentas antigas não recebem mais atualizações de segurança, abrindo portas gigantescas para ataques de ransomware.</li>
          <li><strong>Isolamento de Dados:</strong> O sistema legado não se comunica com as ferramentas modernas do mercado (NFs, APIs bancárias, CRMs).</li>
        </ul>

        <h2>Como Fazemos a Modernização?</h2>
        <p>
          Substituir o coração da empresa exige planejamento rigoroso.
        </p>
        <p>
          Não acreditamos no modelo "desligue tudo hoje e ligue o novo amanhã".
        </p>
        <p>
          A abordagem correta é a modernização progressiva.
        </p>
        
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" 
          alt="Servidores locais antigos sendo substituídos por nuvem" 
          className="w-full h-80 object-cover rounded-xl shadow-lg my-8"
        />
        
        <p>
          Extraímos as regras de negócio do sistema antigo e construímos, paralelamente, um software web robusto.
        </p>
        <p>
          Esse novo software pode rodar na Nuvem (Cloud), acessível de qualquer lugar através do navegador ou celular.
        </p>
        <p>
          Realizamos a migração dos dados históricos para o novo banco de dados relacional (como PostgreSQL) sem perder nenhuma informação valiosa do passado.
        </p>

        <h2>Resultados da Evolução Digital</h2>
        <p>
          Com a modernização, sua empresa ganha velocidade, segurança e, acima de tudo, a capacidade de inovar e criar integrações para competir com outras empresas no mercado atual.
        </p>
        <p>
          A migração tira a sua operação da "sobrevivência" e a coloca no modo "crescimento estruturado".
        </p>
      </article>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 mt-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Qual é o estado do seu sistema?</h2>
          <p className="text-lg text-slate-600 mb-10">Faça gratuitamente uma avaliação preliminar conosco em menos de 5 minutos e descubra seu nível de risco tecnológico.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostico" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-md flex items-center justify-center">
              ANALISAR MEU SISTEMA
            </Link>
            <a href="https://wa.me/5561994005941" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-sm flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              FALAR COM ESPECIALISTA
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}