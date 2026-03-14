'use client'

import { useState } from 'react'
import SearchForm from '@/components/SearchForm'
import Results from '@/components/Results'
import Navbar from '@/components/Navbar'

export default function Home() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setLoading(true)
    setResults(null)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults({ error: 'Search failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <SearchForm onSearch={handleSearch} loading={loading} />
        {loading && (
          <div className="text-center py-12">
            <div className="loading mx-auto mb-4"></div>
            <p className="text-gray-400">Analyzing patents...</p>
          </div>
        )}
        {results && !loading && <Results data={results} query={searchQuery} />}
      </div>
    </main>
  )
}
