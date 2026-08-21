'use client'

import { useState, useRef, useEffect } from 'react'
import { submitLegacyCheck } from '@/actions/legacyCheck'

// SVG for User Avatar (Cartoon Businessman)
const UserAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 rounded-full bg-slate-200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="35" r="20" fill="#fcd5b5"/>
    <path d="M30 35 Q50 20 70 35" stroke="#333" strokeWidth="4" fill="none"/>
    <rect x="25" y="55" width="50" height="45" rx="10" fill="#2c3e50"/>
    <polygon points="50,65 45,90 55,90" fill="#e74c3c"/>
    <polygon points="40,55 50,75 60,55 50,65" fill="#ecf0f1"/>
  </svg>
)

// SVG for Bot Avatar (Site Logo)
const BotAvatar = () => (
  <img src="/icon.png" alt="Bot" className="w-8 h-8 rounded-full bg-slate-900 p-[2px] object-cover" onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 7h2v7h-2zm0 8h2v2h-2z"/></svg>'
  }} />
)

type Step = {
  field: string;
  type: 'text' | 'email' | 'tel' | 'single' | 'multiple';
  options?: string[];
  question: (name: string) => string;
}

const STEPS: Step[] = [
  { field: 'name', type: 'text', question: () => "Olá! Vamos iniciar o diagnóstico do seu sistema. Para começar, qual o seu nome?" },
  { field: 'targetSystem', type: 'single', options: ['Sistema legado genérico', 'Sistema desktop (Instalado)', 'Planilhas Excel', 'Microsoft Access'], question: (name) => `Prazer, ${name}. O que você deseja modernizar?` },
  { field: 'hasSourceCode', type: 'single', options: ['Sim, completo', 'Apenas parte dele', 'Não possuímos', 'Não sei informar'], question: (name) => `${name}, você possui o código-fonte?` },
  { field: 'technology', type: 'multiple', options: ['Delphi', 'Visual Basic', 'Java', '.NET', 'PHP', 'COBOL', 'Excel/VBA', 'Access', 'Não sei'], question: () => "Sabe a tecnologia original? (Pode escolher várias)" },
  { field: 'database', type: 'single', options: ['SQL Server', 'Oracle', 'PostgreSQL/MySQL', 'Access / DBF', 'Excel / CSV', 'Não sabemos'], question: () => "Onde estão os dados?" },
  { field: 'documentation', type: 'single', options: ['Completa e atualizada', 'Parcial', 'Apenas manuais antigos', 'Não existe'], question: () => "Existe documentação?" },
  { field: 'knowledgeCentralization', type: 'single', options: ['Muitos funcionários conhecem', 'Apenas poucas pessoas conhecem', 'Uma única pessoa centraliza tudo', 'A pessoa que conhecia não está mais na empresa'], question: () => "Quem sabe como o sistema realmente funciona?" },
  { field: 'businessCriticality', type: 'single', options: ['1 - Pouco impacto', '2 - Algumas atividades prejudicadas', '3 - Um departamento poderia parar', '4 - Parte importante da empresa pararia', '5 - A operação inteira pararia'], question: () => "Se o sistema parasse, o que aconteceria? (1 a 5)" },
  { field: 'urgency', type: 'single', options: ['Imediatamente (Crítico)', 'Até 30 dias', '3 a 6 meses', 'Apenas pesquisando preço'], question: () => "Qual a urgência para iniciar?" },
  { field: 'company', type: 'text', question: (name) => `Ótimo, ${name}. Agora, para finalizarmos e gerarmos o seu score, qual o nome da sua empresa?` },
  { field: 'companySize', type: 'single', options: ['1-10 funcionários', '11-50 funcionários', '51-200 funcionários', '201-500 funcionários', 'Mais de 500 funcionários'], question: () => "Tamanho da Empresa?" },
  { field: 'jobTitle', type: 'single', options: ['Diretor / CEO / CTO', 'Gerente / Coordenador', 'Proprietário / Sócio', 'Especialista / Analista', 'Outro'], question: () => "Qual o seu Cargo?" },
  { field: 'email', type: 'email', question: () => "Qual o seu e-mail corporativo?" },
  { field: 'phone', type: 'tel', question: () => "E por fim, seu WhatsApp/Telefone:" }
]

