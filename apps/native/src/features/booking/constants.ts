import type { Ionicons } from '@expo/vector-icons'

export interface Service {
  id: string
  title: string
  price: string
  duration: string
  description: string
  icon: keyof typeof Ionicons.glyphMap
}

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Smart Contract Audit',
    price: '4.5 SOL',
    duration: '4 hours',
    description: 'Deep dive into your Solana program',
    icon: 'shield-checkmark-outline',
  },
  {
    id: '2',
    title: 'Architecture Review',
    price: '3.0 SOL',
    duration: '3 hours',
    description: 'Review of program architecture and system design',
    icon: 'construct-outline',
  },
  {
    id: '3',
    title: 'Code Review',
    price: '2.5 SOL',
    duration: '1 hour',
    description: 'Detailed line-by-line code review',
    icon: 'code-slash-outline',
  },
  {
    id: '4',
    title: 'Consultation',
    price: '1.5 SOL',
    duration: '30 min',
    description: 'General Q&A and technical guidance',
    icon: 'chatbubbles-outline',
  },
]
