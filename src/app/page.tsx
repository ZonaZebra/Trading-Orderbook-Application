'use client'

import Orderbook from '@components/Orderbook'

export default function Home() {
  return (
    <div className="p-16 flex flex-grow w-min-screen h-min-screen justify-center items-center">
      <Orderbook symbol="ETH/USD" precision={0} />
    </div>
  )
}
