import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Hands On! | Modernização de Sistemas Legados e Engenharia Reversa",
  description: "Especialistas na modernização de sistemas legados, migração de banco de dados, engenharia reversa e desenvolvimento de software corporativo.",
  keywords: "Modernização de Sistemas Legados, Engenharia Reversa, Migração de Dados, Consultoria e Desenvolvimento de Software",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://handson-dun.vercel.app/',
    title: 'Hands On! | Modernização de Sistemas Legados e Engenharia Reversa',
    description: 'Especialistas na modernização de sistemas legados, migração de banco de dados, engenharia reversa e desenvolvimento de software corporativo.',
    images: [
      {
        url: 'https://handson-dun.vercel.app/og-image.jpg',
        width: 1200,
        height: 675,
        alt: 'Hands On! - Modernização de Sistemas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hands On! | Modernização de Sistemas',
    description: 'Especialistas na modernização de sistemas legados.',
    images: ['https://handson-dun.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Hands On!",
              "image": "https://handson-dun.vercel.app/og-image.jpg",
              "url": "https://handson-dun.vercel.app/",
              "telephone": "+5561994005941",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Qd. 13 Lote 16 Lj. 01 Setor Leste",
                "addressLocality": "Gama",
                "addressRegion": "DF",
                "postalCode": "72450-130",
                "addressCountry": "BR"
              },
              "description": "Especialistas na modernização de sistemas legados, migração de banco de dados, engenharia reversa e desenvolvimento de software corporativo."
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
