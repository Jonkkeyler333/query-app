import jsonServer from 'json-server'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('NODE_ENV:', process.env.NODE_ENV) 

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  console.log()

  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    return response.status(400).json({
      error: 'too short anecdote, must have length 5 or more',
    })
  } else {
    next()
  }
}

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'dist')
  server.use(express.static(staticPath))
}

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/health',(req, res) => {
  res.json({ status: 'ok' })
})

server.use(validator)
server.use(router)

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'dist')
  server.get('/*splat', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'))
  })
}

server.listen(3001, () => {
  console.log('JSON Server is running')
})