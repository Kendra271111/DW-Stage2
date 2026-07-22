import { useState, useEffect } from 'react'
import './App.css'
import { Card as ShadcnCard, CardHeader, CardTitle } from '@/components/ui/card'
import { Input as ShadcnInput } from '@/components/ui/input'

interface User {
  id: number
  username: string
  email: string
  [key: string]: unknown
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 1000)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/user')
        const data = (await res.json()) as unknown

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setUsers(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to fetch users:', err)
        setUsers([])
      }
    }

    fetchUsers()
  }, [])

  const getDisplayName = (user: User) =>
    user.username || user.email || JSON.stringify(user)

  const isLoading = users.length === 0
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  )

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 gap-6">
      <section className="flex flex-col items-center gap-3">
        <ShadcnInput
          id='DataSearchBar'
          name='DataSearchBar'
          type='text'
          placeholder='Search users...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-48'
        />
      </section>
      <section className='flex flex-wrap justify-center gap-4 w-full'>
        {isLoading ? (
          <CardTitle>Loading users...</CardTitle>
        ) : filteredUsers.length === 0 ? (
          debouncedQuery ? (
            <CardTitle>No users found</CardTitle>
          ) : null
        ) : filteredUsers.map((user) => (
          <ShadcnCard key={user.id} className="w-[150px]">
            <CardHeader>
              <CardTitle>{getDisplayName(user)}</CardTitle>
            </CardHeader>
          </ShadcnCard>
        ))}
      </section>
    </div>
  )
}

export default App
