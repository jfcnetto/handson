'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Tipagem do Lead prospectado
export type ProspectResult = {
  name: string
  rating: number
  userRatingsTotal: number
  website: string | null
  phone: string | null
  address: string | null
  niche: string
  city: string
  mockedEmail?: string
}

export async function searchProspects(niche: string, city: string): Promise<{ success: boolean; data?: ProspectResult[]; error?: string }> {
  try {
    const SERPER_API_KEY = process.env.SERPER_API_KEY;
    if (!SERPER_API_KEY) {
      return { success: false, error: "A chave SERPER_API_KEY não está configurada no .env. Cadastre-se grátis em serper.dev" };
    }

    const query = `${niche} em ${city}`;
    
    const response = await fetch("https://google.serper.dev/places", {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: query,
        gl: "br",
        hl: "pt-br"
      })
    });

    const data = await response.json();

    if (!data.places || data.places.length === 0) {
      return { success: false, error: "Nenhum resultado encontrado para esta busca." };
    }

    const results: ProspectResult[] = [];
    
    for (const place of data.places) {
      // Filtro 1: Rating >= 4.5 e pelo menos 10 avaliações
      const rating = place.rating || 0;
      const reviews = place.ratingCount || 0;

      if (rating >= 4.5 && reviews >= 10) {
        results.push({
          name: place.title,
          rating: rating,
          userRatingsTotal: reviews,
          website: place.website || null,
          phone: place.phoneNumber || null,
          address: place.address || null,
          niche,
          city,
          mockedEmail: '' // Email a ser deduzido no painel
        });
      }
    }

    return { success: true, data: results };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addProspectToFunnel(prospect: ProspectResult, prospectReason: string) {
  try {
    const newLead = await prisma.lead.create({
      data: {
        name: "Responsável", // Como o Maps não dá o nome do dono, colocamos genérico
        company: prospect.name,
        email: prospect.mockedEmail || `${prospect.name.toLowerCase().replace(/\s/g, '')}@example.com`,
        phone: prospect.phone,
        status: 'NEW',
        targetSystem: prospect.website || 'Sem site próprio',
        motivation: prospectReason,
        prospectReason: prospectReason,
        
        // Atribuimos um score de intenção manual para leads outbound (frios)
        leadIntentScore: 30,
        businessCriticalityScore: 60,
        legacyComplexityScore: 40,
        reverseEngineeringRisk: 30,
      }
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/prospeccao');
    
    return { success: true, lead: newLead };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
