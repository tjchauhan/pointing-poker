const getStoryPoints = require('../utils/utils')

class Room {
    constructor (name) {
        this.name = name
        this.votes = []
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

// Class for an array of rooms
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

module.exports = {Rooms, Room}
