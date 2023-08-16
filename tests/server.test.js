const request = require('supertest')
const server = require('../server')

let movies = [
    { id: 1, title: 'A Baleia', director: 'Darren Aronofsky' },
    { id: 2, title: 'John Wick', director: 'Chad Stahelski' },
]

let series = [
    { id: 1, title: 'Stranger Things', director: 'Duffer Brothers', seasons: 4 },
    { id: 2, title: 'Game of Thrones', director: 'David Benioff & D. B. Weiss', seasons: 8 },
]

describe('Testando rotas do Server', () => {
    it('Deve retornar a lista completa de filmes', async () => {
        const response = await request(server).get('/movies')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(movies)
    })

    it('Deve retornar a lista completa de séries', async () => {
        const response = await request(server).get('/series')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(series)
    })

    it('Deve retornar um filme específico', async () => {
        const response = await request(server).get('/movies/2')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(movies[1])
    })

    it('Deve retornar uma série específica', async () => {
        const response = await request(server).get('/series/2')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(series[1])
    })

    it('Deve retornar status 404 para filme não encontrado', async () => {
        const response = await request(server).get('/movies/999')
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Conteúdo não encontrado.')
    })

    it('Deve retornar status 404 para série não encontrada', async () => {
        const response = await request(server).get('/series/999')
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Conteúdo não encontrado.')
    })

    it('Deve adicionar um novo filme', async () => {
        const newMovie = { title: 'Midnight in Paris', director: ' Woody Allen' }
        const response = await request(server).post('/movies').send(newMovie)
        expect(response.status).toBe(201)
        expect(response.body.title).toBe(newMovie.title)
        expect(response.body.director).toBe(newMovie.director)

        const movieResponse = await request(server).get(`/movies/${response.body.id}`)
        expect(movieResponse.status).toBe(200)
        expect(movieResponse.body).toEqual(response.body)
    })

    it('Deve adicionar uma nova série', async () => {
        const newSeries = { title: 'Manifest: O Mistério do Voo 828', director: 'Jeff Rake', seasons: 4 }
        const response = await request(server).post('/series').send(newSeries)
        expect(response.status).toBe(201)
        expect(response.body.title).toBe(newSeries.title)
        expect(response.body.director).toBe(newSeries.director)
        expect(response.body.seasons).toBe(newSeries.seasons)

        const seriesResponse = await request(server).get(`/series/${response.body.id}`)
        expect(seriesResponse.status).toBe(200)
        expect(seriesResponse.body).toEqual(response.body)
    })

    it('Deve retornar status 404 para adição de conteúdo com mediaType inválido', async () => {
        const response = await request(server).post('/série').send({ title: 'Manifest: O Mistério do Voo 828', director: 'Jeff Rake', seasons: 4 })
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Não foi possível adicionar conteúdo.')
    })

})