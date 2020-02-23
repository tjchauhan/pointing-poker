const getStoryPoints = require('../utils/utils')

class Rooms {
    constructor () {
        this.rooms = []
    }

    addRoom (room) {
        this.rooms.push(room)
        return room
    }

    removeRoom (name) {
        var room = this.getRoom(name)

        if (room) {
            this.rooms = this.rooms.filter((room) => room.name !== name)
        }
    }

    getRoom (name) {
        return this.rooms.filter((room) => room.name === name)[0]
    }

    getRoomList () {
        return this.rooms
    }
}

class Room {
    constructor (name, passcode) {
        this.name = name
        this.passcode = passcode
        this.users = []
        this.votes = []
    }

    addUser (user) {
        this.users.push(user)
    }

    getUsers () {
        return this.users
    }

    addVote (vote) {
        this.votes.push(vote)
    }

    getPoints () {
        var total = this.votes.reduce((a, b) => a + b, 0)
        return getStoryPoints(total/this.votes.length)
    }

    clearVotes () {
        this.votes.length = 0
    }
}

module.exports = {Rooms, Room}
