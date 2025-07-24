'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function TaskFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    replace(pathname)
  }

  return (
    <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              onChange={(e) => handleFilter('category', e.target.value)}
              value={searchParams.get('category') ?? ''}
            >
              <option value="">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Due Date Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <select
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              onChange={(e) => handleFilter('due', e.target.value)}
              value={searchParams.get('due') ?? ''}
            >
              <option value="">All Dates</option>
              <option value="today">Due Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Search
            </label>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              onChange={(e) => handleFilter('search', e.target.value)}
              value={searchParams.get('search') ?? ''}
            />
          </div>
        </div>
        
        {/* Clear Filters Button - Aligned with filters */}
        <div className="flex items-end">
        {(searchParams.get('category') || searchParams.get('due') || searchParams.get('search')) && (
          <button
            onClick={clearAllFilters}
              className="w-full p-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}