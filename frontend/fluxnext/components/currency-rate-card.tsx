"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

// Country flags for currencies
const currencyFlags = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  AUD: "🇦🇺",
}

interface CurrencyRateCardProps {
  baseCurrency: string
  targetCurrency: string
  rate: number
}

export default function CurrencyRateCard({ baseCurrency, targetCurrency, rate }: CurrencyRateCardProps) {
  // Mock trend data (randomly up or down)
  const trend = Math.random() > 0.5 ? "up" : "down"
  const trendPercentage = (Math.random() * 2).toFixed(2)

  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border dark:border-gray-700"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currencyFlags[baseCurrency as keyof typeof currencyFlags]}</span>
          <span className="text-gray-400 text-sm">/</span>
          <span className="text-xl">{currencyFlags[targetCurrency as keyof typeof currencyFlags]}</span>
        </div>
        <div>
          <p className="font-medium dark:text-white">
            {baseCurrency}/{targetCurrency}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-bold dark:text-white">{rate}</p>
        <div
          className={`flex items-center ${trend === "up" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}
        >
          {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="text-xs">{trendPercentage}%</span>
        </div>
      </div>
    </motion.div>
  )
}

