"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight } from "lucide-react"

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          {type === "from" ? "From" : "To"}
          {type === "from" && <ArrowLeftRight className="ml-2 h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-currency`}>Currency</Label>
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger id={`${type}-currency`}>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-amount`}>Amount</Label>
          <Input id={`${type}-amount`} type="number" value={amount} onChange={handleAmountChange} className="text-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

