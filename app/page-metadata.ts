import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const homeMetadata = generateSEOMetadata({
  title: 'AI Healthcare Assistant - Find Doctors Who Take Your Insurance',
  description: 'Ron AI is your voice-activated personal healthcare coordinator. Find doctors who accept your insurance, book appointments instantly, and manage your entire healthcare journey with AI-powered assistance.',
  keywords: [
    'find doctor who takes my insurance near me',
    'AI healthcare assistant appointment booking',
    'voice activated medical appointment scheduling',
    'automated insurance eligibility verification',
    'personal healthcare coordinator AI',
    'healthcare navigation assistant',
    'AI medical appointment booking',
    'insurance verification automation'
  ],
  path: '/'
})

export const aboutMetadata = generateSEOMetadata({
  title: 'About Ron AI - Healthcare AI Innovation Leaders',
  description: 'Learn about Ron AI, the team behind Ron AI. We\'re building AI-powered healthcare solutions that help millions navigate the complex healthcare system with voice-activated assistance and automated insurance verification.',
  keywords: [
    'healthcare AI company',
    'medical technology innovation',
    'AI healthcare solutions provider',
    'healthcare automation company',
    'digital health transformation'
  ],
  path: '/about-us'
})

export const productsMetadata = generateSEOMetadata({
  title: 'AI Healthcare Products - Voice Assistant & Insurance Verification',
  description: 'Explore Ron AI\'s suite of healthcare products: AI-powered appointment booking, automated insurance verification, voice-activated healthcare navigation, and intelligent health record management.',
  keywords: [
    'AI healthcare products',
    'medical appointment scheduling software',
    'insurance verification system',
    'voice healthcare technology',
    'patient care coordination platform',
    'healthcare AI tools'
  ],
  path: '/our-products'
})

export const contactMetadata = generateSEOMetadata({
  title: 'Contact Ron AI - Get Started with AI Healthcare Solutions',
  description: 'Contact Ron AI to learn how Ron AI can transform your healthcare experience. Get a demo of our voice-activated healthcare assistant and automated insurance verification system.',
  keywords: [
    'contact healthcare AI company',
    'AI healthcare demo request',
    'healthcare technology support',
    'medical AI solutions inquiry'
  ],
  path: '/contact'
})

export const securityMetadata = generateSEOMetadata({
  title: 'HIPAA Compliant AI Healthcare Security & Compliance',
  description: 'Ron AI maintains the highest standards of healthcare data security. Learn about our HIPAA compliance, CMS certification, healthcare interoperability standards, and commitment to patient privacy.',
  keywords: [
    'HIPAA compliant AI healthcare',
    'healthcare data security',
    'medical AI compliance',
    'CMS certified healthcare technology',
    'healthcare interoperability standards',
    'patient data privacy'
  ],
  path: '/security-compliance'
})