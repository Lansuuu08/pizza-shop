export default function FilterBar({ search, setSearch }: any) {
  return (
    <input className="border-2 w-full px-3 py-2 mb-4 rounded bg-white"
      placeholder="Search Recipe"
      value={search}
      onChange={(e) => setSearch(e.target.value)}

      
    />
  )
}
