import express from 'express'
import { engine } from 'express-handlebars'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { log } from 'console'

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

app.use(express.urlencoded({ extended: true }))
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
  res.render('project', { title: 'Projects', projects })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Project CRUD Operations

/* const projects = [
  { id: 1, name: 'Project 1', description: 'Description for Project 1' },
  { id: 2, name: 'Project 2', description: 'Description for Project 2' },
  { id: 3, name: 'Project 3', description: 'Description for Project 3' }
]; */

let projects = []
let projectsid = 1

/** function getProjects(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(projects);
    }, 200);
  });
}**/

/** app.get('/projects', async (req, res) => {
    try {
        const projects = await getProjects(); 
        console.log(projects);
        
        res.render('projects',{ 
          projects: projects });
        } catch (error) {
            res.status(500).send('Error fetching projects');
        }
}); **/

app.post('/project', async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !description) {
      return res.status(400).send('Name and description are required')
    }

    const newProject = {
      id: projectsid++,
      name,
      description
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(newProject)
      }, 1000)
    })

    projects.push(newProject)

    console.log('New project added:', newProject)
    console.log('Current projects:', projects)

    res.redirect('/project')
  } catch (error) {
    console.error('Error processing project form:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/projects/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const project = projects.find(p => p.id === projectId)

    if (!project) {
      return res.status(404).send('Project not found')
    }

    res.render('projectDetail', { project })
  } catch (error) {
    console.error('Error fetching project details:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/projects/:id/edit', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const project = projects.find(p => p.id === projectId)

    if (!project) {
      return res.status(404).send('Project not found')
    }

    res.render('projectEdit', { project })
  } catch (error) {
    console.error('Error loading edit form:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/projects/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const { name, description } = req.body
    const index = projects.findIndex(p => p.id === projectId)

    if (index === -1) {
      return res.status(404).send('Project not found')
    }

    projects[index] = {
      id: projectId,
      name,
      description
    }

    console.log(`Project updated: ${name} (ID: ${projectId})`)
    res.redirect('/project')
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/projects/:id/delete', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const index = projects.findIndex(p => p.id === projectId)

    if (index === -1) {
      return res.status(404).send('Project not found')
    }

    const removed = projects[index]
    projects = projects.filter(p => p.id !== projectId)

    console.log(`Project deleted: ${removed.name} (ID: ${projectId})`)
    console.log('Current projects:', projects)
    res.redirect('/project')
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).send('Internal Server Error')
  }
})