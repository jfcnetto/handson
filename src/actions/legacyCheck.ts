'use server'

import prisma from '@/lib/prisma'
import { AssessmentEngine, AssessmentAnswers } from '@/services/AssessmentEngine'
import { revalidatePath } from 'next/cache'

export async function submitLegacyCheck(data: any) {
  try {
    const answers: AssessmentAnswers = {
      targetSystem: data.targetSystem,
      hasSourceCode: data.hasSourceCode,
      technology: data.technology,
      database: data.database,
      documentation: data.documentation,
      knowledgeCentralization: data.knowledgeCentralization,
      businessCriticality: data.businessCriticality,
      motivation: data.motivation,
      urgency: data.urgency
    }

    const legacyComplexityScore = AssessmentEngine.calculateComplexity(answers)
    const reverseEngineeringRisk = AssessmentEngine.calculateReverseEngineeringRisk(answers)
    const businessCriticalityScore = AssessmentEngine.calculateCriticality(answers)
    const leadIntentScore = AssessmentEngine.calculateIntent(answers)

    const totalScore = (legacyComplexityScore + reverseEngineeringRisk) / 2

    // Get pricing tier from DB
    const tiers = await prisma.pricingTier.findMany()
    let matchedTier = tiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore)
    
    // Fallback logic in case DB is empty or score is out of bounds
    let estimateMin = 2500
    let estimateMax = 4000
    if (matchedTier) {
      estimateMin = matchedTier.minValue
      estimateMax = matchedTier.maxValue
    }

    let recommendedService = 'Hands On Legacy Check'
    if (legacyComplexityScore > 40 || reverseEngineeringRisk > 40) {
      recommendedService = 'Hands On Legacy Assessment'
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        jobTitle: data.jobTitle,
        companySize: data.companySize,

        targetSystem: data.targetSystem,
        hasSourceCode: data.hasSourceCode,
        technology: data.technology.join(', '),
        database: data.database,
        documentation: data.documentation,

        knowledgeCentralization: data.knowledgeCentralization,
        businessCriticality: data.businessCriticality,
        motivation: data.motivation.join(', '),
        urgency: data.urgency,

        legacyComplexityScore,
        reverseEngineeringRisk,
        businessCriticalityScore,
        leadIntentScore,

        estimatedRangeMin: estimateMin,
        estimatedRangeMax: estimateMax,
        recommendedService,
        
        status: 'NEW'
      }
    })

    revalidatePath('/dashboard')

    return { 
      success: true, 
      leadId: lead.id, 
      legacyComplexityScore, 
      reverseEngineeringRisk,
      businessCriticalityScore,
      hasSourceCode: data.hasSourceCode,
      knowledgeCentralization: data.knowledgeCentralization,
      database: data.database,
      estimatedRangeMin: estimateMin, 
      estimatedRangeMax: estimateMax 
    }
  } catch (error) {
    console.error('Submit Legacy Check Error:', error)
    return { success: false, error: 'Erro ao processar avaliação.' }
  }
}
