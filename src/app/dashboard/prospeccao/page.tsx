'use client'

import { useState, useEffect } from 'react'
import { searchProspects, addProspectToFunnel, ProspectResult } from '@/actions/prospect'
import Link from 'next/link'

export default function ProspeccaoPage() {
  const [niche, setNiche] = useState('Contabilidade')
  
  // IBGE State/City
  const [states, setStates] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [selectedState, setSelectedState] = useState('')
  const [city, setCity] = useState('')

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ProspectResult[]>([])
  const [error, setError] = useState('')
  const [adding, setAdding] = useState<string | null>(null)
  const [addedProspects, setAddedProspects] = useState<string[]>([])

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error("Erro ao buscar estados", err))
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios?orderBy=nome`)
        .then(res => res.json())
        .then(data => {
          setCities(data)
          if (data.length > 0) {
            setCity(data[0].nome)
          }
        })
        .catch(err => console.error("Erro ao buscar municípios", err))
    } else {
      setCities([])
      setCity('')
    }
  }, [selectedState])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults([])

    const res = await searchProspects(niche, city)
    
    if (res.success && res.data) {
      setResults(res.data)
    } else {
      setError(res.error || 'Erro desconhecido ao buscar.')
    }
    setLoading(false)
  }

  const handleAddToFunnel = async (prospect: ProspectResult) => {
    setAdding(prospect.name)
    
    // Análise automática baseada no site
    let reason = ''
    if (!prospect.website) {
      reason = 'Empresa não possui site oficial, dependente apenas de redes sociais.'
    } else if (prospect.website.includes('wixsite') || prospect.website.includes('sites.google')) {
      reason = 'Utiliza hospedagem/domínio gratuito (Wix/Google Sites), passando pouca credibilidade.'
    } else {
      reason = 'Site aparenta ser desatualizado ou não otimizado para celular.'
    }

    const res = await addProspectToFunnel(prospect, reason)
    
    if (res.success) {
      alert(`✅ ${prospect.name} adicionado ao Kanban com sucesso!`)
      setAddedProspects(prev => [...prev, prospect.name])
    } else {
      alert(`❌ Erro ao adicionar: ${res.error}`)
    }
    setAdding(null)
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Radar de Prospecção
          </h1>
          <p className="text-slate-500 mt-1">Busque negócios locais altamente avaliados que precisam de modernização digital.</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Voltar ao Funil
        </Link>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow w-full md:w-1/3">
            <label className="block text-sm font-semibold text-black mb-1">Nicho / Setor</label>
            <input 
              type="text" 
              value={niche}
              onChange={e => setNiche(e.target.value)}
              placeholder="Ex: Clínica Odontológica, Advocacia"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent outline-none"
              required
            />
          </div>
          <div className="flex-grow w-full md:w-1/4">
            <label className="block text-sm font-semibold text-black mb-1">Estado</label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent outline-none"
              required
            >
              <option value="">Selecione...</option>
              {states.map(uf => (
                <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
              ))}
            </select>
          </div>
          <div className="flex-grow w-full md:w-1/3">
            <label className="block text-sm font-semibold text-black mb-1">Cidade / Região</label>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent outline-none"
              required
              disabled={!selectedState}
            >
              <option value="">Selecione...</option>
              {cities.map(c => (
                <option key={c.id} value={c.nome}>{c.nome}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading || !city}
            className="w-full md:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 h-[42px] flex items-center justify-center min-w-[140px]"
          >
            {loading ? 'Buscando...' : 'Prospectar'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Resultados ({results.length})</h2>
          {results.map((prospect, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-300 transition">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{prospect.name}</h3>
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {prospect.rating} ({prospect.userRatingsTotal} av.)
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 text-sm text-black mt-2 font-medium">
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {prospect.phone || 'Sem telefone'}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {prospect.address}
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    {prospect.mockedEmail || 'E-mail não identificado'}
                  </p>
                </div>
                
                <div className="mt-3">
                  {prospect.website ? (
                    <a href={prospect.website} target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                      {prospect.website}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  ) : (
                    <span className="text-red-500 text-sm font-semibold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      Negócio sem site próprio
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <button 
                  onClick={() => handleAddToFunnel(prospect)}
                  disabled={adding === prospect.name || addedProspects.includes(prospect.name)}
                  className={`px-5 py-2 rounded-lg font-semibold text-sm transition shadow-sm flex items-center gap-2 ${addedProspects.includes(prospect.name) ? 'bg-green-600 text-white cursor-not-allowed opacity-80' : 'bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50'}`}
                >
                  {adding === prospect.name ? (
                    'Adicionando...'
                  ) : addedProspects.includes(prospect.name) ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Adicionado
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                      Adicionar ao Funil
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
