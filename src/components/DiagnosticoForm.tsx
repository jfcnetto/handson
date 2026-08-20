'use client'

import { useState } from 'react'
import { submitLegacyCheck } from '@/actions/legacyCheck'

export default function DiagnosticoForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', jobTitle: '', companySize: '',
    targetSystem: '', hasSourceCode: '', technology: [] as string[], database: '', documentation: '',
    knowledgeCentralization: '', businessCriticality: '', motivation: [] as string[], urgency: ''
  })

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked ? [...(prev[name as keyof typeof prev] as string[]), value] : (prev[name as keyof typeof prev] as string[]).filter(v => v !== value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const res = await submitLegacyCheck(formData)
    
    if (res.success) {
      try {
        await fetch("https://formsubmit.co/ajax/jfcnetto@gmail.com", {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              _subject: "Nova consulta sobre sistemas (Diagnóstico)",
              Nome: formData.name,
              Email: formData.email,
              Empresa: formData.company,
              Telefone: formData.phone,
              Cargo: formData.jobTitle,
              Score: res.legacyComplexityScore || "Calculado"
          })
        });
      } catch (err) {
        console.error("Erro ao enviar email", err);
      }
      
      setResult(res)
      setStep(4)
    } else {
      alert('Erro ao processar dados')
    }
    setLoading(false)
  }

  if (step === 4 && result) {
    const isSourceAvailable = result.hasSourceCode === 'Completo' || result.hasSourceCode === 'Parcial';
    const isKeyPerson = result.knowledgeCentralization === 'Uma única pessoa' || result.knowledgeCentralization === 'Quem sabia saiu';
    const isDbExtractable = result.database === 'PostgreSQL' || result.database === 'SQL Server' || result.database === 'Oracle';
    
    // Format whatsapp text
    const text = encodeURIComponent(`Olá, realizei o Legacy Check da minha empresa (${formData.company}) e gostaria de receber o meu Relatório em PDF. Lead ID: ${result.leadId || ''}`);

    return (
      <div className="max-w-3xl mx-auto px-4 bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Diagnóstico Concluído</h2>
        
        <div className="space-y-6 mb-8">
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

        <h3 className="text-xl font-bold text-slate-900 mb-4">Principais riscos identificados</h3>
        <ul className="space-y-3 mb-10">
          <li className="flex items-center gap-3">
            {isSourceAvailable ? '🟢' : '🔴'} <span className="text-slate-700">Código-fonte {isSourceAvailable ? 'disponível' : 'indisponível'}</span>
          </li>
          <li className="flex items-center gap-3">
            {isKeyPerson ? '🔴' : '🟢'} <span className="text-slate-700">{isKeyPerson ? 'Dependência extrema de pessoa-chave' : 'Conhecimento distribuído'}</span>
          </li>
          <li className="flex items-center gap-3">
            {isDbExtractable ? '🟢' : '🟠'} <span className="text-slate-700">Banco de dados {isDbExtractable ? 'extraível' : 'com extração complexa'} {result.database && `(${result.database})`}</span>
          </li>
        </ul>

        <div className="text-center">
          <a href={`https://wa.me/5561994005941?text=${text}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-md w-full sm:w-auto">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            RECEBER RELATÓRIO COMPLETO EM PDF
          </a>
          <p className="mt-4 text-sm text-slate-500">O relatório detalhado será enviado diretamente no seu WhatsApp.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Faça o Diagnóstico do seu Sistema</h2>
        <p className="text-slate-500 mt-2">Etapa {step} de 3</p>
        <div className="w-full bg-slate-200 h-2 mt-4 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-left">
        
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Identificação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nome</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">E-mail Corporativo</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Telefone / WhatsApp</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Empresa</label>
                <input required type="text" name="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Cargo</label>
                <select required name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                  <option value="">Selecione...</option>
                  <option value="Diretor / CEO / CTO">Diretor / CEO / CTO</option>
                  <option value="Gerente / Coordenador">Gerente / Coordenador</option>
                  <option value="Proprietário / Sócio">Proprietário / Sócio</option>
                  <option value="Especialista / Analista">Especialista / Analista</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Tamanho da Empresa</label>
                <select required name="companySize" value={formData.companySize} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                  <option value="">Selecione...</option>
                  <option value="1-10">1-10 funcionários</option>
                  <option value="11-50">11-50 funcionários</option>
                  <option value="51-200">51-200 funcionários</option>
                  <option value="201-500">201-500 funcionários</option>
                  <option value="500+">Mais de 500 funcionários</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Cenário Técnico</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">O que você deseja modernizar?</label>
              <select required name="targetSystem" value={formData.targetSystem} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="Sistema legado">Sistema legado genérico</option>
                <option value="Sistema desktop">Sistema desktop (Instalado)</option>
                <option value="Excel">Planilhas Excel</option>
                <option value="Access">Microsoft Access</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Você possui o código-fonte?</label>
              <select required name="hasSourceCode" value={formData.hasSourceCode} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="Completo">Sim, completo</option>
                <option value="Parcial">Apenas parte dele</option>
                <option value="Inexistente">Não possuímos</option>
                <option value="Não sei">Não sei informar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sabe a tecnologia original?</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {['Delphi', 'Visual Basic', 'Java', '.NET', 'PHP', 'COBOL', 'Excel/VBA', 'Access', 'Não sei'].map(tech => (
                  <label key={tech} className="flex items-center space-x-2 p-2 border rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" name="technology" value={tech} checked={formData.technology.includes(tech)} onChange={handleChange} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Onde estão os dados?</label>
              <select required name="database" value={formData.database} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="SQL Server">SQL Server</option>
                <option value="Oracle">Oracle</option>
                <option value="PostgreSQL">PostgreSQL/MySQL</option>
                <option value="Access">Access / DBF</option>
                <option value="Excel">Excel / CSV</option>
                <option value="Não sabemos">Não sabemos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Existe documentação?</label>
              <select required name="documentation" value={formData.documentation} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="Completa e atualizada">Completa e atualizada</option>
                <option value="Parcial">Parcial</option>
                <option value="Apenas manuais">Apenas manuais antigos</option>
                <option value="Não existe">Não existe</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Impacto no Negócio</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quem sabe como o sistema realmente funciona?</label>
              <select required name="knowledgeCentralization" value={formData.knowledgeCentralization} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="Muitas pessoas">Muitos funcionários conhecem</option>
                <option value="Poucas pessoas">Apenas poucas pessoas conhecem</option>
                <option value="Uma única pessoa">Uma única pessoa centraliza tudo</option>
                <option value="Quem sabia saiu">A pessoa que conhecia não está mais na empresa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Se o sistema parasse, o que aconteceria? (1 a 5)</label>
              <select required name="businessCriticality" value={formData.businessCriticality} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="1">1 - Pouco impacto</option>
                <option value="2">2 - Algumas atividades prejudicadas</option>
                <option value="3">3 - Um departamento poderia parar</option>
                <option value="4">4 - Parte importante da empresa pararia</option>
                <option value="5">5 - A operação inteira pararia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Urgência para iniciar</label>
              <select required name="urgency" value={formData.urgency} onChange={handleChange} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 p-2 border">
                <option value="">Selecione...</option>
                <option value="Imediatamente">Imediatamente (Crítico)</option>
                <option value="Até 30 dias">Até 30 dias</option>
                <option value="3-6 meses">3 a 6 meses</option>
                <option value="Apenas pesquisando">Apenas pesquisando preço</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between pt-4 border-t border-slate-100">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="px-6 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium transition-colors">
              Voltar
            </button>
          )}
          {step < 3 ? (
            <button type="submit" className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors shadow-sm">
              Próximo
            </button>
          ) : (
            <button type="submit" disabled={loading} className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-bold transition-colors shadow-sm disabled:opacity-50 flex items-center">
              {loading ? 'Calculando...' : 'Ver Meu Diagnóstico'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
