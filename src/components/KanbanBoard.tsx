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

export default function KanbanBoard({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [updating, setUpdating] = useState<string | null>(null)

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
                  <div key={lead.id} className={`bg-white p-4 rounded-xl shadow-sm border ${isHot ? 'border-red-200' : 'border-slate-200'} flex flex-col gap-3 relative ${updating === lead.id ? 'opacity-50' : ''}`}>
                    {isHot && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">HOT 🔥</span>}
                    
                    <div>
                      <p className="font-bold text-slate-800 text-sm line-clamp-1" title={lead.company}>{lead.company}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{lead.name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Score</span>
                        <span className="text-sm font-bold text-blue-600">{lead.legacyComplexityScore}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Intent</span>
                        <span className="text-sm font-bold text-green-600">{lead.leadIntentScore}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-1">
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
  )
}
