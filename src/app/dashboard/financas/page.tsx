'use client'

import { useState, useEffect } from 'react'
import { createTransaction, listTransactions, deleteTransaction, getLeadsForFinance } from '@/actions/finance'

export default function FinancasPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 })
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState('')
  const [leads, setLeads] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'INCOME',
    date: new Date().toISOString().split('T')[0],
    leadId: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [financeRes, leadsRes] = await Promise.all([
      listTransactions(),
      getLeadsForFinance()
    ])
    
    if (financeRes.success && financeRes.transactions && financeRes.summary) {
      setTransactions(financeRes.transactions)
      setSummary(financeRes.summary)
    } else {
      setError(financeRes.error || 'Erro ao carregar os dados.')
    }
    
    if (leadsRes.success && leadsRes.leads) {
      setLeads(leadsRes.leads)
    }
    
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.description || !formData.amount) return
    
    setSubmitLoading(true)
    setError('')
    
    const amountFloat = parseFloat(formData.amount.replace(',', '.'))
    
    const res = await createTransaction({
      description: formData.description,
      amount: amountFloat,
      type: formData.type,
      date: formData.date,
      leadId: formData.leadId || undefined
    })
    
    if (res.success) {
      setFormData({
        description: '',
        amount: '',
        type: 'INCOME',
        date: new Date().toISOString().split('T')[0],
        leadId: ''
      })
      fetchData()
    } else {
      setError(res.error || 'Erro ao salvar transação')
    }
    
    setSubmitLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return
    
    const res = await deleteTransaction(id)
    if (res.success) {
      fetchData()
    } else {
      alert('Erro ao excluir transação.')
    }
  }

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Finanças</h1>
          <p className="text-slate-500 mt-1">Controle de fluxo de caixa e histórico de pagamentos</p>
        </div>
      </header>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 mb-1">Receitas</p>
          <h3 className="text-3xl font-bold text-emerald-600">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summary.income)}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 mb-1">Despesas</p>
          <h3 className="text-3xl font-bold text-red-600">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summary.expense)}
          </h3>
        </div>
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 ${summary.balance < 0 ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
          <p className="text-sm font-medium text-slate-500 mb-1">Saldo Atual</p>
          <h3 className={`text-3xl font-bold ${summary.balance < 0 ? 'text-red-700' : 'text-blue-700'}`}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summary.balance)}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Novo Lançamento</h2>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Descrição</label>
                <input 
                  type="text" 
                  list="finance-services"
                  required 
                  placeholder="Ex: Consultoria Sistema Legado"
                  className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
                <datalist id="finance-services">
                  <option value="Assessment Técnico (Diagnóstico)" />
                  <option value="Engenharia Reversa de Sistema" />
                  <option value="Modernização de Sistema Legado" />
                  <option value="Migração de Banco de Dados" />
                  <option value="Consultoria de Arquitetura" />
                  <option value="Mensalidade / Hospedagem" />
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Cliente / Lead (Opcional)</label>
                <select
                  className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                  value={formData.leadId}
                  onChange={e => setFormData({...formData, leadId: e.target.value})}
                >
                  <option value="">-- Nenhum --</option>
                  {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>{lead.company} ({lead.name})</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Valor (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    required 
                    className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Data</label>
                  <input 
                    type="date" 
                    required 
                    className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Tipo</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-slate-300 rounded-md flex-1 bg-white">
                    <input 
                      type="radio" 
                      name="type" 
                      value="INCOME"
                      checked={formData.type === 'INCOME'}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-emerald-700">Receita</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-slate-300 rounded-md flex-1 bg-white">
                    <input 
                      type="radio" 
                      name="type" 
                      value="EXPENSE"
                      checked={formData.type === 'EXPENSE'}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-sm font-medium text-red-700">Despesa</span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={submitLoading}
                className="w-full bg-slate-900 text-white font-medium py-2 rounded-md hover:bg-slate-800 transition disabled:opacity-50 mt-2"
              >
                {submitLoading ? 'Lançando...' : 'Adicionar Lançamento'}
              </button>
            </form>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Extrato de Movimentações</h2>
            
            {loading ? (
              <div className="py-12 text-center text-slate-500">Carregando movimentações...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="pb-3 font-medium text-slate-500 text-sm">Data</th>
                      <th className="pb-3 font-medium text-slate-500 text-sm">Descrição</th>
                      <th className="pb-3 font-medium text-slate-500 text-sm text-right">Valor</th>
                      <th className="pb-3 font-medium text-slate-500 text-sm text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-slate-500">
                          Nenhuma movimentação registrada.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50 transition group">
                          <td className="py-3 text-sm text-slate-600 whitespace-nowrap">
                            {new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                          </td>
                          <td className="py-3">
                            <p className="font-semibold text-slate-800">{t.description}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${t.type === 'INCOME' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {t.type === 'INCOME' ? 'Entrada' : 'Saída'}
                              </span>
                              {t.lead && (
                                <span className="text-[10px] font-medium text-slate-500 truncate max-w-[150px]" title={t.lead.company}>
                                  👤 {t.lead.company}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <span className={`font-bold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'}`}>
                              {t.type === 'INCOME' ? '+' : '-'}{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <button 
                              onClick={() => handleDelete(t.id)}
                              className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                              title="Excluir"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
