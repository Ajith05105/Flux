"use client"

import { motion } from "framer-motion"

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'NZD' | 'PHP';

const CURRENCY_TO_COUNTRY: Record<CurrencyCode, string> = {
  USD: 'us',
  EUR: 'eu',
  GBP: 'gb',
  JPY: 'jp',
  CAD: 'ca',
  AUD: 'au',
  NZD: 'nz',
  PHP: 'ph'
};

interface CurrencyRateCardProps {
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  rate: number
}

export default function CurrencyRateCard({ baseCurrency, targetCurrency, rate }: CurrencyRateCardProps) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img 
            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[baseCurrency]}.png`}
            alt={`${baseCurrency} flag`}
            className="w-6 h-4"
          />
          <span className="font-medium dark:text-white">{baseCurrency}</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400">→</span>
        <div className="flex items-center gap-2">
          <img 
            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[targetCurrency]}.png`}
            alt={`${targetCurrency} flag`}
            className="w-6 h-4"
          />
          <span className="font-medium dark:text-white">{targetCurrency}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-blue-600 dark:text-blue-400">{rate.toFixed(4)}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">1 {baseCurrency} = {rate.toFixed(4)} {targetCurrency}</p>
      </div>
    </motion.div>
  )
}

