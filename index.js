const express = require("express")
const cors = require('cors')
const app = express()

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()  
// }

app.use(express.static('dist'))
app.use(express.json())
// app.use(requestLogger)
app.use(cors())

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}
  
// app.use(unknownEndpoint)

let leaders = [
    {
        "id": "1",
        "name": "Aidan",
        "score": 2009,
        "place": 1
    }
]



app.post('/api/leaders', (request, response) => {
    leaders.push(request.body)
    console.log(leaders, leaders.length)
    let i = leaders.length - 1
    leaders[i].place = i + 1
    leaders[i].id = (i+1).toString()

    let complete = false
    while(!complete && i > 0){
        if(leaders[i].score > leaders[i-1].score){
            const temp = leaders[i]
            leaders[i] = leaders[i-1]
            leaders[i-1] = temp
        } else {
            if(leaders[i].score === leaders[i-1].score){
                leaders[i].place = leaders[i-1].place
            }
            complete = true
        }
        i--;
    }

    leaders[0].place = 1
    for (let index = 1; index < leaders.length; index++) {
        if(leaders[index].score === leaders[index-1].score){
            leaders[index].place= leaders[index-1].place
        } else {
            leaders[index].place = index + 1
        }
        
    }


    console.log(request.body)
    response.json(leaders)
  })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/leaders', (request, response) => {
    response.json(leaders)
})

app.delete('/api/leaders/:id', (request, response) => {
    const id = request.params.id
    scores = scores.filter(leaders => leaders.id === id)

    response.status(204).end()
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)