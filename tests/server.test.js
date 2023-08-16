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
})