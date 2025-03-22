"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, LogOut, Shield, Settings, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

export default function AccountPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "May 2022",
    accountType: "Premium",
    accountNumber: "****4567",
  }

  // Mock transaction history
  const transactions = [
    {
      id: 1,
      type: "exchange",
      fromAmount: 500,
      fromCurrency: "USD",
      toAmount: 460,
      toCurrency: "EUR",
      date: "May 20, 2023",
      time: "14:30",
    },
    {
      id: 2,
      type: "exchange",
      fromAmount: 1000,
      fromCurrency: "USD",
      toAmount: 790,
      toCurrency: "GBP",
      date: "May 19, 2023",
      time: "09:15",
    },
    {
      id: 3,
      type: "exchange",
      fromAmount: 250,
      fromCurrency: "EUR",
      toAmount: 290,
      toCurrency: "USD",
      date: "May 15, 2023",
      time: "16:45",
    },
    {
      id: 4,
      type: "exchange",
      fromAmount: 75000,
      fromCurrency: "JPY",
      toAmount: 495,
      toCurrency: "USD",
      date: "May 10, 2023",
      time: "08:00",
    },
    {
      id: 5,
      type: "exchange",
      fromAmount: 300,
      fromCurrency: "USD",
      toAmount: 408,
      toCurrency: "CAD",
      date: "May 8, 2023",
      time: "20:22",
    },
    {
      id: 6,
      type: "exchange",
      fromAmount: 200,
      fromCurrency: "USD",
      toAmount: 158,
      toCurrency: "GBP",
      date: "May 5, 2023",
      time: "11:30",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

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

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-5xl mx-auto space-y-8">
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="relative mb-4"
                >
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-2xl">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                    <Edit className="h-4 w-4 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-xl font-bold dark:text-white">{userData.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{userData.email}</p>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">{userData.accountType}</Badge>

                <div className="w-full mt-6 space-y-3">
                  <Button variant="outline" className="w-full justify-start dark:text-gray-300 dark:border-gray-600">
                    <Shield className="mr-2 h-4 w-4" /> Security Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start dark:text-gray-300 dark:border-gray-600">
                    <Settings className="mr-2 h-4 w-4" /> Preferences
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-gray-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <motion.div variants={item}>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="dark:text-white">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                      <p className="font-medium dark:text-white">{userData.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium dark:text-white">{userData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                      <p className="font-medium dark:text-white">{userData.memberSince}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
                      <p className="font-medium dark:text-white">{userData.accountType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Tabs defaultValue="all">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">Transaction History</h2>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="usd">USD</TabsTrigger>
                    <TabsTrigger value="eur">EUR</TabsTrigger>
                    <TabsTrigger value="gbp">GBP</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardContent className="p-0">
                      <div className="divide-y dark:divide-gray-700">
                        {transactions.map((transaction) => (
                          <motion.div
                            key={transaction.id}
                            whileHover={{
                              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                            }}
                            className="p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usd" className="mt-0">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardContent className="p-0">
                      <div className="divide-y dark:divide-gray-700">
                        {transactions
                          .filter((t) => t.fromCurrency === "USD" || t.toCurrency === "USD")
                          .map((transaction) => (
                            <motion.div
                              key={transaction.id}
                              whileHover={{
                                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                              }}
                              className="p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="eur" className="mt-0">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardContent className="p-0">
                      <div className="divide-y dark:divide-gray-700">
                        {transactions
                          .filter((t) => t.fromCurrency === "EUR" || t.toCurrency === "EUR")
                          .map((transaction) => (
                            <motion.div
                              key={transaction.id}
                              whileHover={{
                                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                              }}
                              className="p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
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
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gbp" className="mt-0">
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <CardContent className="p-0">
                      <div className="divide-y dark:divide-gray-700">
                        {transactions
                          .filter((t) => t.fromCurrency === "GBP" || t.toCurrency === "GBP")
                          .map((transaction) => (
                            <motion.div
                              key={transaction.id}
                              whileHover={{
                                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                              }}
                              className="p-4 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
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
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

