'use client'

import { useState, useEffect } from 'react'
import { X, Bell, DollarSign } from 'lucide-react'
import { Alert, generateAlerts, getAlertIcon, getAlertColor } from '@/lib/alerts'
import { Subscription } from '@/lib/plaid'

interface AlertsPanelProps {
  subscriptions: Subscription[]
}

export default function AlertsPanel({ subscriptions }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())

  useEffect(() => {
    const generatedAlerts = generateAlerts(subscriptions)
    setAlerts(generatedAlerts)
  }, [subscriptions])

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]))
  }

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id))
  const totalPotentialSavings = visibleAlerts.reduce((sum, alert) => 
    sum + (alert.potentialSavings || 0), 0
  )

  if (visibleAlerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-green-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
            <p className="text-gray-600">No urgent subscription alerts at the moment.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-orange-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Smart Alerts</h3>
              <p className="text-sm text-gray-600">
                {visibleAlerts.length} alerts • Potential savings: ${totalPotentialSavings.toFixed(0)}/year
              </p>
            </div>
          </div>
          <DollarSign className="h-6 w-6 text-green-600" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {visibleAlerts.map((alert) => (
          <div key={alert.id} className={`p-6 border-l-4 ${getAlertColor(alert.priority)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">{getAlertIcon(alert.type)}</span>
                  <h4 className="text-lg font-medium text-gray-900">{alert.title}</h4>
                  {alert.priority === 'high' && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-3">{alert.message}</p>
                
                {alert.potentialSavings && (
                  <div className="flex items-center text-sm text-green-700 mb-3">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Potential savings: ${alert.potentialSavings.toFixed(0)}/year
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    {alert.actionText}
                  </button>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => dismissAlert(alert.id)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {visibleAlerts.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            💡 Acting on these alerts could save you <strong>${totalPotentialSavings.toFixed(0)} per year</strong>
          </p>
        </div>
      )}
    </div>
  )
}