export default function DiagnosticoForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<any>({
    name: '', email: '', phone: '', company: '', jobTitle: '', companySize: '',
    targetSystem: '', hasSourceCode: '', technology: [] as string[], database: '', documentation: '',
    knowledgeCentralization: '', businessCriticality: '', urgency: '', motivation: [] as string[]
  })
  
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([
    { sender: 'bot', text: STEPS[0].question('') }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([])
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentStepIndex])

  const handleNext = async (answerText: string, fieldName: string, value: any) => {
    const newFormData = { ...formData, [fieldName]: value }
    setFormData(newFormData)
    
    // Adiciona resposta do usuário
    setMessages(prev => [...prev, { sender: 'user', text: answerText }])
    setInputValue('')
    setMultiSelectValues([])
    
    const nextIndex = currentStepIndex + 1
    
    if (nextIndex < STEPS.length) {
      // Adiciona próxima pergunta do bot
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: STEPS[nextIndex].question(newFormData.name) }])
        setCurrentStepIndex(nextIndex)
      }, 500)
    } else {
      // Fim do formulário, processar submit
      setCurrentStepIndex(nextIndex)
      setLoading(true)
      
      const res = await submitLegacyCheck(newFormData)
      if (res.success) {
        try {
          await fetch("https://formsubmit.co/ajax/jfcnetto@gmail.com", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: "Nova consulta sobre sistemas (Diagnóstico)",
                Nome: newFormData.name,
                Email: newFormData.email,
                Empresa: newFormData.company,
                Telefone: newFormData.phone,
                Cargo: newFormData.jobTitle,
                Score: res.legacyComplexityScore || "Calculado"
            })
          });
        } catch (err) {
          console.error("Erro ao enviar email", err);
        }
        setResult(res)
      } else {
        alert('Erro ao processar dados. Tente novamente.')
      }
      setLoading(false)
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    const step = STEPS[currentStepIndex]
    handleNext(inputValue.trim(), step.field, inputValue.trim())
  }
  
  const handleSingleSelect = (option: string) => {
    const step = STEPS[currentStepIndex]
    handleNext(option, step.field, option)
  }
  
  const toggleMultiSelect = (option: string) => {
    setMultiSelectValues(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    )
  }
  
  const submitMultiSelect = () => {
    if (multiSelectValues.length === 0) return
    const step = STEPS[currentStepIndex]
    handleNext(multiSelectValues.join(', '), step.field, multiSelectValues)
  }

  const renderResult = () => {
    if (!result) return null;
    const isSourceAvailable = result.hasSourceCode === 'Sim, completo' || result.hasSourceCode === 'Apenas parte dele';
    const isKeyPerson = result.knowledgeCentralization === 'Uma única pessoa centraliza tudo' || result.knowledgeCentralization === 'A pessoa que conhecia não está mais na empresa';
    const isDbExtractable = result.database === 'PostgreSQL/MySQL' || result.database === 'SQL Server' || result.database === 'Oracle';
    
    const generatePDF = async () => {
      try {
        const jsPDF = (await import('jspdf')).default;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(22);
        pdf.text("Relatório de Diagnóstico", 105, 20, { align: "center" });

        pdf.setFontSize(14);
        pdf.text(`Empresa: ${formData.company}`, 20, 40);
        pdf.text(`Solicitante: ${formData.name}`, 20, 50);

        pdf.setFontSize(16);
        pdf.text("Pontuações do Sistema:", 20, 70);
        
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(`Legacy Complexity: ${result.legacyComplexityScore}/100`, 25, 80);
        pdf.text(`Engenharia Reversa: ${result.reverseEngineeringRisk}/100`, 25, 90);
        pdf.text(`Business Criticality: ${result.businessCriticalityScore}/100`, 25, 100);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("Estimativa de Investimento:", 20, 120);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(14);
        pdf.text(`R$ ${result.estimatedRangeMin.toLocaleString('pt-BR')} a R$ ${result.estimatedRangeMax.toLocaleString('pt-BR')}`, 25, 130);
        
        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text("Valor estimado baseado na complexidade do sistema atual.", 25, 138);
        pdf.setTextColor(0);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("Principais riscos identificados:", 20, 155);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.text(`- Código-fonte: ${isSourceAvailable ? 'Disponível' : 'Indisponível'}`, 25, 165);
        pdf.text(`- Conhecimento: ${isKeyPerson ? 'Dependência extrema de pessoa-chave' : 'Conhecimento distribuído'}`, 25, 175);
        pdf.text(`- Banco de dados: ${isDbExtractable ? 'Extraível' : 'Com extração complexa'} ${result.database ? `(${result.database})` : ''}`, 25, 185);

        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(10);
        pdf.setTextColor(150);
        pdf.text("Este é um diagnóstico preliminar gerado automaticamente pela plataforma Hands On.", 105, 280, { align: "center" });

        pdf.save(`Relatorio_LegacyCheck_${formData.company.replace(/\s+/g, '_')}.pdf`);
      } catch (err) {
        console.error("Erro ao gerar PDF", err);
        alert("Ocorreu um erro ao gerar o PDF. Tente novamente.");
      }
    };

    return (
      <div id="relatorio-pdf" className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Diagnóstico Concluído 🎉</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-700">Legacy Complexity</span>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">{result.legacyComplexityScore}/100</span>
              {result.legacyComplexityScore > 60 ? '🔴' : result.legacyComplexityScore > 40 ? '🟠' : '🟢'}
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-700">Engenharia Reversa</span>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">{result.reverseEngineeringRisk}/100</span>
              {result.reverseEngineeringRisk > 60 ? '🔴' : result.reverseEngineeringRisk > 40 ? '🟠' : '🟢'}
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-700">Business Criticality</span>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">{result.businessCriticalityScore}/100</span>
              {result.businessCriticalityScore > 60 ? '🔴' : result.businessCriticalityScore > 40 ? '🟠' : '🟢'}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg text-center mb-8 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Estimativa de Investimento</h3>
          <div className="text-4xl font-black text-slate-800 mb-2">
            R$ {result.estimatedRangeMin.toLocaleString('pt-BR')} <span className="text-2xl text-slate-500 font-medium">a</span> R$ {result.estimatedRangeMax.toLocaleString('pt-BR')}
          </div>
          <p className="text-slate-500 text-sm">Valor estimado baseado na complexidade do sistema atual.</p>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-4">Principais riscos identificados</h3>
        <ul className="space-y-2 mb-8 text-sm">
          <li className="flex items-center gap-2">
            {isSourceAvailable ? '🟢' : '🔴'} <span className="text-slate-700">Código-fonte {isSourceAvailable ? 'disponível' : 'indisponível'}</span>
          </li>
          <li className="flex items-center gap-2">
            {isKeyPerson ? '🔴' : '🟢'} <span className="text-slate-700">{isKeyPerson ? 'Dependência extrema de pessoa-chave' : 'Conhecimento distribuído'}</span>
          </li>
          <li className="flex items-center gap-2">
            {isDbExtractable ? '🟢' : '🟠'} <span className="text-slate-700">Banco de dados {isDbExtractable ? 'extraível' : 'com extração complexa'} {result.database && `(${result.database})`}</span>
          </li>
        </ul>

        <div id="pdf-button-container" className="text-center">
          <button onClick={generatePDF} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md w-full cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            BAIXAR RELATÓRIO EM PDF
          </button>
          <p className="mt-3 text-xs text-slate-500">{formData.name}, nossa equipe receberá o seu relatório para te ajudar.</p>
        </div>
      </div>
    )
  }

  const currentStep = STEPS[currentStepIndex]

  return (
    <div className="max-w-2xl mx-auto w-full bg-[#efeae2] sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[80vh] min-h-[600px]">
      {/* Header do Chat */}
      <div className="bg-[#005c4b] text-white p-4 flex items-center gap-3 shadow-md z-10">
        <BotAvatar />
        <div>
          <h2 className="font-bold text-lg leading-tight">Consultor de Modernização</h2>
          <p className="text-xs text-green-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4" 
        style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'contain', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(239, 234, 226, 0.9)' }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0 mt-auto">
              {msg.sender === 'bot' ? <BotAvatar /> : <UserAvatar />}
            </div>
            <div className={`p-3 rounded-2xl shadow-sm relative ${
              msg.sender === 'bot' 
                ? 'bg-white text-slate-800 rounded-bl-none' 
                : 'bg-[#d9fdd3] text-slate-800 rounded-br-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              <span className="text-[10px] text-slate-400 absolute bottom-1 right-2 opacity-80 mt-1 block w-full text-right">
                agora
              </span>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-2 max-w-[85%]">
             <div className="flex-shrink-0 mt-auto">
              <BotAvatar />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        {result && renderResult()}
      </div>

      {/* Área de Input e Ações */}
      {!loading && !result && currentStep && (
        <div className="bg-[#f0f2f5] p-3 border-t border-slate-200">
          
          {currentStep.type === 'single' && currentStep.options && (
            <div className="flex flex-wrap gap-2 justify-end mb-2">
              {currentStep.options.map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleSingleSelect(opt)}
                  className="bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 shadow-sm px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentStep.type === 'multiple' && currentStep.options && (
            <div className="flex flex-col gap-3 items-end mb-2 w-full">
              <div className="flex flex-wrap gap-2 justify-end">
                {currentStep.options.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => toggleMultiSelect(opt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border shadow-sm ${
                      multiSelectValues.includes(opt) 
                        ? 'bg-[#005c4b] text-white border-[#005c4b]' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button 
                onClick={submitMultiSelect}
                disabled={multiSelectValues.length === 0}
                className="bg-[#00a884] hover:bg-[#008f6f] text-white px-6 py-2 rounded-full font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Avançar
              </button>
            </div>
          )}

          {(currentStep.type === 'text' || currentStep.type === 'email' || currentStep.type === 'tel') && (
            <form onSubmit={handleTextSubmit} className="flex gap-2">
              <input 
                type={currentStep.type}
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua resposta..."
                className="flex-1 rounded-full px-4 py-3 border-none shadow-sm focus:ring-2 focus:ring-[#00a884] outline-none text-slate-800"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="bg-[#00a884] hover:bg-[#008f6f] text-white p-3 rounded-full flex items-center justify-center shadow-sm disabled:opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          )}

        </div>
      )}
    </div>
  )
}
