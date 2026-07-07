import express from 'express'
import { engine } from 'express-handlebars'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', join(__dirname, '..', 'views'))

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: join(__dirname, '..', 'views', 'layouts'),
  partialsDir: join(__dirname, '..', 'views', 'partials')
}))

app.use(express.static(join(__dirname, '..', 'assets')))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' })
})

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' })
})

app.get('/project', (req, res) => {
  res.render('project', { title: 'Projects' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
