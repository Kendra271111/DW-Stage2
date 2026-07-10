import { Pool } from 'pg'

export const db = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  database: "dumbways",
  port: 5432,
})
