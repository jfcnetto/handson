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

  return (
    <>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pipeline de Vendas</h1>
          <p className="text-slate-500 mt-1">Acompanhe a evolução das oportunidades de modernização.</p>
        </div>
      </header>

      <KanbanBoard initialLeads={processedLeads} pricingTiers={pricingTiers} />
    </>
  )
}
