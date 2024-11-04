import React from 'react'
import { ArrowUpCircle, ArrowDownCircle, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Order {
  price: number
  size: number
  total: number
  timestamp: string
}

interface OrderbookProps {
  symbol?: string
  precision?: number
  asks: Order[]
  bids: Order[]
}

const Orderbook = ({ symbol = 'BTC/USD', precision = 2, asks = [], bids = [] }: OrderbookProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })
  }

  const spread = asks.length && bids.length ? asks[0].price - bids[0].price : 0

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
        {asks.length === 0 && bids.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Search for a cryptocurrency to view its orderbook</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {/* Rest of the component remains the same */}
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
            {spread > 0 && (
              <div className="flex items-center justify-center space-x-2 py-2">
                <AlertCircle className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Spread: ${formatNumber(spread)}</span>
              </div>
            )}

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
        )}
      </CardContent>
    </Card>
  )
}

export default Orderbook
