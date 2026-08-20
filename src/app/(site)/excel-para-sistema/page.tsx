import Link from 'next/link'

export const metadata = {
  title: 'Transformação de Excel para Software Web Corporativo',
  description: 'Planilhas pesadas, fórmulas quebradas e dados duplicados? Descubra como transformar o Excel da sua empresa em um sistema web seguro e centralizado.',
}

export default function ExcelParaSistemaPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 prose prose-lg prose-blue">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Transformação de Excel para Software Web Corporativo</h1>
        
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80" 
          alt="Análise de dados corporativos e planilhas" 
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8"
        />

        <p>
          Toda grande empresa tem aquele funcionário ou setor que construiu uma "super planilha".
        </p>
        <p>
          Ela faz de tudo: cálculos complexos, gestão de estoque, projeções financeiras e envio de alertas.
        </p>
        <p>
          No entanto, quando <strong>o Excel se torna o ERP principal de um processo crítico</strong>, os riscos operacionais se multiplicam de forma alarmante.
        </p>

        <h2>Quando o Excel se Torna um Perigo</h2>
        <p>
          O Microsoft Excel é a ferramenta de produtividade mais brilhante já inventada, mas ele não foi desenhado para atuar como o coração corporativo de uma empresa.
        </p>
        <p>
          O uso indevido de planilhas traz problemas estruturais:
        </p>
        <ul>
          <li><strong>Versões Conflitantes:</strong> A planilha "Controle_Final_v3_Revisada.xlsx" circula por e-mail e ninguém sabe quem possui os dados mais atualizados.</li>
          <li><strong>Falta de Auditoria (Logs):</strong> Se um número for apagado ou alterado acidentalmente, não há como rastrear com facilidade quem fez a mudança ou quando ela ocorreu.</li>
          <li><strong>Fórmulas Quebradas:</strong> Uma ordenação errada ou uma linha deletada pode corromper referências importantes (PROCV/VLOOKUP), gerando prejuízos silenciosos.</li>
          <li><strong>Lentidão e Limite de Dados:</strong> Planilhas muito grandes começam a travar o computador dos funcionários.</li>
        </ul>

        <h2>O Caminho da Transformação Digital</h2>
        <p>
          A solução não é abandonar a lógica construída durante anos no Excel, mas sim <strong>transformá-la em um Sistema Web</strong>.
        </p>
        <p>
          Ao converter planilhas para um software corporativo estruturado, o conhecimento do negócio é transferido para um código seguro, organizado e escalável.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
          alt="Dashboard de sistema web moderno" 
          className="w-full h-80 object-cover rounded-xl shadow-lg my-8"
        />

        <h2>Como Fazemos a Conversão de Excel para Web?</h2>
        <p>
          O processo realizado pela nossa equipe envolve uma engenharia reversa minuciosa da sua planilha:
        </p>
        <ol>
          <li><strong>Mapeamento de Dados:</strong> Transformamos as abas e colunas da planilha em um Banco de Dados Relacional robusto (com backups automáticos).</li>
          <li><strong>Tradução de Fórmulas e Macros (VBA):</strong> Todas as regras matemáticas e fluxos lógicos são traduzidos para linguagens de programação de servidor (Back-end), blindando-as contra edições acidentais de usuários.</li>
          <li><strong>Criação da Interface:</strong> Substituímos as células confusas do Excel por Telas, Dashboards e Formulários amigáveis, acessíveis de qualquer navegador ou celular.</li>
          <li><strong>Controle de Acessos:</strong> Implementamos login, senhas e perfis de usuário, garantindo que o setor de Vendas veja apenas vendas e a Diretoria tenha acesso aos relatórios completos.</li>
        </ol>

        <h2>Vantagens Imediatas</h2>
        <p>
          Transformar Excel em sistema próprio permite que vários funcionários trabalhem no mesmo dado simultaneamente, sem travar o arquivo.
        </p>
        <p>
          Elimina-se o risco de perder planilhas cruciais.
        </p>
        <p>
          É o primeiro e mais importante passo para a automação e escalabilidade da sua operação.
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