document.addEventListener('DOMContentLoaded', () => {
    const duck = document.querySelector('.duck')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let duckLeft = 220
    let duckBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        duckBottom -= gravity
        duck.style.bottom = duckBottom + 'px'
        duck.style.left = duckLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (duckBottom < 500) duckBottom += 50
        duck.style.bottom = duckBottom + 'px'
        console.log(duckBottom)
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && duckLeft === 220 &&
                (duckBottom < obstacleBottom + 153 || duckBottom > obstacleBottom + gap - 200) ||
                duckBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true 
        document.removeEventListener('keyup', control)
    }
})