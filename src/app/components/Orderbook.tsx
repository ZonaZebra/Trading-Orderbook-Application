import React, { useState } from 'react'
import { ArrowUpCircle, ArrowDownCircle, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

// TypeScript interfaces
interface Order {
  price: number
  size: number
  total: number
  timestamp: string
}

interface OrderbookProps {
  symbol?: string
  precision?: number
}

const OrderbookComponent = ({ symbol = 'BTC/USD', precision = 2 }: OrderbookProps) => {
  // Sample data - in real app, this would come from your API
  const [asks, setAsks] = useState<Order[]>([
    { price: 44250.25, size: 1.2, total: 53100.3, timestamp: '2024-03-11T14:30:00Z' },
    { price: 44255.5, size: 0.8, total: 35404.4, timestamp: '2024-03-11T14:29:55Z' },
    { price: 44260.75, size: 2.5, total: 110651.88, timestamp: '2024-03-11T14:29:50Z' },
  ])

  const [bids, setBids] = useState<Order[]>([
    { price: 44245.0, size: 1.5, total: 66367.5, timestamp: '2024-03-11T14:30:00Z' },
    { price: 44240.25, size: 1.0, total: 44240.25, timestamp: '2024-03-11T14:29:55Z' },
    { price: 44235.5, size: 3.2, total: 141553.6, timestamp: '2024-03-11T14:29:50Z' },
  ])

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })
  }

  return (
    <Card className="w-full max-w-4xl bg-gray-50 dark:bg-gray-900">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{symbol} Orderbook</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Last Update: Live</span>
            <div className="animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {/* Asks (Sell Orders) */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-red-500 flex items-center">
              <ArrowUpCircle className="w-4 h-4 mr-1" />
              Asks
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Size</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asks.map((ask, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-2 text-sm text-red-500 font-medium">${formatNumber(ask.price)}</td>
                        <td className="px-4 py-2 text-sm text-right">{formatNumber(ask.size)}</td>
                        <td className="px-4 py-2 text-sm text-right">${formatNumber(ask.total)}</td>
                        <td className="px-4 py-2 text-sm text-right text-gray-500">
                          {new Date(ask.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Spread Indicator */}
          <div className="flex items-center justify-center space-x-2 py-2">
            <AlertCircle className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Spread: ${formatNumber(asks[0].price - bids[0].price)}</span>
          </div>

          {/* Bids (Buy Orders) */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-green-500 flex items-center">
              <ArrowDownCircle className="w-4 h-4 mr-1" />
              Bids
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Size</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids.map((bid, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-2 text-sm text-green-500 font-medium">${formatNumber(bid.price)}</td>
                        <td className="px-4 py-2 text-sm text-right">{formatNumber(bid.size)}</td>
                        <td className="px-4 py-2 text-sm text-right">${formatNumber(bid.total)}</td>
                        <td className="px-4 py-2 text-sm text-right text-gray-500">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderbookComponent
