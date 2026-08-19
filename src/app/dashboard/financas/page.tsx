export default function FinancasPage() {
  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Finanças</h1>
          <p className="text-slate-500 mt-1">Gestão financeira, faturamento e fluxo de caixa.</p>
        </div>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Módulo em Desenvolvimento</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            A área de finanças está sendo construída. Em breve você poderá acompanhar propostas faturadas, fluxo de caixa e relatórios financeiros diretamente por aqui.
          </p>
        </div>
      </div>
    </>
  )
}
