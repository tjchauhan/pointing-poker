const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const {Rooms, Room} = require('./models/rooms')
const {Users} = require('./models/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

var rooms = new Rooms()
var users = new Users()

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('join', ({ roomName, username }) => {
        socket.join(roomName)
        let room = rooms.getRoom(roomName)

        if (!room) {

            room = new Room(roomName)
            rooms.addRoom(room)
        }

        users.addUser(socket.id, username, roomName)
        let userList = users.getUserList(roomName)

        socket.emit('initialUserList', {
            users: userList
        })

        socket.broadcast.to(roomName).emit('updateUserList', {
            username: username
        })
    })

    // When submit button is pressed.
    // Increase story point and votes total
    socket.on('submit', (message) => {
        console.log('submitted')
        console.log(message.value)

        let user = users.getUser(socket.id)
        let room = rooms.getRoom(user.room)

        room.addVote(message.value)
    })

    // When finish button is pressed.
    // Get the average story points and find the closest Fib number
    socket.on('finish', () => {
        console.log('finished')

        let user = users.getUser(socket.id)
        let room = rooms.getRoom(user.room)

        // Find the closest story point option to the average
        var closest = room.getPoints()
        room.clearVotes()

        console.log(closest)

        io.to(room.name).emit('sendPoints', {
            points: closest
        })
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('removeUser', {
                username: user.name
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
