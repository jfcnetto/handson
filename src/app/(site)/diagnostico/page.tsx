'use client'

import { useState } from 'react'
import { submitLegacyCheck } from '@/actions/legacyCheck'

export default function LegacyCheckPage() {
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
    return (
      <div className="bg-slate-50 min-h-screen py-24">
        <div className="max-w-3xl mx-auto px-4 bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Resultado do seu Diagnóstico</h2>
          <p className="text-slate-600 mb-8">Baseado nas informações fornecidas, calculamos o seguinte perfil para o seu sistema.</p>
          
          <div className="bg-slate-100 p-6 rounded-lg mb-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Seu DIAGNÓSTICO</h3>
            <div className="text-5xl font-extrabold text-blue-600">{result.legacyComplexityScore}<span className="text-2xl text-slate-400">/100</span></div>
            <div className="mt-2 font-semibold text-slate-800">
              {result.legacyComplexityScore > 60 ? 'COMPLEXIDADE ALTA' : result.legacyComplexityScore > 40 ? 'COMPLEXIDADE SIGNIFICATIVA' : 'COMPLEXIDADE MODERADA'}
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Estimativa Inicial de Investimento</h3>
            <p className="text-slate-600 mb-4 text-sm">
              Recomendamos que nossos especialistas façam uma análise técnica detalhada do seu sistema antes de começarmos qualquer atualização.
            </p>
            <div className="text-2xl font-bold text-green-600">
              R$ {result.estimatedRangeMin.toLocaleString('pt-BR')} – R$ {result.estimatedRangeMax.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-400 mt-2">* Valores preliminares baseados nas respostas e não constituem proposta definitiva.</p>
          </div>

          <p className="text-slate-600 text-sm"><strong>{formData.name}</strong>, nossos especialistas receberam seus dados e entrarão em contato para apresentar um plano detalhado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Diagnóstico</h1>
          <p className="text-slate-500 mt-2">Etapa {step} de 3</p>
          <div className="w-full bg-slate-200 h-2 mt-4 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Identificação</h2>
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

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Cenário Técnico</h2>
              
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

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Impacto no Negócio</h2>
              
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
    </div>
  )
}
