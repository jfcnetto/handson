'use server'

import prisma from '@/lib/prisma'

export async function createTransaction(data: { description: string, amount: number, type: string, date: string, leadId?: string }) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: new Date(data.date),
        leadId: data.leadId || null
      }
    })
    return { success: true, transaction }
  } catch (err) {
    console.error("Error creating transaction:", err);
    return { success: false, error: "Erro ao criar transação." }
  }
}

export async function listTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      include: { lead: true }
    })
    
    // Calcula os totais
    let income = 0
    let expense = 0
    
    transactions.forEach(t => {
      if (t.type === 'INCOME') income += t.amount
      else if (t.type === 'EXPENSE') expense += t.amount
    })
    
    const balance = income - expense
    
    return { 
      success: true, 
      transactions,
      summary: { income, expense, balance }
    }
  } catch (err) {
    console.error("Error listing transactions:", err);
    return { success: false, error: "Erro ao carregar finanças." }
  }
}

export async function deleteTransaction(id: string) {
  try {
    await prisma.transaction.delete({
      where: { id }
    })
    return { success: true }
  } catch (err) {
    console.error("Error deleting transaction:", err);
    return { success: false, error: "Erro ao excluir transação." }
  }
}

export async function getLeadsForFinance() {
  try {
    const leads = await prisma.lead.findMany({
      select: { id: true, company: true, name: true },
      orderBy: { company: 'asc' }
    })
    return { success: true, leads }
  } catch (err) {
    console.error("Error fetching leads:", err);
    return { success: false, leads: [] }
  }
}
