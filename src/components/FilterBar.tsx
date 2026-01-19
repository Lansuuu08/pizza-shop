import { useState, useEffect } from "react"

interface Props {
  search: string
  setSearch: (value: string) => void
}

const FilterBar: React.FC<Props> = ({ search, setSearch }) => {
  const [localSearch, setLocalSearch] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => setSearch(localSearch), 300)
    return () => clearTimeout(timer)
  }, [localSearch, setSearch])

  return (
    <div className="relative w-full mb-6">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Search pizza..."
        className="w-full pl-10 pr-4 py-3 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
      />
    </div>
  )
}

export default FilterBar
