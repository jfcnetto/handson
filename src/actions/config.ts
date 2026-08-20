'use server'

import prisma from '@/lib/prisma'

const DEFAULT_TIERS = [
  { name: 'ESSENTIAL', minScore: 0, maxScore: 20, minValue: 2500, maxValue: 4000 },
  { name: 'STANDARD', minScore: 21, maxScore: 40, minValue: 4000, maxValue: 7500 },
  { name: 'ADVANCED', minScore: 41, maxScore: 60, minValue: 7500, maxValue: 15000 },
  { name: 'COMPLEX', minScore: 61, maxScore: 80, minValue: 15000, maxValue: 30000 },
  { name: 'ENTERPRISE', minScore: 81, maxScore: 100, minValue: 30000, maxValue: 60000 },
]

export async function listPricingTiers() {
  try {
    let tiers = await prisma.pricingTier.findMany({
      orderBy: { minScore: 'asc' }
    })
    
    // Auto-seed if empty
    if (tiers.length === 0) {
      for (const tier of DEFAULT_TIERS) {
        await prisma.pricingTier.create({ data: tier })
      }
      tiers = await prisma.pricingTier.findMany({
        orderBy: { minScore: 'asc' }
      })
    }
    
    return { success: true, tiers }
  } catch (err: any) {
    console.error("Error listing pricing tiers:", err)
    return { success: false, error: err?.message || "Erro ao carregar faixas de preço." }
  }
}

export async function updatePricingTier(id: string, data: { minValue: number, maxValue: number }) {
  try {
    await prisma.pricingTier.update({
      where: { id },
      data: {
        minValue: data.minValue,
        maxValue: data.maxValue
      }
    })
    return { success: true }
  } catch (err) {
    console.error("Error updating pricing tier:", err)
    return { success: false, error: "Erro ao atualizar faixa de preço." }
  }
}
