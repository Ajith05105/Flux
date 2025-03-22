"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Bell, Search, DollarSign, Moon, Sun, LogOut, TrendingUp, Globe, RefreshCw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import CurrencyRateCard from "@/components/currency-rate-card"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [baseCurrency, setBaseCurrency] = useState("USD")
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock exchange rates
  const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 150.59, CAD: 1.36, AUD: 1.52 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 163.69, CAD: 1.48, AUD: 1.65 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 190.34, CAD: 1.72, AUD: 1.92 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0053, CAD: 0.009, AUD: 0.01 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111.24, AUD: 1.12 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 99.32, CAD: 0.89 },
  }

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 1,
      type: "exchange",
      fromAmount: 500,
      fromCurrency: "USD",
      toAmount: 460,
      toCurrency: "EUR",
      date: "Today",
      time: "14:30",
    },
    {
      id: 2,
      type: "exchange",
      fromAmount: 1000,
      fromCurrency: "USD",
      toAmount: 790,
      toCurrency: "GBP",
      date: "Yesterday",
      time: "09:15",
    },
    {
      id: 3,
      type: "exchange",
      fromAmount: 250,
      fromCurrency: "EUR",
      toAmount: 290,
      toCurrency: "USD",
      date: "May 15",
      time: "16:45",
    },
    {
      id: 4,
      type: "exchange",
      fromAmount: 75000,
      fromCurrency: "JPY",
      toAmount: 495,
      toCurrency: "USD",
      date: "May 10",
      time: "08:00",
    },
  ]

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
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}
    >
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              <Globe className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl dark:text-white">CurrencyPro</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 w-64 bg-gray-100 dark:bg-gray-800 border-0" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-700 dark:text-gray-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
            <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-300">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={navigateToAccount}>My Account</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left column - Main content */}
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            <motion.div
              variants={item}
              className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-blue-100">Welcome to CurrencyPro</p>
                  <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-3xl font-bold mt-1"
                  >
                    Exchange Currency Instantly
                  </motion.h1>
                  <p className="text-blue-100 mt-2 max-w-md">
                    Get the best rates for your currency exchanges with our secure and fast platform.
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 cursor-pointer w-full md:w-auto inline-block"
                onClick={navigateToExchange}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">Exchange Currency Now</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-white">Exchange Rates</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal dark:text-gray-300 dark:border-gray-600">
                    Base: {baseCurrency}
                  </Badge>
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              <Tabs defaultValue="popular">
                <TabsList className="mb-4">
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="all">All Currencies</TabsTrigger>
                </TabsList>

                <TabsContent value="popular" className="space-y-3">
                  {Object.entries(exchangeRates[baseCurrency])
                    .slice(0, 4)
                    .map(([currency, rate]) => (
                      <CurrencyRateCard
                        key={currency}
                        baseCurrency={baseCurrency}
                        targetCurrency={currency}
                        rate={rate as number}
                      />
                    ))}
                </TabsContent>

                <TabsContent value="all" className="space-y-3">
                  {Object.entries(exchangeRates[baseCurrency]).map(([currency, rate]) => (
                    <CurrencyRateCard
                      key={currency}
                      baseCurrency={baseCurrency}
                      targetCurrency={currency}
                      rate={rate as number}
                    />
                  ))}
                </TabsContent>
              </Tabs>

              <Button
                variant="outline"
                className="w-full mt-4 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={navigateToExchange}
              >
                Go to Exchange
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-white">Recent Transactions</h2>
                <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          {`Exchanged ${transaction.fromCurrency} to ${transaction.toCurrency}`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date} at {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600 dark:text-blue-400">
                        {`${transaction.fromAmount} ${transaction.fromCurrency} → ${transaction.toAmount} ${transaction.toCurrency}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Features */}
          <motion.div variants={item} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Why Choose CurrencyPro?</h2>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Secure Transactions</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your exchanges are protected with bank-level security
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Fast Processing</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Most exchanges are processed within minutes
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
                      <path d="M15 7h6v6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">Competitive Rates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We offer some of the best exchange rates in the market
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">24/7 Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Our customer support team is always available to help
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={item}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-2xl p-6 text-white shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">Premium Account</h2>
              <p className="text-purple-100 mb-4">Upgrade to access premium features and lower exchange fees.</p>
              <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 dark:hover:bg-white/90">
                Upgrade Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

