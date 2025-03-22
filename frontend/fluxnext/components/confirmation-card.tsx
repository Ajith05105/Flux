"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface ConfirmationCardProps {
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationCard({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  onConfirm,
  onCancel,
}: ConfirmationCardProps) {
  // Mock user data
  const userData = {
    name: "John Doe",
    accountNumber: "****4567",
    bankName: "Global Bank",
    exchangeRate: (toAmount / fromAmount).toFixed(4),
    fee: 2.5,
    total: (fromAmount + 2.5).toFixed(2),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.4 }}
    >
      <Card className="w-full border-2 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Check className="h-5 w-5" /> Confirm Your Transaction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg dark:text-white">Account Holder</h3>
            <p className="dark:text-gray-300">{userData.name}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg dark:text-white">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">From</p>
                <p className="font-medium text-lg dark:text-white">
                  {fromAmount} {fromCurrency}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">To</p>
                <p className="font-medium text-lg dark:text-white">
                  {toAmount} {toCurrency}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg dark:text-white">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Account Number</p>
                <p className="font-medium dark:text-white">{userData.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Bank</p>
                <p className="font-medium dark:text-white">{userData.bankName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t pt-4 dark:border-gray-700">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground dark:text-gray-400">Exchange Rate</p>
              <p className="font-medium dark:text-white">
                1 {fromCurrency} = {userData.exchangeRate} {toCurrency}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground dark:text-gray-400">Fee</p>
              <p className="font-medium dark:text-white">
                {userData.fee} {fromCurrency}
              </p>
            </div>
            <div className="flex justify-between font-bold text-lg dark:text-white">
              <p>Total</p>
              <p>
                {userData.total} {fromCurrency}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 p-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 dark:text-gray-300 dark:border-gray-600"
            onClick={onCancel}
          >
            <X className="h-4 w-4" /> Cancel
          </Button>
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center gap-2"
            onClick={onConfirm}
          >
            <Check className="h-4 w-4" /> Confirm
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

