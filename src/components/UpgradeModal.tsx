'use client'

import { useState } from 'react'
import { X, Check, Crown } from 'lucide-react'
import { products, createCheckoutSession, isProUser } from '@/lib/stripe'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade?: () => void
}

export default function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false)
  const isPro = isProUser()

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      await createCheckoutSession('pro')
      onUpgrade?.()
      onClose()
    } catch (error) {
      console.error('Upgrade failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {isPro ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You're a Pro user!</h3>
              <p className="text-gray-600 mb-6">
                You have access to all premium features including unlimited subscription tracking,
                smart alerts, and detailed analytics.
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Continue Using Pro Features
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Unlock Smart Subscription Management
                </h3>
                <p className="text-gray-600">
                  Save hundreds per year with advanced features
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-6 ${
                      product.id === 'pro'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>
                      <div className="text-3xl font-bold text-gray-900">
                        {product.price === 0 ? 'Free' : `$${product.price}`}
                        {product.price > 0 && (
                          <span className="text-lg font-normal text-gray-600">
                            /{product.interval}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {product.id === 'pro' && (
                      <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : 'Upgrade to Pro'}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  💰 Guaranteed Savings
                </h4>
                <p className="text-green-800 text-sm">
                  Our Pro users save an average of $200+ per year by optimizing their subscriptions.
                  If you don't save at least $36/year (the cost of Pro), we'll refund your money.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  30-day money-back guarantee • Cancel anytime
                </p>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Continue with Free Plan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}