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
    // testando o get
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

    // testando o post
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

    // testando o put
    it('Deve atualizar um filme existente com sucesso', async () => {
        const updatedMovie = { title: 'Midnight in Paris' }
        const response = await request(server).put('/movies/1').send(updatedMovie)
        expect(response.status).toBe(200)
        expect(response.body.title).toBe(updatedMovie.title)
        expect(response.body.director).toBe(updatedMovie.director)

        const movieResponse = await request(server).get('/movies/1')
        expect(movieResponse.status).toBe(200)
        expect(movieResponse.body).toEqual(response.body)
    })

    it('Deve retornar status 404 para atualização de filme inexistente', async () => {
        const updatedMovie = { title: 'Midnight in Paris' }
        const response = await request(server).put('/movies/999').send(updatedMovie)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Filme não encontrado.')
    })

    it('Deve atualizar uma série existente com sucesso', async () => {
        const updatedSeries = { title: 'Manifest: O Mistério do Voo 828', director: 'Jeff Rake', seasons: 5 }
        const response = await request(server).put('/series/1').send(updatedSeries)
        expect(response.status).toBe(200)
        expect(response.body.title).toBe(updatedSeries.title)
        expect(response.body.director).toBe(updatedSeries.director)
        expect(response.body.seasons).toBe(updatedSeries.seasons)

        const seriesResponse = await request(server).get('/series/1')
        expect(seriesResponse.status).toBe(200)
        expect(seriesResponse.body).toEqual(response.body)
    })

    it('Deve retornar status 404 para atualização de série inexistente', async () => {
        const updatedSeries = { title: 'Manifest: O Mistério do Voo 828', director: 'Jeff Rake', seasons: 5 }
        const response = await request(server).put('/series/999').send(updatedSeries)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Série não encontrado.')
    })

    it('Deve retornar status 404 para atualização com mediaType inválido', async () => {
        const updatedMedia = { title: 'Manifest: O Mistério do Voo 828' }
        const response = await request(server).put('/séries/1').send(updatedMedia)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Não foi possível alterar o conteúdo.')
    })

})