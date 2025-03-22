"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CurrencyCard from "@/components/currency-card"
import ConfirmationCard from "@/components/confirmation-card"

export default function CurrencyExchange() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [fromAmount, setFromAmount] = useState(100)
  const [toAmount, setToAmount] = useState(92)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Mock exchange rates
  const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 150.59, CAD: 1.36 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 163.69, CAD: 1.48 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 190.34, CAD: 1.72 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0053, CAD: 0.009 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111.24 },
  }

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
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-50">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center">Currency Exchange</h1>

        {!showConfirmation ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            <div className="flex justify-center mt-8">
              <Button size="lg" onClick={handleProceedToPayment} className="w-full md:w-auto">
                Proceed to Payment
              </Button>
            </div>
          </>
        ) : (
          <ConfirmationCard
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            fromAmount={fromAmount}
            toAmount={toAmount}
            onConfirm={handleConfirmation}
            onCancel={handleCancel}
          />
        )}
      </div>
    </main>
  )
}

