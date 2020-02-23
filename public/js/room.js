const socket = io()

// Elements
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

// Options
const { roomName, username } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('sendPoints', (message) => {
    console.log(message.points)

    const html = Mustache.render(messageTemplate, {
        points: message.points
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('message', (message) => {
    console.log(message.text)
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
