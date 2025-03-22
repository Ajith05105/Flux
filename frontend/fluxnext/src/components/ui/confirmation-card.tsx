"use client"

import  Button  from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Confirm Your Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Account Holder</h3>
          <p>{userData.name}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Payment Information</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-medium">
                {fromAmount} {fromCurrency}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-medium">
                {toAmount} {toCurrency}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Bank Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">{userData.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bank</p>
              <p className="font-medium">{userData.bankName}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Exchange Rate</p>
            <p className="font-medium">
              1 {fromCurrency} = {userData.exchangeRate} {toCurrency}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">Fee</p>
            <p className="font-medium">
              {userData.fee} {fromCurrency}
            </p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>
              {userData.total} {fromCurrency}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="w-full" onClick={onConfirm}>
          Confirm Transaction
        </Button>
      </CardFooter>
    </Card>
  )
}

