const socket = io()

let selection = 0

document.querySelector('#point1').addEventListener('click', () => {
    console.log('Clicked')
    selection = 1
})
document.querySelector('#points2').addEventListener('click', () => {
    console.log('Clicked')
    selection = 2
})
document.querySelector('#points3').addEventListener('click', () => {
    console.log('Clicked')
    selection = 3
})
document.querySelector('#points5').addEventListener('click', () => {
    console.log('Clicked')
    selection = 5
})
document.querySelector('#points8').addEventListener('click', () => {
    console.log('Clicked')
    selection = 8
})
document.querySelector('#points13').addEventListener('click', () => {
    console.log('Clicked')
    selection = 13
})
document.querySelector('#points21').addEventListener('click', () => {
    console.log('Clicked')
    selection = 21
})

document.querySelector('#submitButton').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('submit', {
        value: selection
    })

    selection = 0
})

document.querySelector('#finish').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('finish')
})
