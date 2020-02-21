const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let total = 0
let votes = 0
const points = [1, 2, 3, 5, 8, 13, 21]

io.on('connection', (socket) => {
    console.log('New websocket connection')

    // When submit button is pressed.
    // Increase story point and votes total
    socket.on('submit', (message) => {
        console.log('submitted')
        console.log(message.value)

        total += message.value
        votes++
    })

    // When finish button is pressed.
    // Get the average story points and find the closest Fib number
    socket.on('finish', () => {
        console.log('finished')

        // Get the average point total
        let mean = total/votes

        // Find the closest story point option to the average
        var closest = points.reduce((prev, curr) => {
          return (Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev)
        });

        console.log(closest)

        // Reset for new story
        total = 0
        votes = 0
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
