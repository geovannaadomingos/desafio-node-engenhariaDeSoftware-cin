const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

let movies = [
    { id: 1, title: 'A Baleia', director: 'Darren Aronofsky' },
    { id: 2, title: 'John Wick', director: 'Chad Stahelski' },
]

let series = [
    { id: 1, title: 'Stranger Things', director: 'Duffer Brothers', seasons: 4 },
    { id: 2, title: 'Game of Thrones', director: 'David Benioff & D. B. Weiss', seasons: 8 },
]



app.get('/:mediaType', (request, response) => {
    const mediaType = request.params.mediaType

    if (mediaType === 'movies') {
        response.json(movies)
    } else if (mediaType === 'series') {
        response.json(series)
    } else {
        response.status(404).json({ message: 'Conteúdo não encontrada.' })
    }
})


app.get('/:mediaType/:id', (request, response) => {
    const mediaType = request.params.mediaType
    const id = parseInt(request.params.id)

    let media

    if (mediaType === 'movies') {
        media = movies.find(movie => movie.id === id)
    } else if (mediaType === 'series') {
        media = series.find(serie => serie.id === id)
    }

    if (media) {
        response.json(media)
    } else {
        response.status(404).json({ message: 'Conteúdo não encontrada.' })
    }
})


app.post('/:mediaType', (request, response) => {
    const mediaType = request.params.mediaType
    const newMedia = request.body
    newMedia.id = mediaType === 'movies' ? movies.length + 1 : series.length + 1

    if (mediaType === 'movies') {
        movies.push(newMedia)
    } else if (mediaType === 'series') {
        series.push(newMedia)
    } else {
        response.status(400).json({ message: 'Não foi possível adicionar conteúdo.' })
        return
    }

    response.status(201).json(newMedia)
})


app.put('/:mediaType/:id', (request, response) => {
    const mediaType = request.params.mediaType
    const id = parseInt(request.params.id)
    const updatedMedia = request.body

    let mediaList
    let mediaNotFoundMessage

    if (mediaType === 'movies') {
        mediaList = movies
        mediaNotFoundMessage = 'Filme não encontrado.'
    } else if (mediaType === 'series') {
        mediaList = series
        mediaNotFoundMessage = 'Série não encontrada.'
    } else {
        response.status(400).json({ message: 'Não foi possível alterar o conteúdo.' })
        return
    }

    const index = mediaList.findIndex(media => media.id === id)
    if (index !== -1) {
        mediaList[index] = { id, ...updatedMedia }
        response.json(mediaList[index])
    } else {
        response.status(404).json({ message: mediaNotFoundMessage })
    }
})

app.patch('/:mediaType/:id', (request, response) => {
    const mediaType = request.params.mediaType
    const id = parseInt(request.params.id)
    const updatedFields = request.body

    let mediaList
    let mediaNotFoundMessage

    if (mediaType === 'movies') {
        mediaList = movies
        mediaNotFoundMessage = 'Filme não encontrado.'
    } else if (mediaType === 'series') {
        mediaList = series
        mediaNotFoundMessage = 'Série não encontrada.'
    } else {
        response.status(400).json({ message: 'Não foi possível alterar o conteúdo.' })
        return
    }

    const index = mediaList.findIndex(media => media.id === id)
    if (index !== -1) {
        mediaList[index] = { ...mediaList[index], ...updatedFields }
        response.json(mediaList[index])
    } else {
        response.status(404).json({ message: mediaNotFoundMessage })
    }
})


app.delete('/:mediaType/:id', (request, response) => {
    const mediaType = request.params.mediaType
    const id = parseInt(request.params.id)

    let mediaList
    let mediaNotFoundMessage

    if (mediaType === 'movies') {
        mediaList = movies
        mediaNotFoundMessage = 'Filme não encontrado.'
    } else if (mediaType === 'series') {
        mediaList = series
        mediaNotFoundMessage = 'Série não encontrada.'
    } else {
        response.status(400).json({ message: 'Não foi possível deletar o conteúdo.' })
        return
    }

    const index = mediaList.findIndex(media => media.id === id)
    if (index !== -1) {
        mediaList.splice(index, 1)
        response.json({ message: 'Mídia removida com sucesso.' })
    } else {
        response.status(404).json({ message: mediaNotFoundMessage })
    }
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
