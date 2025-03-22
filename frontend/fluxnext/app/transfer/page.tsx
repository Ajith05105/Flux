"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, User, Building, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TransferPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [note, setNote] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Mock recent recipients
  const recentRecipients = [
    { id: 1, name: "Sarah Johnson", accountNumber: "****7890", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Michael Brown", accountNumber: "****4321", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Emma Wilson", accountNumber: "****6543", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handleTransfer = () => {
    setShowConfirmation(true)
  }

  const handleConfirmation = () => {
    // Handle transfer confirmation
    alert("Transfer successful!")
    setShowConfirmation(false)
    router.push("/")
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  const selectRecipient = (name: string, account: string) => {
    setRecipient(name)
    setAccountNumber(account)
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mb-6">
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-3xl mx-auto space-y-8">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold text-center mb-2">Transfer Money</h1>
          <p className="text-center text-gray-500 mb-8">Send money to friends, family, or businesses</p>
        </motion.div>

        {!showConfirmation ? (
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="person">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="person" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Person
                    </TabsTrigger>
                    <TabsTrigger value="business" className="flex items-center gap-2">
                      <Building className="h-4 w-4" /> Business
                    </TabsTrigger>
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Card
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="person" className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Name</Label>
                      <Input
                        id="recipient"
                        placeholder="Enter recipient name"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account">Account Number</Label>
                      <Input
                        id="account"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>

                    {recentRecipients.length > 0 && (
                      <div className="space-y-2">
                        <Label>Recent Recipients</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                          {recentRecipients.map((recipient) => (
                            <motion.div
                              key={recipient.id}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                              onClick={() => selectRecipient(recipient.name, recipient.accountNumber)}
                            >
                              <Avatar>
                                <AvatarImage src={recipient.avatar} alt={recipient.name} />
                                <AvatarFallback>
                                  {recipient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{recipient.name}</p>
                                <p className="text-sm text-gray-500">{recipient.accountNumber}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="business" className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" placeholder="Enter business name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-account">Business Account Number</Label>
                      <Input id="business-account" placeholder="Enter business account number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reference">Reference Number</Label>
                      <Input id="reference" placeholder="Enter reference number (optional)" />
                    </div>
                  </TabsContent>

                  <TabsContent value="card" className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="Enter card number" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="CVV" type="password" maxLength={3} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-holder">Card Holder Name</Label>
                      <Input id="card-holder" placeholder="Enter card holder name" />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                    <Input
                      id="amount"
                      className="pl-8"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input id="note" placeholder="Add a note" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={handleTransfer}
                  disabled={!recipient || !accountNumber || !amount}
                >
                  <Send className="mr-2 h-4 w-4" /> Transfer Money
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Confirm Transfer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Recipient</h3>
                  <p>{recipient}</p>
                  <p className="text-sm text-gray-500">Account: {accountNumber}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Transfer Details</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">${Number.parseFloat(amount).toFixed(2)} USD</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fee</p>
                      <p className="font-medium">$0.00 USD</p>
                    </div>
                  </div>
                </div>

                {note && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Note</h3>
                    <p>{note}</p>
                  </div>
                )}

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>${Number.parseFloat(amount).toFixed(2)} USD</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" className="w-full" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className="w-full" onClick={handleConfirmation}>
                  Confirm Transfer
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </main>
  )
}

