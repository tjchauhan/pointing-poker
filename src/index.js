const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const {Users} = require('./models/users')
const {Rooms, Room} = require('./models/rooms')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

var rooms = new Rooms()
var users = new Users()

// For testing purposes
var room = new Room('test', 'abc')
rooms.addRoom(room)

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('join', ({ roomName, username }) => {
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

        room.addVote(message.value)
    })

    // When finish button is pressed.
    // Get the average story points and find the closest Fib number
    socket.on('finish', () => {
        console.log('finished')

        // Find the closest story point option to the average
        var closest = room.getPoints()
        room.clearVotes()

        console.log(closest)

        io.emit('sendPoints', {
            points: closest
        })
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
