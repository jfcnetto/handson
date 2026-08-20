import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Como Recuperar um Sistema Sem Código-Fonte',
  description: 'Sua empresa perdeu o código-fonte original do sistema? Saiba como a Hands On! pode auditar, recuperar e reescrever sua aplicação para garantir a operação.',
}

export default function SistemaSemCodigoFontePage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 prose prose-lg prose-blue">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Como Manter e Evoluir um Sistema Sem Código-Fonte</h1>
        
        <Image 
          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1200&q=80" 
          alt="Programador frustrado tentando entender um sistema fechado" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
          width={1200} height={800}
        />

        <p>
          Um dos maiores pesadelos para qualquer gestor de TI é descobrir que o sistema principal da empresa está rodando, mas o <strong>código-fonte original foi perdido</strong>.
        </p>
        <p>
          Seja porque o desenvolvedor saiu da empresa, a software house terceirizada faliu ou simplesmente porque não houve controle de versão (como Git) ao longo dos anos.
        </p>

        <h2>O Risco de Operar Sem Código-Fonte</h2>
        <p>
          O código-fonte é a "receita do bolo" de um software.
        </p>
        <p>
          Sem ele, você possui apenas o bolo já assado (o executável final).
        </p>
        <p>
          Operar dessa maneira traz riscos críticos:
        </p>
        <ul>
          <li><strong>Impossibilidade de Manutenção:</strong> Se uma nova lei tributária exigir uma mudança no cálculo de impostos do sistema, você não consegue alterá-lo.</li>
          <li><strong>Falhas de Compatibilidade:</strong> Uma simples atualização do Windows ou de um servidor pode fazer o executável parar de funcionar permanentemente.</li>
          <li><strong>Gargalo de Crescimento:</strong> Não é possível adicionar novas telas, integrar com APIs modernas ou criar versões móveis.</li>
        </ul>

        <h2>Qual é a Solução?</h2>
        <p>
          A solução definitiva é recriar o sistema.
        </p>
        <p>
          No entanto, recriar um sistema complexo "do zero" contando apenas com a memória dos funcionários costuma resultar em fracasso, pois muitas regras de negócios ocultas acabam esquecidas.
        </p>
        
        <Image 
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80" 
          alt="Engenharia reversa e recuperação de código" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
          width={1200} height={800}
        />

        <h2>A Abordagem Técnica da Hands On!</h2>
        <p>
          Nós utilizamos técnicas de <strong>Engenharia Reversa</strong> focadas em observar a "Caixa Preta".
        </p>
        <p>
          Em vez de tentar descompilar executáveis antigos (o que raramente gera um código legível), nós:
        </p>
        <ol>
          <li>Mapeamos o banco de dados existente (que geralmente continua acessível, como um SQL Server ou Firebird antigo).</li>
          <li>Interceptamos todas as consultas que o sistema fechado faz ao banco de dados durante a operação normal dos usuários.</li>
          <li>Catalogamos cada tela e comportamento visual para desenhar processos equivalentes.</li>
          <li>Desenvolvemos, em paralelo, uma aplicação web moderna (utilizando tecnologias como React e Node.js) que se comunica com os mesmos dados.</li>
        </ol>

        <h2>Recupere a Propriedade Intelectual da sua Empresa</h2>
        <p>
          Mais do que apenas um novo software, o processo devolve à sua empresa a posse da própria tecnologia.
        </p>
        <p>
          Ao final da reconstrução, você recebe o sistema moderno completo, documentado e com repositório de código-fonte devidamente versionado sob sua propriedade exclusiva, garantindo que o pesadelo nunca se repita.
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