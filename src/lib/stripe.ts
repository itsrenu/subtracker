// Mock Stripe integration for demo purposes
// In production, you would use the actual Stripe API

export interface StripeProduct {
  id: string
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: string[]
}

export const products: StripeProduct[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Track up to 3 subscriptions',
    price: 0,
    interval: 'month',
    features: [
      '3 subscription tracking',
      'Basic usage alerts',
      'Email notifications'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Unlimited subscriptions + smart features',
    price: 2.99,
    interval: 'month',
    features: [
      'Unlimited subscription tracking',
      'Smart usage detection',
      'Price change alerts',
      'Family plan finder',
      'Annual savings report',
      'Priority support'
    ]
  }
]

// Mock user subscription status
export interface UserSubscription {
  id: string
  productId: string
  status: 'active' | 'cancelled' | 'past_due'
  currentPeriodEnd: string
}

// Mock current user subscription (in production, this would come from your database)
let currentUserSubscription: UserSubscription | null = null

export const getCurrentSubscription = (): UserSubscription | null => {
  return currentUserSubscription
}

export const isProUser = (): boolean => {
  return currentUserSubscription?.productId === 'pro' && currentUserSubscription?.status === 'active'
}

export const createCheckoutSession = async (productId: string): Promise<string> => {
  // In production, this would create a real Stripe checkout session
  console.log(`Creating checkout session for product: ${productId}`)
  
  // Simulate successful upgrade for demo
  if (productId === 'pro') {
    currentUserSubscription = {
      id: 'mock_subscription_id',
      productId: 'pro',
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    }
  }
  
  return 'mock_checkout_session_id'
}

export const cancelSubscription = async (): Promise<void> => {
  // In production, this would cancel the Stripe subscription
  if (currentUserSubscription) {
    currentUserSubscription.status = 'cancelled'
  }
}

export const getUsageLimit = (): number => {
  return isProUser() ? Infinity : 3
}

export const canAccessFeature = (feature: string): boolean => {
  if (!isProUser()) {
    const restrictedFeatures = [
      'unlimited_tracking',
      'smart_usage_detection',
      'price_alerts',
      'family_finder',
      'savings_report'
    ]
    return !restrictedFeatures.includes(feature)
  }
  return true
}