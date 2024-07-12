const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

/*
Testi importtaa tiedostoon app.js määritellyn Express-sovelluksen ja käärii sen funktion supertest avulla ns.
superagent-olioksi. Tämä olio sijoitetaan muuttujaan api ja sen kautta testit voivat tehdä HTTP-pyyntöjä backendiin.
*/
const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/) // Huome käytetty regular expressionia
})

after(async () => {
  await mongoose.connection.close()
})