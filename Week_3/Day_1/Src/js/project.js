import { db } from '../config/database.js'

export async function getProjects() {
  try {
    const result = await db.query(`
      SELECT p.*,
             t.software_name AS technology_name,
             u.username AS user_name
      FROM projects p
      LEFT JOIN technologies t ON p.technology_id = t.id
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `)
    return result.rows
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export async function getUsers() {
  const result = await db.query('SELECT id, username FROM users ORDER BY username')
  return result.rows
}

export async function getTechnologies() {
  const result = await db.query('SELECT id, software_name FROM technologies ORDER BY software_name')
  return result.rows
}

export async function getProjectById(req, res, id) {
    try {
        const { id } = req.params

        const query = `
          SELECT p.*,
                 t.software_name AS technology_name,
                 u.username AS user_name
          FROM projects p
          LEFT JOIN technologies t ON p.technology_id = t.id
          LEFT JOIN users u ON p.user_id = u.id
          WHERE p.id = $1
        `
        const result = await db.query(query, [id])

        if (result.rows.length === 0) {
            res.status(404).send('Project not found')
            return null
        }

        res.render('projectDetail', { 
            title: 'Project Details', 
            project: result.rows[0] 
        });

    } catch (error) {
        console.error('Error fetching project by ID:', error)
        res.status(500).send('Error fetching project by ID')
        return null
    }
}

export async function createProject(req, res, db) {
    try {
        const { name, description, technology_id, user_id } = req.body

        const query = `INSERT INTO projects (project_name, description, technology_id, user_id, created_at)
                       VALUES ($1, $2, $3, $4, CURRENT_TIME) RETURNING *`
        const result = await db.query(query, [
            name,
            description,
            technology_id || null,
            user_id || null
        ])

        console.log('Project created:', result.rows[0])
        req.session.flash = { type: 'success', message: 'Project created successfully!' }
        res.redirect('/project')

    } catch (error) {
        console.error('Error creating project:', error)
        res.status(500).send('Error creating project')
    }
}

export async function getEditProjects(req, res, db) {
    try {
        const { id } = req.params

        const query = 'SELECT * FROM projects WHERE id = $1'
        const result = await db.query(query, [id])

        if (result.rows.length === 0) {
            res.status(404).send('Project not found')
            return null
        }

        res.render('projectEdit', { 
            title: 'Edit Project', 
            project: result.rows[0],
            users: await getUsers(),
            technologies: await getTechnologies()
        });

    } catch (error) {
        console.error('Error fetching project for editing:', error)
        res.status(500).send('Error fetching project for editing')
        return null
    }
}

export async function updateProject(req, res, db) {
    try {
        const { id } = req.params
        const { name, description, technology_id, user_id } = req.body

        const query = `UPDATE projects SET 
            project_name = $1,
            description = $2,
            technology_id = $3, 
            user_id = $4 
            WHERE id = $5 RETURNING *`
        
        const values = [name, description, technology_id || null, user_id || null, id]
        const result = await db.query(query, [
            name,
            description,
            technology_id || null,
            user_id || null,
            id
        ])
    
        if (result.rows.length === 0) {
            res.status(404).send('Project not found')
            return null
        }

        console.log('Project updated:', result.rows[0])
        req.session.flash = { type: 'success', message: 'Project updated successfully!' }
        res.redirect('/project')
    } catch (error) {
        console.error('Error updating project:', error)
        res.status(500).send('Error updating project')
    }
}

export async function deleteProject(req, res, db) {
    try {
        const { id } = req.params
        const query = 'DELETE FROM projects WHERE id = $1 RETURNING *'
        const result = await db.query(query, [id])

        if (result.rows.length === 0) {
            res.status(404).send('Project not found')
            return null
        }
        console.log('Project deleted:', result.rows[0])
        req.session.flash = { type: 'success', message: 'Project deleted successfully!' }
        res.redirect('/project')
    } catch (error) {
        console.error('Error deleting project:', error)
        res.status(500).send('Error deleting project')
    }
}