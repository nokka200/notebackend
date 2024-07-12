/*
Tiedosto eksporttaa moduulin käyttäjille määritellyn routerin.
Kaikki määriteltävät routet liitetään router-olioon, samaan tapaan kuin aiemmassa versiossa routet liitettiin sovellusta edustavaan olioon.

Huomionarvoinen seikka routejen määrittelyssä on se, että polut ovat typistyneet. Aiemmin määrittelimme esim.
*/

const notesRouter = require('express').Router()
const Note = require('../models/note')

// Haetaan kaikki muistiinpanot tietokannasta
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

// Haetaan yksittäinen muistiinpano tietokannasta
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

// Lisätään uusi muistiinpano tietokantaan
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

// Poistetaan muistiinpano tietokannasta
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter