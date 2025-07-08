export const siteConfig = {
  name: 'Ron AI - AI Healthcare Assistant | Healthcare Operating System',
  url: 'https://ron-ai.io',
  ogImage: 'https://ron-ai.io/og-image.jpg',
  description: 'Ron AI - Your personal healthcare operating system. Find doctors who take your insurance, book appointments with voice AI, compare medication prices, and manage medical records. Healthcare made easy.',
  keywords: [
    'find doctor who takes my insurance near me',
    'AI healthcare assistant appointment booking',
    'automated insurance eligibility verification',
    'voice activated medical appointment scheduling',
    'personal health record organization digital',
    'AI healthcare coordinator',
    'voice healthcare appointment booking',
    'healthcare AI assistant',
    'insurance verification automation',
    'medical appointment scheduling AI',
    'Ron AI healthcare operating system',
    'virtual care coordinator',
    'medication price comparison',
    'TEFCA medical records',
    'healthcare coordination platform',
    'copay assistance programs',
    'AI voice assistant healthcare',
    'automated appointment booking',
    'healthcare navigation AI',
    'insurance denial support'
  ]
}

export const generateMetadata = ({
  title,
  description,
  keywords,
  path = '',
  noIndex = false
}: {
  title: string
  description: string
  keywords?: string[]
  path?: string
  noIndex?: boolean
}) => {
  const url = `${siteConfig.url}${path}`
  const finalKeywords = keywords || siteConfig.keywords

  return {
    title: `${title} | Ron AI - Healthcare Operating System`,
    description,
    keywords: finalKeywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'Ron AI - AI-Powered Healthcare Assistant'
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  }
}

export const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
}

export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ron AI',
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: 'Ron AI develops AI-powered healthcare solutions including Ron AI, a personal healthcare coordinator that helps patients navigate the complex healthcare system.',
  sameAs: [
    'https://twitter.com/ronai',
    'https://linkedin.com/company/ron-ai',
    'https://facebook.com/ronai'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-xxx-xxx-xxxx',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English']
  }
}

export const jsonLdMedicalOrganization = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Ron AI Healthcare Solutions',
  description: 'AI-powered healthcare coordination platform helping patients find doctors, verify insurance, and manage appointments.',
  url: siteConfig.url,
  medicalSpecialty: [
    'Healthcare Technology',
    'Patient Care Coordination',
    'Healthcare AI'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healthcare AI Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Healthcare Assistant',
          description: 'Voice-activated healthcare coordination and appointment booking'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Insurance Verification',
          description: 'Automated insurance eligibility verification'
        }
      }
    ]
  }
}

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
})