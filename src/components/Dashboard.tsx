'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, DollarSign, Calendar, TrendingUp, X, Settings, Crown } from 'lucide-react'
import { Subscription, getSubscriptions, calculateMonthlyTotal, calculateAnnualSavings } from '@/lib/plaid'
import { isProUser, getUsageLimit } from '@/lib/stripe'
import AlertsPanel from './AlertsPanel'
import UpgradeModal from './UpgradeModal'

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'active' | 'warning'>('all')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const isPro = isProUser()
  const usageLimit = getUsageLimit()

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const subs = await getSubscriptions()
        setSubscriptions(subs)
      } catch (error) {
        console.error('Failed to load subscriptions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSubscriptions()
  }, [])

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filter === 'all') return true
    return sub.status === filter
  })

  const monthlyTotal = calculateMonthlyTotal(subscriptions)
  const annualSavings = calculateAnnualSavings(subscriptions)
  const warningCount = subscriptions.filter(sub => sub.status === 'warning').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'warning': return 'text-orange-600 bg-orange-50'
      case 'cancelled': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your subscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Subscriptions</h1>
              {!isPro && subscriptions.length >= usageLimit && (
                <p className="text-sm text-orange-600">
                  You've reached the free plan limit of {usageLimit} subscriptions
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {!isPro && (
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </button>
              )}
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Total</p>
                <p className="text-2xl font-bold text-gray-900">${monthlyTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Needs Attention</p>
                <p className="text-2xl font-bold text-gray-900">{warningCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Potential Savings</p>
                <p className="text-2xl font-bold text-gray-900">${annualSavings.toFixed(0)}/yr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Alerts */}
        <div className="mb-8">
          <AlertsPanel subscriptions={subscriptions} />
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All ({subscriptions.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'active' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Active ({subscriptions.filter(s => s.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'warning' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Needs Attention ({warningCount})
          </button>
        </div>

        {/* Subscriptions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Subscription Details</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredSubscriptions.map((subscription) => (
              <div key={subscription.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">{subscription.logo}</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{subscription.name}</h3>
                      <p className="text-sm text-gray-500">{subscription.category}</p>
                      {subscription.lastUsed && (
                        <p className="text-sm text-gray-500">
                          Last used: {getDaysAgo(subscription.lastUsed)} days ago
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${subscription.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">per {subscription.frequency}</p>
                    </div>
                    
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status === 'warning' ? 'Unused' : subscription.status}
                    </span>
                    
                    {subscription.status === 'warning' && (
                      <button className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                
                {subscription.status === 'warning' && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-md">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <div className="ml-3">
                        <p className="text-sm text-orange-700">
                          You haven't used {subscription.name} in {getDaysAgo(subscription.lastUsed || '')} days. 
                          Consider canceling to save ${subscription.amount}/month.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA */}
        {!isPro && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900">
                  Want more detailed insights?
                </h3>
                <p className="text-blue-700">
                  Upgrade to Pro for price change alerts, family plan finder, and detailed usage analytics.
                </p>
              </div>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={() => {
          // Refresh the page to show pro features
          window.location.reload()
        }}
      />
    </div>
  )
}