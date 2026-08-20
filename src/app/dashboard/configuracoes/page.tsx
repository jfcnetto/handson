'use client'

import { useState, useEffect } from 'react'
import { listPricingTiers, updatePricingTier } from '@/actions/config'

export default function ConfigsPage() {
  const [tiers, setTiers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, { min: string, max: string }>>({})

  useEffect(() => {
    fetchTiers()
  }, [])

  const fetchTiers = async () => {
    setLoading(true)
    setErrorMsg(null)
    const res = await listPricingTiers()
    if (res.success && res.tiers) {
      setTiers(res.tiers)
      
      const values: Record<string, { min: string, max: string }> = {}
      res.tiers.forEach((t: any) => {
        values[t.id] = { min: t.minValue.toString(), max: t.maxValue.toString() }
      })
      setEditValues(values)
    } else {
      setErrorMsg(res.error || 'Erro desconhecido ao carregar configurações.')
    }
    setLoading(false)
  }

  const handleSave = async (id: string) => {
    setSaving(id)
    const minVal = parseFloat(editValues[id].min)
    const maxVal = parseFloat(editValues[id].max)
    
    if (isNaN(minVal) || isNaN(maxVal)) {
      alert("Valores inválidos")
      setSaving(null)
      return
    }

    const res = await updatePricingTier(id, { minValue: minVal, maxValue: maxVal })
    if (res.success) {
      // Re-fetch to ensure sync
      await fetchTiers()
    } else {
      alert(res.error || "Erro ao salvar")
    }
    setSaving(null)
  }

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-500 mt-1">Parametrização de regras de negócio e estimativas</p>
        </div>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Tabela de Preços (Assessment)</h2>
        <p className="text-sm text-slate-500 mb-6">
          Estes valores são usados para gerar as estimativas financeiras na etapa final do diagnóstico do site.
        </p>
        
        {loading ? (
          <div className="py-8 text-center text-slate-500">Carregando configurações...</div>
        ) : errorMsg ? (
          <div className="py-8 text-center text-red-500 font-medium">Erro: {errorMsg}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 font-medium text-slate-500 text-sm">Complexidade Técnica</th>
                  <th className="pb-3 font-medium text-slate-500 text-sm text-center">Score do Diagnóstico</th>
                  <th className="pb-3 font-medium text-slate-500 text-sm">Valor Mínimo (R$)</th>
                  <th className="pb-3 font-medium text-slate-500 text-sm">Valor Máximo (R$)</th>
                  <th className="pb-3 font-medium text-slate-500 text-sm">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-slate-50 transition">
                    <td className="py-4">
                      <span className="font-bold text-slate-800">{tier.name}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold">
                        {tier.minScore} a {tier.maxScore}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <input 
                        type="number"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-slate-900 font-semibold"
                        value={editValues[tier.id]?.min || ''}
                        onChange={(e) => setEditValues({
                          ...editValues, 
                          [tier.id]: { ...editValues[tier.id], min: e.target.value }
                        })}
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <input 
                        type="number"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-slate-900 font-semibold"
                        value={editValues[tier.id]?.max || ''}
                        onChange={(e) => setEditValues({
                          ...editValues, 
                          [tier.id]: { ...editValues[tier.id], max: e.target.value }
                        })}
                      />
                    </td>
                    <td className="py-4">
                      <button 
                        onClick={() => handleSave(tier.id)}
                        disabled={saving === tier.id || (editValues[tier.id].min === tier.minValue.toString() && editValues[tier.id].max === tier.maxValue.toString())}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving === tier.id ? 'Salvando...' : 'Salvar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
