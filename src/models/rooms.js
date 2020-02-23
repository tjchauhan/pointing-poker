class Rooms {
    constructor () {
        this.rooms = []
    }

    addRoom (name, passcode) {
        var room = {name, passcode}
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

module.exports = {Rooms}
