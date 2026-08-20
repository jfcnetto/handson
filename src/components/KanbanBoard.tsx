'use client'

import { useState } from 'react'
import { updateLeadStatus } from '@/actions/lead'

const FUNNEL_STAGES = [
  { id: 'NEW', title: 'Novo Diagnóstico' },
  { id: 'QUALIFIED', title: 'Qualificado' },
  { id: 'CONTACT', title: 'Contato' },
  { id: 'MEETING', title: 'Reunião' },
  { id: 'PROPOSAL', title: 'Proposta' },
  { id: 'NEGOTIATION', title: 'Negociação' },
  { id: 'WON', title: 'Contratado' },
]

export default function KanbanBoard({ initialLeads, pricingTiers = [] }: { initialLeads: any[], pricingTiers?: any[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<any | null>(null)

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdating(leadId)
    // Optimistic UI update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))
    
    const res = await updateLeadStatus(leadId, newStatus)
    if (!res.success) {
      alert("Erro ao atualizar status.")
      // Revert if error
      setLeads(initialLeads)
    }
    setUpdating(null)
  }

  return (
    <>
      <div className="flex overflow-x-auto pb-8 gap-4 min-h-[600px]">
        {FUNNEL_STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage.id)
          
          return (
            <div key={stage.id} className="min-w-[300px] w-[300px] bg-slate-100/50 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-700 text-sm">{stage.title}</h3>
                <span className="bg-white text-slate-500 text-xs px-2 py-1 rounded-full shadow-sm">{stageLeads.length}</span>
              </div>
              
              <div className="flex flex-col gap-3 flex-grow">
                {stageLeads.map(lead => {
                  const isHot = lead.leadIntentScore > 75 && lead.businessCriticalityScore > 80;
                  
                  return (
                    <div 
                      key={lead.id} 
                      onClick={() => setSelectedLead(lead)}
                      className={`bg-white p-4 rounded-xl shadow-sm border ${isHot ? 'border-red-200' : 'border-slate-200'} flex flex-col gap-3 relative cursor-pointer hover:shadow-md transition hover:-translate-y-1 ${updating === lead.id ? 'opacity-50' : ''}`}
                    >
                      {isHot && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">HOT 🔥</span>}
                      
                      <div>
                        <p className="font-bold text-slate-800 text-sm line-clamp-1" title={lead.company}>{lead.company}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{lead.name}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 mt-1">
                        <div className="flex flex-col gap-2 text-xs">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block w-fit">
                            Score Técnico: {((lead.legacyComplexityScore + lead.reverseEngineeringRisk) / 2).toFixed(0)}/100
                          </span>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block w-fit">
                            Interesse de Compra: {lead.leadIntentScore}/100
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 mt-1" onClick={(e) => e.stopPropagation()}>
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          disabled={updating === lead.id}
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          {FUNNEL_STAGES.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )
                })}
                
                {stageLeads.length === 0 && (
                  <div className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-6">
                    <p className="text-xs text-slate-400 font-medium text-center">Nenhum lead</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedLead.company}</h2>
                <p className="text-sm text-slate-500">{selectedLead.name} - {selectedLead.jobTitle}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 transition p-2 hover:bg-slate-200 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contato & Perfil */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contato</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong className="text-slate-900">E-mail:</strong> {selectedLead.email}</p>
                      <p><strong className="text-slate-900">Telefone:</strong> {selectedLead.phone}</p>
                      <p><strong className="text-slate-900">Tamanho da Empresa:</strong> {selectedLead.companySize}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tecnologia</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong className="text-slate-900">Sistema Alvo:</strong> {selectedLead.targetSystem}</p>
                      <p><strong className="text-slate-900">Tech Stack:</strong> {selectedLead.technology}</p>
                      <p><strong className="text-slate-900">Banco de Dados:</strong> {selectedLead.database}</p>
                      <p><strong className="text-slate-900">Possui Código-fonte:</strong> {selectedLead.hasSourceCode}</p>
                      <p><strong className="text-slate-900">Documentação:</strong> {selectedLead.documentation}</p>
                    </div>
                  </div>
                </div>

                {/* Negócio & Dores */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Negócio</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong className="text-slate-900">Nível de Criticidade:</strong> {selectedLead.businessCriticality}</p>
                      <p><strong className="text-slate-900">Centralização de Conhecimento:</strong> {selectedLead.knowledgeCentralization}</p>
                      {selectedLead.legacyComplexityScore !== undefined && selectedLead.reverseEngineeringRisk !== undefined && (
                        <p>
                          <strong className="text-slate-900">Score Técnico (Diagnóstico):</strong>{' '}
                          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {((selectedLead.legacyComplexityScore + selectedLead.reverseEngineeringRisk) / 2).toFixed(0)}/100
                          </span>
                        </p>
                      )}
                      {(() => {
                        const totalScore = (selectedLead.legacyComplexityScore + selectedLead.reverseEngineeringRisk) / 2;
                        const matchedTier = pricingTiers.find((t: any) => totalScore >= t.minScore && totalScore <= t.maxScore);
                        const estMin = matchedTier ? matchedTier.minValue : selectedLead.estimatedRangeMin;
                        const estMax = matchedTier ? matchedTier.maxValue : selectedLead.estimatedRangeMax;
                        
                        if (estMin !== null && estMax !== null) {
                          return (
                            <p>
                              <strong className="text-slate-900">Valor Estimado:</strong>{' '}
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estMin)}
                              {' - '}
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estMax)}
                            </p>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Dores e Motivação</h3>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-900">
                      <p className="mb-2"><strong className="font-semibold">Urgência:</strong> {selectedLead.urgency}</p>
                      <p><strong className="font-semibold">Motivação:</strong> {selectedLead.motivation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalhes Adicionais se houver */}
              {selectedLead.details && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Detalhes Adicionais</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {selectedLead.details}
                  </p>
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3">
              <a 
                href={`mailto:${selectedLead.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Enviar E-mail
              </a>
              <a 
                href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, '') || ''}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
