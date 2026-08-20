import prisma from '@/lib/prisma'
import KanbanBoard from '@/components/KanbanBoard'

export default async function DashboardPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Ensure default status is set for old leads
  const processedLeads = leads.map((l: any) => ({
    ...l,
    status: l.status || 'NEW'
  }))

  const pricingTiers = await prisma.pricingTier.findMany({
    orderBy: { minScore: 'asc' }
  })

  // Calculate metrics
  const wonLeads = leads.filter(l => l.status === 'WON')
  
  // O Prisma client local não foi gerado com os novos campos closedValue e maintenanceMrr, 
  // então acessamos como any temporariamente até o npx prisma generate ser rodado pelo usuário.
  const totalClosed = wonLeads.reduce((sum, l: any) => sum + (l.closedValue || 0), 0)
  const totalMrr = wonLeads.reduce((sum, l: any) => sum + (l.maintenanceMrr || 0), 0)
  const projection12m = totalClosed + (totalMrr * 12)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <>
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pipeline de Vendas</h1>
          <p className="text-slate-500 mt-1">Acompanhe a evolução das oportunidades de modernização.</p>
        </div>
        
        {/* Painel Financeiro */}
        <div className="flex gap-4 flex-wrap">
          <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm min-w-[150px]">
            <p className="text-xs font-semibold text-slate-500 uppercase">Receita (Fechado)</p>
            <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalClosed)}</p>
          </div>
          <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm min-w-[150px]">
            <p className="text-xs font-semibold text-slate-500 uppercase">MRR (Recorrente)</p>
            <p className="text-xl font-bold text-blue-600">{formatCurrency(totalMrr)}</p>
          </div>
          <div className="bg-slate-900 px-4 py-3 rounded-lg border border-slate-800 shadow-sm min-w-[150px]">
            <p className="text-xs font-semibold text-slate-400 uppercase">Projeção 12m</p>
            <p className="text-xl font-bold text-white">{formatCurrency(projection12m)}</p>
          </div>
        </div>
      </header>

      <KanbanBoard initialLeads={processedLeads} pricingTiers={pricingTiers} />
    </>
  )
}

