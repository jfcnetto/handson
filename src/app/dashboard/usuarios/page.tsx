'use client'

import { useState, useEffect } from 'react'
import { listUsers, createUser, deleteUser, updateUser } from '@/actions/user'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { firebaseConfig } from '@/lib/firebase'

export default function UsuariosPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'OPERATOR' })
  const [editId, setEditId] = useState<string | null>(null)
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
    
    let res;
    if (editId) {
      res = await updateUser(editId, { name: formData.name, role: formData.role })
    } else {
      res = await createUser(formData)
    }

    if (res.success) {
      if (editId) {
        setFormData({ name: '', email: '', role: 'OPERATOR' })
        setEditId(null)
        fetchUsers()
        alert('Usuário atualizado com sucesso!')
      } else {
      try {
        // Utilizamos um app secundário para não deslogar o administrador atual
        const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp_" + Date.now())
        const secondaryAuth = getAuth(secondaryApp)
        
        // Senha temporária forte (o usuário será forçado a redefinir)
        const tempPassword = Math.random().toString(36).slice(-10) + "A1@xZ"
        
        await createUserWithEmailAndPassword(secondaryAuth, formData.email, tempPassword)
        await sendPasswordResetEmail(secondaryAuth, formData.email)
        await signOut(secondaryAuth)
        
        setFormData({ name: '', email: '', role: 'OPERATOR' })
        fetchUsers()
        alert('Usuário criado com sucesso! Um e-mail foi enviado para ele definir a senha.')
      } catch (fbError: any) {
        console.error("Firebase auth error:", fbError)
        // Se o erro for de email já em uso, significa que o usuário já existe no Firebase (talvez tenha sido excluído apenas no banco).
        // Nesse caso, o usuário já foi recriado com sucesso no nosso banco Prisma (linhas acima), então apenas disparamos um reset de senha.
        if (fbError.code === 'auth/email-already-in-use') {
          try {
            const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp2_" + Date.now())
            const secondaryAuth = getAuth(secondaryApp)
            await sendPasswordResetEmail(secondaryAuth, formData.email)
            await signOut(secondaryAuth)
            
            setFormData({ name: '', email: '', role: 'OPERATOR' })
            fetchUsers()
            alert('Usuário recriado! Como ele já existia no Firebase, enviamos apenas um e-mail de redefinição de senha.')
          } catch (resetErr) {
            setError("Usuário recriado no banco, mas erro ao enviar reset de senha: " + fbError.message)
          }
        } else {
          setError("Usuário criado no banco, mas erro no Firebase: " + fbError.message)
        }
      }
      }
    } else {
      setError(res.error || (editId ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário'))
    }
    setSubmitLoading(false)
  }

  const handleEdit = (user: any) => {
    setFormData({ name: user.name, email: user.email, role: user.role })
    setEditId(user.id)
    setError('')
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o usuário ${name}? Ele perderá o acesso ao CRM imediatamente.`)) {
      setLoading(true)
      const res = await deleteUser(id)
      if (res.success) {
        fetchUsers()
      } else {
        alert(res.error || 'Erro ao excluir usuário')
        setLoading(false)
      }
    }
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
            <h2 className="text-lg font-bold text-slate-800 mb-4">{editId ? 'Editar Usuário' : 'Novo Usuário'}</h2>
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
                  disabled={!!editId}
                  className={`w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${editId ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-900'}`}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {editId ? 'O e-mail não pode ser alterado.' : 'Este e-mail deve ser o mesmo utilizado para login no Google.'}
                </p>
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
              <div className="flex space-x-2">
                {editId && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditId(null);
                      setFormData({ name: '', email: '', role: 'OPERATOR' });
                      setError('');
                    }}
                    className="flex-1 bg-slate-200 text-slate-700 font-medium py-2 rounded-md hover:bg-slate-300 transition"
                  >
                    Cancelar
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={submitLoading}
                  className={`flex-1 text-white font-medium py-2 rounded-md transition disabled:opacity-50 ${editId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {submitLoading ? (editId ? 'Atualizando...' : 'Criando...') : (editId ? 'Atualizar Usuário' : 'Cadastrar Usuário')}
                </button>
              </div>
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
                      <th className="pb-3 font-medium text-slate-500 text-sm text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-500">
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
                          <td className="py-3 text-center">
                            <button onClick={() => handleEdit(user)} className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-md transition mr-2" title="Editar Usuário">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            </button>
                            <button onClick={() => handleDelete(user.id, user.name)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition" title="Excluir Usuário">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
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
