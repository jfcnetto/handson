'use client'

import { useState } from 'react'
import { createLead } from '@/actions/lead'
import { useRouter } from 'next/navigation'

export default function LeadForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createLead(formData)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      e.currentTarget.reset()
      router.refresh() // Atualiza os dados no servidor
    }
  }

  return (
    <div className="bg-[var(--surface)] p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">Cadastrar Novo Lead</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-[var(--danger)] rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Nome Completo</label>
          <input name="name" type="text" required className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[var(--primary)] outline-none" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">E-mail Corporativo</label>
          <input name="email" type="email" required className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[var(--primary)] outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Empresa</label>
            <input name="company" type="text" required className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[var(--primary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Tamanho da Empresa</label>
            <select name="companySize" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[var(--primary)] outline-none bg-white">
              <option value="">Selecione...</option>
              <option value="1-99">1 a 99 func.</option>
              <option value="100-999">100 a 999 func.</option>
              <option value=">1000">Mais de 1000 func.</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Cargo / Função</label>
          <input name="jobTitle" type="text" required placeholder="Ex: Diretor de Vendas, Analista de Marketing" className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[var(--primary)] outline-none" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white p-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Lead'}
        </button>
      </form>
    </div>
  )
}
