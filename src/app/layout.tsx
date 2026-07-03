import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import PageViewTracker from "@/components/PageViewTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suachance.com.br"),
  title: {
    default: "Sua Chance | Cursinho Preparatório para ETEC e ENEM",
    template: "%s | Sua Chance Cursinho",
  },
  description:
    "Cursinho preparatório gratuito para ETEC e ENEM. Aulas de qualidade, professores dedicados e método comprovado de aprovação. Inscreva-se e dê o primeiro passo para o seu futuro!",
  keywords: [
    "cursinho preparatório",
    "ETEC",
    "ENEM",
    "cursinho gratuito",
    "vestibulinho ETEC",
    "preparação ENEM",
    "curso pré-vestibular",
    "sua chance cursinho",
    "aprovação ETEC",
    "ensino médio",
    "escola técnica",
  ],
  authors: [{ name: "Cursinho Sua Chance" }],
  creator: "Cursinho Sua Chance",
  publisher: "Cursinho Sua Chance",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://suachance.com.br",
    siteName: "Cursinho Sua Chance",
    title: "Sua Chance | Cursinho Preparatório para ETEC e ENEM",
    description:
      "Cursinho preparatório gratuito para ETEC e ENEM. Inscreva-se e conquiste sua vaga!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sua Chance - Cursinho Preparatório para ETEC e ENEM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sua Chance | Cursinho Preparatório para ETEC e ENEM",
    description:
      "Cursinho preparatório gratuito para ETEC e ENEM. Inscreva-se e conquiste sua vaga!",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://suachance.com.br",
  },
  icons: {
    icon: "/images/logos/Design sem nome (20).png",
    shortcut: "/images/logos/Design sem nome (20).png",
    apple: "/images/logos/Design sem nome (20).png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Cursinho Preparatório Sua Chance",
  description:
    "Cursinho preparatório gratuito para ETEC e ENEM com método comprovado de aprovação.",
  url: "https://suachance.com.br",
  sameAs: [],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "Cursinho preparatório gratuito para ETEC e ENEM",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
