'use client';
import { useState } from 'react';

export default function PatentAssistant() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(data.result || data.error);
    } catch (err) {
      setResult("Error connecting to AI.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Patent Assistant</h1>
      <textarea 
        className="w-full p-4 border rounded mb-4 text-black"
        placeholder="Describe your invention idea here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Search Patents'}
      </button>
      {result && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-black whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}
