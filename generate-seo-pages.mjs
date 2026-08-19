import fs from 'fs';
import path from 'path';

const pages = [
  {
    slug: 'modernizacao-sistemas-legados',
    title: 'Modernização de Sistemas Legados',
    description: 'A modernização de sistemas legados é o processo de atualização de softwares antigos que, apesar de funcionais, utilizam tecnologias obsoletas que travam o crescimento do seu negócio. A Hands On! atua refatorando, migrando e reconstruindo aplicações de forma segura e progressiva.',
    h2_1: 'Por que modernizar seu sistema legado?',
    p_1: 'Manter um sistema antigo muitas vezes custa mais do que atualizá-lo. Com o tempo, a tecnologia se torna incompatível, os profissionais desaparecem do mercado e o risco de interrupção aumenta drasticamente.',
    h2_2: 'Nossa abordagem',
    p_2: 'Não começamos programando. Nossa metodologia baseada no Legacy Assessment nos permite mapear completamente suas regras de negócio antes de qualquer migração, garantindo zero perda de conhecimento e a continuidade segura da sua operação.'
  },
  {
    slug: 'sistema-sem-codigo-fonte',
    title: 'Substituição de Sistema Sem Código-Fonte',
    description: 'Possui um sistema crítico funcionando mas a sua empresa perdeu o acesso ao código-fonte? Nós reconstruímos a sua aplicação através de Engenharia Reversa, analisando o banco de dados e o comportamento em tela.',
    h2_1: 'O risco de depender do que você não controla',
    p_1: 'Um sistema sem código-fonte é uma bomba-relógio. Qualquer mudança de infraestrutura, atualização de sistema operacional ou problema de segurança pode paralisar sua operação de forma irreversível.',
    h2_2: 'Como recuperamos seu sistema',
    p_2: 'Utilizamos técnicas avançadas de Engenharia Reversa. Analisamos a estrutura do banco de dados existente, rastreamos o tráfego de rede e mapeamos a interface visual para extrair de volta as regras de negócio perdidas e reconstruir um novo software idêntico e moderno.'
  },
  {
    slug: 'migracao-access',
    title: 'Migração de Access para Aplicação Web',
    description: 'Bancos de dados e sistemas construídos em Microsoft Access costumam travar, corromper dados e impedir o acesso remoto. A Hands On! migra sua operação Access para uma aplicação web moderna e segura na nuvem.',
    h2_1: 'O limite do Microsoft Access',
    p_1: 'O Access é excelente para pequenos controles, mas quando seu negócio cresce, os arquivos tornam-se lentos e corrompem facilmente com múltiplos acessos simultâneos.',
    h2_2: 'Solução Web',
    p_2: 'Migramos seu banco de dados para SQL Server ou PostgreSQL e transformamos seus formulários e relatórios em um sistema Web seguro, acessível de qualquer dispositivo e preparado para múltiplos usuários reais.'
  },
  {
    slug: 'excel-para-sistema',
    title: 'Transformação de Excel para Software Web',
    description: 'Sua empresa opera através de planilhas de Excel complexas e arriscadas? Transformamos suas lógicas e macros do Excel em um software corporativo estruturado, auditável e seguro.',
    h2_1: 'Quando o Excel se torna um perigo',
    p_1: 'Planilhas que circulam por e-mail, fórmulas quebradas por erro humano e falta de auditoria de quem modificou os dados geram riscos financeiros enormes. O Excel não foi feito para ser o ERP da sua empresa.',
    h2_2: 'A transformação',
    p_2: 'Analisamos todas as suas abas, macros e fórmulas matemáticas, transformando tudo em regras de backend sólidas e em telas intuitivas. O resultado é o fim da duplicidade de dados e o início da automação corporativa.'
  },
  {
    slug: 'migracao-banco-dados',
    title: 'Migração de Banco de Dados',
    description: 'Extração, transformação, limpeza e migração (ETL) de bancos de dados antigos ou legados para ambientes em nuvem, garantindo 100% de integridade das suas informações históricas.',
    h2_1: 'Protegendo o seu maior ativo',
    p_1: 'Migrar dados não é apenas copiar arquivos. É garantir que décadas de informações de clientes, vendas e faturamento sejam convertidos perfeitamente para as novas estruturas de banco de dados sem qualquer divergência.',
    h2_2: 'Processo Validador',
    p_2: 'Utilizamos um processo contínuo de Profile, Cleanse, Transform, Migrate e Reconcile, gerando relatórios de reconciliação para que você tenha a prova matemática de que nada foi perdido na transição.'
  },
  {
    slug: 'engenharia-reversa-software',
    title: 'Engenharia Reversa de Software',
    description: 'Compreenda, recupere e documente o funcionamento exato de sistemas antigos ou de terceiros através de nossa metodologia de descoberta reversa, essencial para auditoria ou reconstrução.',
    h2_1: 'Recuperando o Conhecimento',
    p_1: 'Ao longo dos anos, os profissionais que construíram seu software saem da empresa e levam o conhecimento. Nossa Engenharia Reversa redescobre essas lógicas e gera o "Legacy Blueprint" definitivo da sua aplicação.',
    h2_2: 'Abordagem Multidirecional',
    p_2: 'Investigamos telas, tabelas no banco de dados, pacotes de rede e manuais antigos para documentar regras de negócio que estavam ocultas. Só reconstruímos depois que dominamos as regras.'
  },
  {
    slug: 'consultoria-sistemas',
    title: 'Consultoria de Sistemas e Arquitetura',
    description: 'Desenhamos a estratégia tecnológica certa para a sua modernização. Avaliamos processos, integrações, APIs, dados e definimos a melhor arquitetura de transição para sua empresa.',
    h2_1: 'Planejamento Estratégico em TI',
    p_1: 'Modernizar um software central é arriscado. Nossos especialistas mapeiam a arquitetura atual e propõem roteiros viáveis de modernização progressiva, com o menor impacto possível na operação.',
    h2_2: 'Desenho de Soluções',
    p_2: 'Entregamos diagramas de arquitetura (Target Architecture), mapas de dependência técnica e um cronograma de migração passo a passo desenhado especificamente para a realidade do seu fluxo de caixa e risco.'
  },
  {
    slug: 'desenvolvimento-software',
    title: 'Desenvolvimento de Software Sob Medida',
    description: 'Após compreendermos as regras e o passado da sua operação, construímos aplicações web e sistemas sob medida com arquitetura escalável e alta segurança para o seu futuro.',
    h2_1: 'Criando o seu novo sistema',
    p_1: 'Diferente de fábricas de software tradicionais, nós só iniciamos o desenvolvimento sob medida quando o diagnóstico e as regras legadas estão totalmente estabilizados.',
    h2_2: 'Qualidade e Nuvem',
    p_2: 'Utilizamos stacks modernas como Next.js, Node.js e PostgreSQL, hospedados em infraestruturas elásticas. Seu novo software será rápido, seguro e nunca mais se tornará uma "caixa preta" sem documentação.'
  }
];

const basePath = path.join(process.cwd(), 'src', 'app', '(site)');

pages.forEach(page => {
  const dirPath = path.join(basePath, page.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const content = "use client";
import Link from 'next/link';

export default function SEOPage() {
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6"></h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          
        </p>
        
        <div className="prose prose-lg text-slate-700 max-w-none">
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4"></h2>
          <p className="mb-8"></p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4"></h2>
          <p className="mb-12"></p>
        </div>
      </div>
      
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
\;

  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
  console.log(\Generated \\);
});