"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRightLeft, DollarSign, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import CurrencyCard from "@/components/currency-card"
import ConfirmationCard from "@/components/confirmation-card"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
type ExchangeRates = Record<CurrencyCode, Record<CurrencyCode, number>>;

const CURRENCY_TO_COUNTRY: Record<CurrencyCode, string> = {
  USD: 'us',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
  CAD: 'ca',
  AUD: 'au'
};

export default function CurrencyExchange() {
  const router = useRouter()
  const { theme } = useTheme()
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD")
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("EUR")
  const [fromAmount, setFromAmount] = useState(100)
  const [toAmount, setToAmount] = useState(92)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mock exchange rates
  const exchangeRates: ExchangeRates = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.59, CAD: 1.36, AUD: 1.52 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.86, JPY: 163.69, CAD: 1.48, AUD: 1.65 },
    GBP: { USD: 1.27, EUR: 1.16, GBP: 1, JPY: 190.34, CAD: 1.72, AUD: 1.92 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0053, JPY: 1, CAD: 0.009, AUD: 0.01 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111.24, CAD: 1, AUD: 1.12 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 99.32, CAD: 0.89, AUD: 1 }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFromAmountChange = (amount: number) => {
    if (amount < 0) return // Prevent negative amounts
    setFromAmount(amount)
    // Calculate to amount based on exchange rate
    const rate = exchangeRates[fromCurrency][toCurrency]
    setToAmount(Number((amount * rate).toFixed(2))) // Limit to 2 decimal places
  }

  const handleToAmountChange = (amount: number) => {
    if (amount < 0) return // Prevent negative amounts
    setToAmount(amount)
    // Calculate from amount based on exchange rate
    const rate = exchangeRates[toCurrency][fromCurrency]
    setFromAmount(Number((amount * rate).toFixed(2))) // Limit to 2 decimal places
  }

  const handleFromCurrencyChange = (currency: string) => {
    if (currency === toCurrency) {
      // Automatically swap currencies if same currency selected
      setFromCurrency(toCurrency as CurrencyCode)
      setToCurrency(fromCurrency)
      setToAmount(fromAmount)
    } else {
      setFromCurrency(currency as CurrencyCode)
      // Recalculate to amount based on new exchange rate
      const rate = exchangeRates[currency as CurrencyCode][toCurrency]
      setToAmount(Number((fromAmount * rate).toFixed(2)))
    }
  }

  const handleToCurrencyChange = (currency: string) => {
    if (currency === fromCurrency) {
      // Automatically swap currencies if same currency selected
      setToCurrency(fromCurrency as CurrencyCode)
      setFromCurrency(toCurrency)
      setFromAmount(toAmount)
    } else {
      setToCurrency(currency as CurrencyCode)
      // Recalculate to amount based on new exchange rate
      const rate = exchangeRates[fromCurrency][currency as CurrencyCode]
      setToAmount(Number((fromAmount * rate).toFixed(2)))
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  // Format number with proper separators
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Check if amount is valid for proceeding
  const isValidAmount = () => {
    return fromAmount > 0 && toAmount > 0 && !isNaN(fromAmount) && !isNaN(toAmount)
  }

  const handleProceedToPayment = () => {
    if (!isValidAmount()) return
    setShowConfirmation(true)
  }

  const handleConfirmation = async () => {
    try {
      // Save transaction via API
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'exchange',
          fromAmount: fromAmount,
          fromCurrency: fromCurrency,
          toAmount: toAmount,
          toCurrency: toCurrency
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save transaction')
      }

      // Handle successful transaction
      setShowConfirmation(false)
      // Show success message before redirecting
      const successMessage = document.createElement('div')
      successMessage.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50'
      successMessage.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
          <div class="text-green-500 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium mb-2">Exchange Successful!</h3>
          <p class="text-gray-500 mb-4">Your transaction has been completed.</p>
        </div>
      `
      document.body.appendChild(successMessage)
      
      // Redirect after showing success message
      setTimeout(() => {
        document.body.removeChild(successMessage)
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error('Error confirming transaction:', error)
      alert("Failed to complete transaction. Please try again.")
    }
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  // Only show UI after mounted to prevent hydration mismatch with theme
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Simplified Header */}
      <header className="sticky top-0 z-10 bg-green-50/90 backdrop-blur-sm dark:bg-gray-900/90 border-b border-green-200 dark:border-green-900">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" className="flex items-center gap-2 hover:text-green-600 transition-colors" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <span className="font-bold text-3xl text-green-600 dark:text-green-400 font-['Poppins']">FLUX</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-['Inter'] tracking-wide">Exchange</span>
          </div>
          <div className="w-[72px]" />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        <div className="bg-green-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-200 dark:border-green-900 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-8">
            <div className="space-y-8">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-400 mb-3 font-['Inter']">
                  From
                </label>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-14 px-4 font-normal bg-green-100/50 border-green-200 hover:bg-green-200/50 transition-colors"
                      >
                        <img 
                          src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[fromCurrency]}.png`}
                          alt={`${fromCurrency} flag`}
                          className="w-6 h-4 mr-2"
                        />
                        {fromCurrency}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[120px]">
                      {(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] as CurrencyCode[]).map((currency) => (
                        <DropdownMenuItem 
                          key={currency}
                          onClick={() => handleFromCurrencyChange(currency)}
                          className="flex items-center gap-2 cursor-pointer"
                          disabled={currency === fromCurrency}
                        >
                          <img 
                            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[currency]}.png`}
                            alt={`${currency} flag`}
                            className="w-6 h-4"
                          />
                          {currency}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={fromAmount || ''}
                      onChange={(e) => handleFromAmountChange(Number(e.target.value))}
                      className="h-14 text-lg font-medium pl-8 bg-green-100/30 border-green-200 focus:border-green-300 focus:ring-green-200"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {fromCurrency === 'JPY' ? '¥' : '$'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={swapCurrencies}
                  className="rounded-full h-10 w-10 bg-green-100/50 dark:bg-green-900/30 hover:bg-green-200/50 dark:hover:bg-green-800/50 transition-all duration-300"
                >
                  <ArrowRightLeft className="h-5 w-5 text-green-700 dark:text-green-400" />
                </Button>
              </div>

              {/* To Currency */}
              <div>
                <label className="block text-sm font-medium text-green-700 dark:text-green-400 mb-3 font-['Inter']">
                  To
                </label>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-14 px-4 font-normal hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <img 
                          src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[toCurrency]}.png`}
                          alt={`${toCurrency} flag`}
                          className="w-6 h-4 mr-2"
                        />
                        {toCurrency}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[120px]">
                      {(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] as CurrencyCode[]).map((currency) => (
                        <DropdownMenuItem 
                          key={currency}
                          onClick={() => handleToCurrencyChange(currency)}
                          className="flex items-center gap-2 cursor-pointer"
                          disabled={currency === toCurrency}
                        >
                          <img 
                            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[currency]}.png`}
                            alt={`${currency} flag`}
                            className="w-6 h-4"
                          />
                          {currency}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={toAmount || ''}
                      onChange={(e) => handleToAmountChange(Number(e.target.value))}
                      className="h-14 text-lg font-medium pl-8"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {toCurrency === 'JPY' ? '¥' : '$'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Exchange Rate Info */}
              <div className="py-4 px-4 bg-green-100/50 dark:bg-green-900/20 rounded-lg text-sm border border-green-200 dark:border-green-800">
                <div className="flex justify-between items-center">
                  <p className="text-green-700 dark:text-green-400 font-['Inter']">
                    1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}
                  </p>
                  <p className="text-xs text-green-600/70 dark:text-green-500/70">Updated just now</p>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 font-['Inter']"
                onClick={handleProceedToPayment}
                disabled={!isValidAmount()}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 bg-green-950/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-green-50/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg max-w-md w-full p-8 space-y-6 shadow-xl border border-green-200 dark:border-green-900">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 font-['Poppins']">Confirm Exchange</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[fromCurrency]}.png`}
                      alt={`${fromCurrency} flag`}
                      className="w-6 h-4"
                    />
                    <span className="font-medium">{formatAmount(fromAmount)} {fromCurrency}</span>
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[toCurrency]}.png`}
                      alt={`${toCurrency} flag`}
                      className="w-6 h-4"
                    />
                    <span className="font-medium">{formatAmount(toAmount)} {toCurrency}</span>
                  </div>
                </div>

                <div className="py-4 px-4 bg-green-100/50 dark:bg-green-900/20 rounded-lg space-y-3 border border-green-200 dark:border-green-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Exchange rate</span>
                    <span>1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t border-green-200 dark:border-green-800">
                    <span>You'll receive</span>
                    <span>{formatAmount(toAmount)} {toCurrency}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 hover:bg-green-50 hover:border-green-600 hover:text-green-600 dark:hover:bg-green-900/30 transition-all duration-300 font-['Inter']" 
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-md hover:shadow-lg font-['Inter']" 
                  onClick={handleConfirmation}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

