const socket = io()

// Elements
const $messages = document.querySelector('#messages')
const $members = document.querySelector('#members')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const memberTemplate = document.querySelector('#member-template').innerHTML

// Options
const { roomName, username } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('sendPoints', (message) => {
    console.log(message.points)

    const html = Mustache.render(messageTemplate, {
        message: message.points
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('initialUserList', (message) => {
    message.users.forEach((user) => {
        const html = Mustache.render(memberTemplate, {
            member: user
        })
        $members.insertAdjacentHTML('beforeend', html)
    });
})

socket.on('updateUserList', (message) => {
    const html = Mustache.render(memberTemplate, {
        member: message.username
    })
    $members.insertAdjacentHTML('beforeend', html)
})

socket.on('removeUser', (message) => {
    $members.removeChild(document.getElementById(message.username))
})

socket.emit('join', { roomName, username })

document.querySelector('#submitButton').addEventListener('click', () => {
    console.log('Clicked')

    const points = Number(document.querySelector('input[name="points"]:checked').value)

    socket.emit('submit', {
        value: points
    })

})

document.querySelector('#finish').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('finish')
})
