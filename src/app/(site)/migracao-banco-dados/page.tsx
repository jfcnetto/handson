import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Migração de Banco de Dados: Como Transferir o Coração da Empresa',
  description: 'Descubra os desafios da migração de bancos de dados legados, como limpar dados e garantir uma transição segura para nuvem sem perda de informações cruciais.',
}

export default function MigracaoBancoDadosPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 prose prose-lg prose-blue">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Migração de Banco de Dados: Como Transferir o Coração da Sua Empresa</h1>
        
        <Image 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" 
          alt="Servidores e painéis de dados em data center" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
          width={1200} height={800}
        />

        <p>
          O banco de dados de uma empresa é o seu ativo mais valioso, guardando o histórico completo de clientes, vendas e finanças.
        </p>
        <p>
          Quando um sistema legado atinge seu limite técnico, o maior medo dos gestores é perder essas informações durante a troca de tecnologia.
        </p>
        <p>
          A <strong>Migração de Banco de Dados</strong> é o processo de transferir dados de um sistema antigo (muitas vezes desestruturado) para um novo banco de dados moderno, escalável e seguro na nuvem.
        </p>

        <h2>Por que a Migração é tão Desafiadora?</h2>
        <p>
          Mover dados de um lugar para outro parece simples na teoria, mas na prática corporativa, é uma operação de alto risco.
        </p>
        <p>
          Sistemas antigos geralmente possuem bancos de dados com arquiteturas confusas, tabelas sem padrão e regras de negócio espalhadas.
        </p>
        <p>
          Muitas vezes, encontram-se dados duplicados, campos de texto misturados com números e registros órfãos que quebram as consultas.
        </p>
        <p>
          Uma simples exportação descuidada pode corromper a pontuação de CPFs, bagunçar datas e destruir o relacionamento estrutural entre o cliente e os pedidos dele.
        </p>

        <h2>O Nosso Processo de Migração Segura</h2>
        <p>
          Não realizamos apenas a cópia dos dados brutos, nós aplicamos um processo rigoroso de ETL (Extração, Transformação e Carga).
        </p>
        <p>
          Primeiro, <strong>Extraímos</strong> as informações do banco de origem (seja ele SQL antigo, Firebird, DBF ou Oracle).
        </p>
        <p>
          Em seguida, <strong>Transformamos</strong> esses dados de forma cuidadosa: limpamos sujeiras, padronizamos documentos, corrigimos codificações de texto antigas (como acentos quebrados) e redesenhamos a estrutura das tabelas para o padrão relacional moderno.
        </p>
        <p>
          Por fim, <strong>Carregamos</strong> o histórico purificado no novo banco de dados (como PostgreSQL hospedado em Cloud), realizando testes intensivos automatizados para garantir a integridade de todas as referências.
        </p>

        <Image 
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80" 
          alt="Gráficos de dados em telas e transformação digital" 
          className="w-full h-80 object-cover rounded-xl shadow-lg my-8"
          width={1200} height={800}
        />

        <h2>A Garantia de Zero Inatividade</h2>
        <p>
          O maior receio em grandes migrações corporativas é o tempo em que a empresa precisará ficar de portas fechadas ou inoperante para a virada do sistema.
        </p>
        <p>
          Nossa abordagem envolve testes de migrações em paralelo e sincronização contínua.
        </p>
        <p>
          Preparamos toda a base em um ambiente de simulação, homologamos com os especialistas da sua equipe e só realizamos a virada final e definitiva em janelas de baixo acesso, como na madrugada ou aos finais de semana.
        </p>
        <p>
          Ao final do processo, sua empresa herda um histórico de dados impecável, perfeitamente pronto para alimentar ferramentas de Inteligência Artificial e Dashboards executivos avançados.
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
            <a href="https://wa.me/5561992809250" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-md flex items-center justify-center gap-2 uppercase">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              FALAR COM ESPECIALISTA
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}