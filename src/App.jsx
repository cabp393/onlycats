import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function App() {
  const [cats, setCats] = useState([])
  const [page, setPage] = useState(1)
  const cant = 5
  const API_URL = `https://api.thecatapi.com/v1/images/search?limit=${cant}&page=${page}&order=Desc`

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setCats(prev => prev.concat(data)))
  }, [page])

  return (
    <InfiniteScroll
      dataLength={cats.length}
      hasMore={true}
      next={() => {
        setPage(prev => prev + 1)
      }}
    >
      <div className="appCont">
        {cats?.map(cat => {
          if (cat.width > 500) {
            return (
              <div key={`${cat.id}${page}`} className="container">
                <img src={cat.url} loading="lazy" />
              </div>
            )
          }
        })}
      </div>
    </InfiniteScroll>
  )
}
