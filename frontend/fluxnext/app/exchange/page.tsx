"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRightLeft, DollarSign, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import CurrencyCard from "@/components/currency-card"
import ConfirmationCard from "@/components/confirmation-card"
import { useTheme } from "next-themes"

export default function CurrencyExchange() {
  const router = useRouter()
  const { theme } = useTheme()
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [fromAmount, setFromAmount] = useState(100)
  const [toAmount, setToAmount] = useState(92)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mock exchange rates
  const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 150.59, CAD: 1.36, AUD: 1.52 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 163.69, CAD: 1.48, AUD: 1.65 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 190.34, CAD: 1.72, AUD: 1.92 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0053, CAD: 0.009, AUD: 0.01 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111.24, AUD: 1.12 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 99.32, CAD: 0.89 },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFromAmountChange = (amount: number) => {
    setFromAmount(amount)
    // Calculate to amount based on exchange rate
    const rate = exchangeRates[fromCurrency][toCurrency]
    setToAmount(Number.parseFloat((amount * rate).toFixed(2)))
  }

  const handleToAmountChange = (amount: number) => {
    setToAmount(amount)
    // Calculate from amount based on exchange rate
    const rate = exchangeRates[toCurrency][fromCurrency]
    setFromAmount(Number.parseFloat((amount * rate).toFixed(2)))
  }

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency)
    // Recalculate to amount based on new exchange rate
    const rate = exchangeRates[currency][toCurrency]
    setToAmount(Number.parseFloat((fromAmount * rate).toFixed(2)))
  }

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency)
    // Recalculate to amount based on new exchange rate
    const rate = exchangeRates[fromCurrency][currency]
    setToAmount(Number.parseFloat((fromAmount * rate).toFixed(2)))
  }

  const handleProceedToPayment = () => {
    setShowConfirmation(true)
  }

  const handleConfirmation = () => {
    // Handle transaction confirmation
    alert("Transaction confirmed!")
    setShowConfirmation(false)
    router.push("/")
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  const swapCurrencies = () => {
    const tempCurrency = fromCurrency
    const tempAmount = fromAmount

    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)

    // Recalculate amounts
    setFromAmount(toAmount)
    setToAmount(tempAmount)
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4 md:p-8">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mb-6">
        <Button variant="ghost" className="flex items-center gap-2 dark:text-gray-300" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-4xl mx-auto space-y-8">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold text-center mb-2 dark:text-white">Currency Exchange</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Exchange your currency at competitive rates
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showConfirmation ? (
            <motion.div key="exchange-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative">
                <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CurrencyCard
                    type="from"
                    currency={fromCurrency}
                    amount={fromAmount}
                    onCurrencyChange={handleFromCurrencyChange}
                    onAmountChange={handleFromAmountChange}
                    currencies={Object.keys(exchangeRates)}
                  />
                  <CurrencyCard
                    type="to"
                    currency={toCurrency}
                    amount={toAmount}
                    onCurrencyChange={handleToCurrencyChange}
                    onAmountChange={handleToAmountChange}
                    currencies={Object.keys(exchangeRates)}
                  />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    size="icon"
                    className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    onClick={swapCurrencies}
                  >
                    <ArrowRightLeft className="h-5 w-5 text-white" />
                  </Button>
                </motion.div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Exchange rate: 1 {fromCurrency} = {exchangeRates[fromCurrency][toCurrency]} {toCurrency}
                  </p>
                </div>
                <p className="text-xs text-blue-500 dark:text-blue-400">Updated just now</p>
              </div>

              <motion.div variants={item} className="flex justify-center mt-8">
                <Button
                  size="lg"
                  onClick={handleProceedToPayment}
                  className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Proceed to Payment
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <ConfirmationCard
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                fromAmount={fromAmount}
                toAmount={toAmount}
                onConfirm={handleConfirmation}
                onCancel={handleCancel}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

