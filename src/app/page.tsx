'use client'
import { useState, useEffect } from 'react'
import Orderbook from '@components/Orderbook'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || 'YOUR_API_KEY'

interface Order {
  price: number
  size: number
  total: number
  timestamp: string
}

export default function Home() {
  const [symbol, setSymbol] = useState('BTC')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [marketData, setMarketData] = useState<{
    asks: Order[]
    bids: Order[]
  }>({
    asks: [],
    bids: [],
  })

  const fetchCurrentPrice = async (searchSymbol: string) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${searchSymbol}&to_currency=USD&apikey=${ALPHA_VANTAGE_API_KEY}`
      )

      if (!response.ok) throw new Error('Failed to fetch current price')

      const data = await response.json()
      if (data['Realtime Currency Exchange Rate']) {
        return parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
      }
      return null
    } catch (err) {
      console.error('Error fetching current price:', err)
      return null
    }
  }

  const fetchMarketData = async (searchSymbol: string) => {
    setLoading(true)
    setError('')

    try {
      // Fetch daily data
      const response = await fetch(
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${searchSymbol}&market=USD&apikey=${ALPHA_VANTAGE_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch market data')
      }

      const data = await response.json()

      if (data.Note) {
        throw new Error('API call frequency limit reached. Please try again later.')
      }

      if (data['Time Series (Digital Currency Daily)']) {
        const timeSeriesData = data['Time Series (Digital Currency Daily)']
        const currentPrice = await fetchCurrentPrice(searchSymbol)
        setCurrentPrice(currentPrice)

        // Transform the data into orderbook format
        const timestamps = Object.keys(timeSeriesData).slice(0, 10) // Get last 10 data points

        // Generate synthetic orderbook data based on the time series
        const asks = timestamps
          .map((timestamp, index) => {
            const price = currentPrice ? currentPrice * (1 + (index + 1) * 0.001) : 0
            const volume = parseFloat(timeSeriesData[timestamp]['5. volume'])
            return {
              price: price,
              size: volume,
              total: price * volume,
              timestamp: timestamp,
            }
          })
          .sort((a, b) => a.price - b.price)

        const bids = timestamps
          .map((timestamp, index) => {
            const price = currentPrice ? currentPrice * (1 - (index + 1) * 0.001) : 0
            const volume = parseFloat(timeSeriesData[timestamp]['5. volume'])
            return {
              price: price,
              size: volume,
              total: price * volume,
              timestamp: timestamp,
            }
          })
          .sort((a, b) => b.price - a.price)

        setMarketData({ asks, bids })
        setSymbol(searchSymbol.toUpperCase())
      } else {
        throw new Error('Invalid symbol or no data available')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh every hour
  useEffect(() => {
    if (symbol) {
      const interval = setInterval(() => {
        fetchMarketData(symbol)
      }, 3600000) // 1 hour

      return () => clearInterval(interval)
    }
  }, [symbol])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      fetchMarketData(searchInput.trim())
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter cryptocurrency symbol (e.g., BTC, ETH)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={loading || !searchInput.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
      </form>

      {currentPrice && (
        <div className="text-center text-lg font-semibold">
          Current {symbol} Price: $
          {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )}

      <Orderbook symbol={`${symbol}/USD`} precision={3} asks={marketData.asks} bids={marketData.bids} />
    </div>
  )
}
