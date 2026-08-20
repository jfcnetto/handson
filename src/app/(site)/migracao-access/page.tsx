import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Migração de Access para Web: Como Modernizar seu Banco de Dados',
  description: 'Sistemas Microsoft Access atingiram o limite? Saiba como migrar dados, telas e formulários legados em Access para a nuvem de forma escalável e livre de travamentos.',
}

export default function MigracaoAccessPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 prose prose-lg prose-blue">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Migração de Microsoft Access para Sistemas Web Modernos</h1>
        
        <Image 
          src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80" 
          alt="Servidor de banco de dados corporativo" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
          width={1200} height={800}
        />

        <p>
          O <strong>Microsoft Access</strong> foi uma das ferramentas de banco de dados mais populares das décadas passadas.
        </p>
        <p>
          Ele permitiu que milhares de empresas automatizassem fluxos internos rapidamente.
        </p>
        <p>
          Contudo, negócios crescem e o Access não foi desenhado para lidar com cenários de grande volume de dados ou múltiplos acessos simultâneos.
        </p>

        <h2>Os Limites Fatais do Access</h2>
        <p>
          Quando a sua operação de negócios começa a depender inteiramente de um banco de dados Access (`.mdb` ou `.accdb`), alguns problemas clássicos começam a paralisar o trabalho da sua equipe:
        </p>
        <ul>
          <li><strong>Travamentos e Corrupção de Dados:</strong> O Access frequentemente trava ou se corrompe quando mais de 5 a 10 pessoas tentam acessar os registros ao mesmo tempo.</li>
          <li><strong>Limitação Física de Tamanho:</strong> Bancos de dados Access possuem um limite arquitetural de tamanho (geralmente próximo a 2GB). Quando o arquivo atinge esse volume, a aplicação entra em colapso.</li>
          <li><strong>Falta de Acesso Web/Mobile:</strong> O Access foi projetado para redes locais (LAN). Acessá-lo via internet, de casa, pelo celular ou conectar integrações externas é praticamente impossível ou excessivamente inseguro.</li>
        </ul>

        <h2>O Caminho para a Nuvem</h2>
        <p>
          O processo de <strong>Migração de Access</strong> consiste em separar o que é dado (banco de dados) do que é comportamento (telas e formulários), e substituí-los por soluções modernas.
        </p>
        <p>
          A migração resolve todos os problemas de limite do Access de uma só vez, movendo seu sistema para tecnologias utilizadas pelas maiores empresas do mundo.
        </p>
        
        <Image 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" 
          alt="Desenvolvimento de software e segurança cibernética" 
          className="w-full h-80 object-cover rounded-xl shadow-lg my-8"
          width={1200} height={800}
        />

        <h2>Como a Migração Funciona?</h2>
        <p>
          A modernização de um sistema feito em Access segue três etapas primordiais:
        </p>
        <ol>
          <li><strong>Migração de Dados (Database Migration):</strong> Extraímos todos os dados históricos das tabelas legadas do Access e os transportamos, com integridade referencial, para bancos de dados relacionais robustos, como o PostgreSQL, SQL Server ou MySQL, operando diretamente na Nuvem.</li>
          <li><strong>Refatoração de Regras (VBA):</strong> As macros e os códigos em VBA embutidos nos antigos formulários do Access são transcritos para lógicas seguras em backend (APIs).</li>
          <li><strong>Recriação da Interface:</strong> As antigas telas cinzas do Access são substituídas por interfaces web responsivas, elegantes e com painéis de controle em tempo real (dashboards).</li>
        </ol>

        <h2>Vantagens da Modernização de Access</h2>
        <p>
          Migrando para tecnologias web, sua empresa passa a ter acessos ilimitados simultâneos sem travamentos.
        </p>
        <p>
          O limite de dados torna-se flexível, crescendo conforme o negócio.
        </p>
        <p>
          Além disso, backups automatizados garantem que você nunca mais precisará se preocupar com a corrupção do arquivo <em>.mdb</em>.
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