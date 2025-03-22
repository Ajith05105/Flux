"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Bell, Search, DollarSign, Moon, Sun, LogOut, TrendingUp, Globe, RefreshCw, ChevronRight, ArrowRightLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import CurrencyRateCard from "@/components/currency-rate-card"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import transactionsData from '@/data/transactions.json'

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'NZD' | 'PHP';
type ExchangeRates = Record<CurrencyCode, Record<CurrencyCode, number>>;

interface Transaction {
  id: string;
  type: 'exchange';
  fromAmount: number;
  fromCurrency: CurrencyCode;
  toAmount: number;
  toCurrency: CurrencyCode;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

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

export default function HomePage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>("USD")
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock exchange rates
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({
    USD: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    EUR: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    GBP: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    JPY: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    CAD: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    AUD: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    NZD: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 },
    PHP: { USD: 0, EUR: 0, GBP: 0, JPY: 0, CAD: 0, AUD: 0, NZD: 0, PHP: 0 }
  })

  const fetchExchangeRates = async () => {
    try {
      const currencies: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'NZD', 'PHP']
      const newRates = {...exchangeRates}
      
      for (const base of currencies) {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${base}`
        )
        const data = await response.json()
        
        for (const target of currencies) {
          if (base !== target) {
            newRates[base][target] = Number(data.rates[target].toFixed(4))
          }
        }
      }
      
      setExchangeRates(newRates)
    } catch (error) {
      console.error('Error fetching exchange rates:', error)
    }
  }

  useEffect(() => {
    fetchExchangeRates()
    // Refresh rates every minute
    const interval = setInterval(fetchExchangeRates, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }
      
      const { transactions: latestTransactions } = await response.json()
      
      // Sort transactions by timestamp (newest first)
      const sortedTransactions = latestTransactions
        .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .map((transaction: any) => ({
          ...transaction,
          type: 'exchange' as const,
          fromCurrency: transaction.fromCurrency as CurrencyCode,
          toCurrency: transaction.toCurrency as CurrencyCode,
          status: transaction.status as 'completed' | 'pending' | 'failed'
        }));

      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // Format relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    setMounted(true)

    return () => clearTimeout(timer)
  }, [])

  const navigateToExchange = () => {
    router.push("/exchange")
  }

  const navigateToAccount = () => {
    router.push("/account")
  }

  const navigateToLogin = () => {
    router.push("/login")
  }

  const handleLogout = () => {
    router.push("/login")
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
          <div className="flex items-center gap-3">
            <span className="font-bold text-3xl text-green-600 dark:text-green-400 font-['Poppins']">FLUX</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-['Inter'] tracking-wide">International Money Exchange</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-600 dark:text-gray-300"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar className="cursor-pointer h-8 w-8" onClick={() => router.push("/account")}>
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exchange Card */}
            <div className="bg-green-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-200 dark:border-green-900 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 font-['Poppins']">Exchange Rates</h2>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="h-9 px-3 font-normal bg-green-100/50 border-green-200 hover:bg-green-200/50"
                      onClick={() => fetchExchangeRates()}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 px-3 font-normal">
                          <img 
                            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[baseCurrency]}.png`}
                            alt={`${baseCurrency} flag`}
                            className="w-5 h-4 mr-2"
                          />
                          {baseCurrency}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'NZD', 'PHP'] as CurrencyCode[]).map((currency) => (
                          <DropdownMenuItem 
                            key={currency}
                            onClick={() => setBaseCurrency(currency)}
                            className="flex items-center gap-2"
                          >
                            <img 
                              src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[currency]}.png`}
                              alt={`${currency} flag`}
                              className="w-5 h-4"
                            />
                            {currency}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(exchangeRates[baseCurrency])
                    .filter(([currency]) => currency !== baseCurrency)
                    .map(([currency, rate]) => (
                      <div 
                        key={currency}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-green-100/80 dark:hover:bg-green-900/40 transition-colors cursor-pointer border border-transparent hover:border-green-300 dark:hover:border-green-800"
                        onClick={() => router.push("/exchange")}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[currency as CurrencyCode]}.png`}
                            alt={`${currency} flag`}
                            className="w-6 h-4"
                          />
                          <span className="font-medium dark:text-white">{currency}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">{rate.toFixed(4)}</p>
                          <p className="text-sm text-gray-500">1 {baseCurrency} = {rate.toFixed(4)} {currency}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <Button
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={navigateToExchange}
                >
                  Make Exchange
                </Button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-green-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-200 dark:border-green-900 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 font-['Poppins'] mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-green-100/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <img 
                            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[transaction.fromCurrency]}.png`}
                            alt={`${transaction.fromCurrency} flag`}
                            className="w-5 h-4"
                          />
                          <span className="font-medium dark:text-white">
                            {transaction.fromAmount} {transaction.fromCurrency}
                          </span>
                          <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                          <img 
                            src={`https://flagcdn.com/24x18/${CURRENCY_TO_COUNTRY[transaction.toCurrency]}.png`}
                            alt={`${transaction.toCurrency} flag`}
                            className="w-5 h-4"
                          />
                          <span className="font-medium dark:text-white">
                            {transaction.toAmount} {transaction.toCurrency}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatRelativeTime(transaction.timestamp)}
                        </p>
                        <p className={`text-sm ${
                          transaction.status === 'completed' ? 'text-green-500' : 
                          transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Quick Actions */}
          <div className="space-y-6">
            <div className="bg-green-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-green-200 dark:border-green-900 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 font-['Poppins'] mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto py-4 bg-green-100/50 hover:bg-green-200/50 border-green-200 hover:border-green-300 hover:text-green-700 transition-all duration-300 rounded-lg"
                    onClick={navigateToExchange}
                  >
                    <DollarSign className="h-5 w-5 mr-3 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium">Exchange Currency</p>
                      <p className="text-sm text-gray-500">Convert between currencies</p>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-auto py-4 bg-green-100/50 hover:bg-green-200/50 border-green-200 hover:border-green-300 hover:text-green-700 transition-all duration-300 rounded-lg"
                    onClick={() => router.push("/transfer")}
                  >
                    <Send className="h-5 w-5 mr-3 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium">Transfer Money</p>
                      <p className="text-sm text-gray-500">Send money to others</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

