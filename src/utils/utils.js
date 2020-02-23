const points = [1, 2, 3, 5, 8, 13, 21]

function getStoryPoints(num) {
    return points.reduce((prev, curr) => {
        return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev)
    })
}

module.exports = getStoryPoints
