import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'express_ts',
  user: 'postgres',
  password: 'root',
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/user', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user"')
    res.json(result.rows)
  } catch (err) {
    console.error('DB error:', err)
    res.status(500).json({ error: 'Failed to fetch user', details: err.message })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
