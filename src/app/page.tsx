'use client'

import { useState } from 'react'
import { CreditCard, AlertTriangle, TrendingDown, Users, ArrowRight } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-center">
          <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
          <span className="font-bold text-xl text-gray-900">SubTracker</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Stop Wasting Money on
                  <span className="text-blue-600"> Forgotten Subscriptions</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Smart alerts, usage tracking, and cancellation reminders that save you hundreds every year.
                  Connect your bank and we'll do the rest.
                </p>
              </div>
              <div className="space-x-4">
                <a href="/dashboard" className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700">
                  Start Free Trial
                </a>
                <a href="/dashboard" className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50">
                  View Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500" />
                <h3 className="text-xl font-bold">$273/year wasted</h3>
                <p className="text-gray-500">
                  Average person pays for 3.4 subscriptions they don't use
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <TrendingDown className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Hidden price increases</h3>
                <p className="text-gray-500">
                  Services raise prices by 5-15% annually without clear notice
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Sharing opportunities</h3>
                <p className="text-gray-500">
                  Family plans can save 40-60% but are hard to coordinate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Smart Subscription Management
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We don't just list your subscriptions - we help you optimize them
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">🤖 Smart Usage Detection</h3>
                      <p className="text-gray-500">
                        "Haven't used Spotify in 2 weeks - want to cancel?" 
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">💰 Price Change Alerts</h3>
                      <p className="text-gray-500">
                        "Netflix raised prices to $15.99 - Hulu is $7.99"
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">👥 Family Plan Finder</h3>
                      <p className="text-gray-500">
                        "Split Disney+ with 3 others nearby and save $8/month"
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-4">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Netflix</span>
                      <span className="text-red-500 font-bold">$15.99/mo</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last used: 15 days ago
                    </div>
                    <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple Pricing
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Saves more than it costs - guaranteed
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-lg gap-6 py-12">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-gray-500">Track up to 3 subscriptions</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 3 subscription tracking</li>
                    <li>✓ Basic usage alerts</li>
                    <li>✓ Email notifications</li>
                  </ul>
                  <a href="/dashboard" className="block w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 text-center">
                    Get Started Free
                  </a>
                </div>
              </div>
              <div className="rounded-lg border-2 border-blue-600 bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-gray-500">Unlimited subscriptions + smart features</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-4xl font-bold">$2.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Unlimited subscription tracking</li>
                    <li>✓ Smart usage detection</li>
                    <li>✓ Price change alerts</li>
                    <li>✓ Family plan finder</li>
                    <li>✓ Annual savings report</li>
                  </ul>
                  <a href="/dashboard" className="block w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 text-center">
                    Start Pro Trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Save Money?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed">
                  Join thousands saving $200+ per year on subscriptions
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="max-w-lg flex-1 px-3 py-2 rounded-md border border-gray-200"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-blue-600 shadow transition-colors hover:bg-gray-50">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <p className="text-xs text-blue-100">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2025 SubTracker. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}