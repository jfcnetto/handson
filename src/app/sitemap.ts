import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://handson-dun.vercel.app'

  // Standard routes
  const routes = [
    '',
    '/sobre',
    '/contato',
    '/diagnostico',
    '/termos-uso',
    '/privacidade',
    '/modernizacao-sistemas-legados',
    '/sistema-sem-codigo-fonte',
    '/excel-para-sistema',
    '/migracao-access',
    '/engenharia-reversa-software',
    '/consultoria-sistemas',
    '/migracao-banco-dados'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
