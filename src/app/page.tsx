'use client'

import Orderbook from '@components/Orderbook'

export default function Home() {
  return (
    <div className="p-4">
      <Orderbook symbol="ETH/USD" precision={3} />
    </div>
  )
}
