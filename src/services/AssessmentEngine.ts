export interface AssessmentAnswers {
  // Cenário Técnico
  targetSystem: string;
  hasSourceCode: string; // 'Completo', 'Parcial', 'Inexistente', 'Não sei'
  technology: string[]; // ['Delphi', 'Visual Basic', ...]
  database: string;
  documentation: string;
  
  // Negócio
  knowledgeCentralization: string; // 'Muitas pessoas', 'Poucas pessoas', 'Uma única pessoa', 'Quem sabia saiu'
  businessCriticality: string; // '1', '2', '3', '4', '5'
  motivation: string[];
  urgency: string; // 'Imediatamente', 'Até 30 dias', ...
}

export class AssessmentEngine {
  public static calculateComplexity(answers: AssessmentAnswers): number {
    let score = 20; // Base
    
    if (answers.technology.includes('COBOL') || answers.technology.includes('Delphi') || answers.technology.includes('Visual Basic')) {
      score += 20;
    }
    if (answers.database === 'Access' || answers.database === 'Excel' || answers.database === 'Arquivos texto/CSV') {
      score += 15;
    }
    
    return Math.min(100, score);
  }

  public static calculateReverseEngineeringRisk(answers: AssessmentAnswers): number {
    let score = 10;
    
    switch (answers.hasSourceCode) {
      case 'Inexistente': score += 40; break;
      case 'Parcial': score += 20; break;
      case 'Não sei': score += 30; break;
    }

    switch (answers.documentation) {
      case 'Não existe': score += 20; break;
      case 'Apenas manuais': score += 10; break;
    }

    switch (answers.knowledgeCentralization) {
      case 'Quem sabia saiu': score += 30; break;
      case 'Uma única pessoa': score += 20; break;
    }

    return Math.min(100, score);
  }

  public static calculateCriticality(answers: AssessmentAnswers): number {
    const val = parseInt(answers.businessCriticality || '1', 10);
    return Math.min(100, val * 20); // 1 = 20, 5 = 100
  }

  public static calculateIntent(answers: AssessmentAnswers): number {
    let score = 50;
    
    if (answers.urgency === 'Imediatamente') score += 40;
    else if (answers.urgency === 'Até 30 dias') score += 20;
    else if (answers.urgency === 'Apenas pesquisando') score -= 30;

    return Math.max(0, Math.min(100, score));
  }

  public static calculateAssessmentRange(complexity: number, risk: number) {
    const totalScore = (complexity + risk) / 2;
    
    let min = 2500;
    let max = 4000;

    if (totalScore > 20 && totalScore <= 40) {
      min = 4000; max = 7500;
    } else if (totalScore > 40 && totalScore <= 60) {
      min = 7500; max = 15000;
    } else if (totalScore > 60 && totalScore <= 80) {
      min = 15000; max = 30000;
    } else if (totalScore > 80) {
      min = 30000; max = 50000; // Enterprise base
    }

    // Multipliers
    let multiplier = 1.0;
    
    return {
      min: Math.round(min * multiplier),
      max: Math.round(max * multiplier),
    };
  }
}
