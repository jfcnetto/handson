'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Regras de Classificação (RN10) - Removido (Não usado no novo modelo)
// Motor de Pontuação (RN05 a RN08)
function calculateScore(jobTitle: string, companySize: string | null, manualEngagement: number = 0) {
  let score = 0 // RN05: Inicia com 0

  // RN06: Fit Demográfico (Cargo)
  const job = jobTitle.toLowerCase()
  if (job.includes('diretor') || job.includes('c-level') || job.includes('ceo') || job.includes('cto')) {
    score += 20
  } else if (job.includes('gerente') || job.includes('coordenador')) {
    score += 10
  } else if (job.includes('analista')) {
    score += 5
  }

  // RN07: Tamanho da Empresa
  if (companySize) {
    if (companySize === '>1000') {
      score += 20
    } else if (companySize === '100-999') {
      score += 10
    }
  }

  // RN08: Engajamento Inicial (para simulação de MVP)
  score += manualEngagement

  return score
}

// Ação de criação de Lead (RN03)
export async function createLead(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const companySize = formData.get('companySize') as string
  const jobTitle = formData.get('jobTitle') as string

  if (!name || !email || !company || !jobTitle) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }

  // RN04: Prevenção de duplicidade
  const existingLead = await prisma.lead.findUnique({
    where: { email }
  })

  if (existingLead) {
    return { error: 'Um lead com este e-mail já existe.' }
  }

  const score = calculateScore(jobTitle, companySize)

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        company,
        companySize,
        jobTitle,
        leadIntentScore: score,
      }
    })
    return { success: true, lead }
  } catch (error) {
    console.error(error)
    return { error: 'Ocorreu um erro ao salvar o Lead no banco.' }
  }
}

// Ação para adicionar engajamento e recalcular (RN09)
export async function addEngagement(leadId: string, points: number) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } })
  
  if (!lead) return { error: 'Lead não encontrado.' }

  const newScore = lead.leadIntentScore + points

  try {
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        leadIntentScore: newScore,
      }
    })
    return { success: true, lead: updatedLead }
  } catch (error) {
    console.error(error)
    return { error: 'Falha ao atualizar a pontuação.' }
  }
}

export async function updateLeadStatus(leadId: string, newStatus: string) {
  try {
    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: { status: newStatus }
    })
    revalidatePath('/dashboard')
    return { success: true, lead: updated }
  } catch (err) {
    console.error("Error updating lead status:", err)
    return { success: false, error: "Erro ao atualizar status do lead." }
  }
}

export async function updateLeadDocument(leadId: string, document: string) {
  try {
    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: { document }
    })
    revalidatePath('/dashboard')
    return { success: true, lead: updated }
  } catch (err) {
    console.error("Error updating lead document:", err)
    return { success: false, error: "Erro ao atualizar documento do lead." }
  }
}
