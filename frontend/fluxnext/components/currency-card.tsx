"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown } from "lucide-react"

// Country flags for currencies
const currencyFlags = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
}

// Currency symbols
const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "$",
  AUD: "$",
}

interface CurrencyCardProps {
  type: "from" | "to"
  currency: string
  amount: number
  onCurrencyChange: (currency: string) => void
  onAmountChange: (amount: number) => void
  currencies: string[]
}

export default function CurrencyCard({
  type,
  currency,
  amount,
  onCurrencyChange,
  onAmountChange,
  currencies,
}: CurrencyCardProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      onAmountChange(value)
    } else {
      onAmountChange(0)
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="w-full overflow-hidden border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300 bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardHeader
          className={`${
            type === "from"
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : "bg-gradient-to-r from-purple-500 to-purple-600"
          } text-white`}
        >
          <CardTitle className="flex items-center">
            {type === "from" ? "From" : "To"}
            {type === "from" && <ArrowDown className="ml-2 h-4 w-4" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Label htmlFor={`${type}-currency`} className="text-sm font-medium dark:text-gray-300">
              Currency
            </Label>
            <Select value={currency} onValueChange={onCurrencyChange}>
              <SelectTrigger
                id={`${type}-currency`}
                className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr} className="dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>{currencyFlags[curr as keyof typeof currencyFlags]}</span>
                      <span>{curr}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${type}-amount`} className="text-sm font-medium dark:text-gray-300">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                {currencySymbols[currency as keyof typeof currencySymbols]}
              </span>
              <Input
                id={`${type}-amount`}
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="pl-8 text-lg font-medium bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

