const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
app.use(express.json())
app.use(express.static('build'))

require('dotenv').config()
const Person = require('./models/person')

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(p => {
    res.send(
      `<p>Phonebook has info for ${p.length} people</p>
            <p>${new Date()}</p>`
    )
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(p => {
    if (p) {
      res.json(p.toJSON())
    } else {
      res.status(404).end()
    }
  }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end()
  }).catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {

  const name = req.body.name
  const number = req.body.number

  if (!name) {
    return res.status(400).json({
      'error': 'name missing',
    })
  }

  if (!number) {
    return res.status(400).json({
      'error': 'number missing',
    })
  }

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(newP => res.json(newP.toJSON()))
    .catch(error => next(error))

} )

app.put('/api/persons/:id', (req, res, next) => {
  const number = req.body.number
  Person.findByIdAndUpdate(req.params.id, { number: number }, { new: true, runValidators: true }).then(p => {
    res.json(p.toJSON())
  }).catch(err => next(err))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return res.status(400).json({ error: 'Information has already been removed from the server' })
  }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
