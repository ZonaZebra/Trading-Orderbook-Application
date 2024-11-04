'use client'
import { useState } from 'react'
import Orderbook from '@components/Orderbook'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || '<missing>'

export default function Home() {
  const [symbol, setSymbol] = useState('ETH/USD')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [marketData, setMarketData] = useState<{
    asks: any[]
    bids: any[]
  }>({
    asks: [],
    bids: [],
  })

  const fetchMarketData = async (searchSymbol: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=CRYPTO_ORDERBOOK&symbol=${searchSymbol}&market=USD&apikey=${ALPHA_VANTAGE_API_KEY}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch market data')
      }

      const data = await response.json()

      if (data.Note) {
        // API call frequency limit reached
        throw new Error('API call frequency limit reached. Please try again later.')
      }

      if (data['Order Book']) {
        // Transform the data into our required format
        const asks = data['Order Book'].asks.map((ask: any) => ({
          price: parseFloat(ask.price),
          size: parseFloat(ask.quantity),
          total: parseFloat(ask.price) * parseFloat(ask.quantity),
          timestamp: new Date().toISOString(), // Alpha Vantage doesn't provide individual timestamps
        }))

        const bids = data['Order Book'].bids.map((bid: any) => ({
          price: parseFloat(bid.price),
          size: parseFloat(bid.quantity),
          total: parseFloat(bid.price) * parseFloat(bid.quantity),
          timestamp: new Date().toISOString(),
        }))

        setMarketData({ asks, bids })
        setSymbol(searchSymbol.toUpperCase() + '/USD')
      } else {
        throw new Error('Invalid symbol or no data available')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      fetchMarketData(searchInput.trim())
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search cryptocurrency (e.g., BTC, ETH)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
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

      {/* Orderbook Component */}
      <Orderbook symbol={symbol} precision={3} asks={marketData.asks} bids={marketData.bids} />
    </div>
  )
}
