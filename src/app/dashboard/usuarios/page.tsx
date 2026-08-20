'use client'

import { useState, useEffect } from 'react'
import { listUsers, createUser } from '@/actions/user'

export default function UsuariosPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'OPERATOR' })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await listUsers()
    if (res.success && res.users) {
      setUsers(res.users)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitLoading(true)
    setError('')
    
    const res = await createUser(formData)
    if (res.success) {
      setFormData({ name: '', email: '', role: 'OPERATOR' })
      fetchUsers()
    } else {
      setError(res.error || 'Erro ao criar usuário')
    }
    setSubmitLoading(false)
  }

  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Usuários</h1>
          <p className="text-slate-500 mt-1">Gerencie os acessos ao CRM Hands On!</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Novo Usuário</h2>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Nome</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">E-mail</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <p className="text-xs text-slate-500 mt-1">Este e-mail deve ser o mesmo utilizado para login no Google.</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">Perfil</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 font-medium"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="OPERATOR">Operador</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={submitLoading}
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitLoading ? 'Criando...' : 'Cadastrar Usuário'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Usuários Cadastrados</h2>
            
            {loading ? (
              <div className="py-8 text-center text-slate-500">Carregando...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="pb-3 font-medium text-slate-500 text-sm">Nome / E-mail</th>
                      <th className="pb-3 font-medium text-slate-500 text-sm">Perfil</th>
                      <th className="pb-3 font-medium text-slate-500 text-sm text-right">Data de Cadastro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-slate-500">
                          Nenhum usuário encontrado.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition">
                          <td className="py-3">
                            <p className="font-bold text-slate-800">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                              {user.role === 'ADMIN' ? 'Administrador' : 'Operador'}
                            </span>
                          </td>
                          <td className="py-3 text-right text-sm text-slate-500">
                            {new Date(user.createdAt).toLocaleDateString('pt-BR')}
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
