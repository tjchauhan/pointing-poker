const express = require('express')
const getStoryPoints = require('./utils/utils')
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

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('join', ({ roomName }) => {
        socket.join(roomName)

        socket.broadcast.to(roomName).emit('message', {
            text: `A new user has joined ${roomName}`
        })
    })

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
        var closest = getStoryPoints(mean)

        console.log(closest)

        // Reset for new story
        total = 0
        votes = 0

        io.emit('sendPoints', {
            points: closest
        })
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
