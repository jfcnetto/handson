'use server'

import prisma from '@/lib/prisma'
import { AssessmentEngine, AssessmentAnswers } from '@/services/AssessmentEngine'

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

    const estimate = AssessmentEngine.calculateAssessmentRange(legacyComplexityScore, reverseEngineeringRisk)

    let recommendedService = 'Hands On Legacy Check'
    if (legacyComplexityScore > 40 || reverseEngineeringRisk > 40) {
      recommendedService = 'Hands On Legacy Assessment'
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
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

        estimatedRangeMin: estimate.min,
        estimatedRangeMax: estimate.max,
        recommendedService,
        
        status: 'NEW'
      }
    })

    return { success: true, leadId: lead.id, legacyComplexityScore, estimatedRangeMin: estimate.min, estimatedRangeMax: estimate.max }
  } catch (error) {
    console.error('Submit Legacy Check Error:', error)
    return { success: false, error: 'Erro ao processar avaliação.' }
  }
}
