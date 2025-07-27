import { Subscription } from './plaid'

export interface Alert {
  id: string
  type: 'usage' | 'price' | 'family' | 'cancellation'
  title: string
  message: string
  subscriptionId: string
  subscriptionName: string
  priority: 'high' | 'medium' | 'low'
  actionText: string
  actionUrl?: string
  dismissed: boolean
  createdAt: string
  potentialSavings?: number
}

export const generateAlerts = (subscriptions: Subscription[]): Alert[] => {
  const alerts: Alert[] = []

  subscriptions.forEach(subscription => {
    // Usage-based alerts
    if (subscription.lastUsed) {
      const daysSinceUsed = Math.floor(
        (new Date().getTime() - new Date(subscription.lastUsed).getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysSinceUsed >= 14) {
        alerts.push({
          id: `usage-${subscription.id}`,
          type: 'usage',
          title: `Haven't used ${subscription.name} in ${daysSinceUsed} days`,
          message: `You haven't used ${subscription.name} in ${daysSinceUsed} days. Consider canceling to save $${subscription.amount}/month.`,
          subscriptionId: subscription.id,
          subscriptionName: subscription.name,
          priority: daysSinceUsed >= 30 ? 'high' : 'medium',
          actionText: 'Cancel Subscription',
          dismissed: false,
          createdAt: new Date().toISOString(),
          potentialSavings: subscription.frequency === 'monthly' ? subscription.amount * 12 : subscription.amount
        })
      }
    }

    // Price increase alerts (mock data)
    if (subscription.name === 'Netflix') {
      alerts.push({
        id: `price-${subscription.id}`,
        type: 'price',
        title: 'Netflix increased prices',
        message: 'Netflix raised their price to $15.99/month. Hulu offers similar content for $7.99/month.',
        subscriptionId: subscription.id,
        subscriptionName: subscription.name,
        priority: 'medium',
        actionText: 'Compare Alternatives',
        dismissed: false,
        createdAt: new Date().toISOString(),
        potentialSavings: 96 // $8 * 12 months
      })
    }

    // Family plan opportunities
    if (subscription.name === 'Spotify' && subscription.amount > 5) {
      alerts.push({
        id: `family-${subscription.id}`,
        type: 'family',
        title: 'Save with Spotify Family Plan',
        message: 'Switch to Spotify Family and share with up to 5 others. Save $3.33/month per person.',
        subscriptionId: subscription.id,
        subscriptionName: subscription.name,
        priority: 'low',
        actionText: 'Find Family Members',
        dismissed: false,
        createdAt: new Date().toISOString(),
        potentialSavings: 40 // $3.33 * 12 months
      })
    }

    // Upcoming renewal alerts
    const nextBilling = new Date(subscription.nextBillingDate)
    const daysUntilBilling = Math.floor(
      (nextBilling.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysUntilBilling <= 3 && subscription.status === 'warning') {
      alerts.push({
        id: `cancellation-${subscription.id}`,
        type: 'cancellation',
        title: `${subscription.name} renews in ${daysUntilBilling} days`,
        message: `Your ${subscription.name} subscription renews in ${daysUntilBilling} days. Cancel now to avoid being charged $${subscription.amount}.`,
        subscriptionId: subscription.id,
        subscriptionName: subscription.name,
        priority: 'high',
        actionText: 'Cancel Before Renewal',
        dismissed: false,
        createdAt: new Date().toISOString(),
        potentialSavings: subscription.amount
      })
    }
  })

  return alerts.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}

export const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'usage': return '⏰'
    case 'price': return '💰'
    case 'family': return '👥'
    case 'cancellation': return '⚠️'
    default: return '📄'
  }
}

export const getAlertColor = (priority: Alert['priority']) => {
  switch (priority) {
    case 'high': return 'border-red-200 bg-red-50 text-red-800'
    case 'medium': return 'border-orange-200 bg-orange-50 text-orange-800'
    case 'low': return 'border-blue-200 bg-blue-50 text-blue-800'
    default: return 'border-gray-200 bg-gray-50 text-gray-800'
  }
}