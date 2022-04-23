document.addEventListener('DOMContentLoaded', () => {
    const duck = document.querySelector('.duck')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let duckLeft = 220
    let duckBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430
    let jumped = false
    let score = 0

    function startGame() {
        duckBottom -= gravity
        duck.style.bottom = duckBottom + 'px'
        duck.style.left = duckLeft + 'px'
        if (jumped) {
            setTimeout( () => { duck.style.transform = 'rotate(35deg)' }, 700)
            jumped = false
        }
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
        duck.style.transform = 'rotate(-35deg)'
        jumped = true
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
            if (duckLeft === obstacleLeft+60) {
                score++
                console.log('score: ' + score)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()

    function generateCloud() {
        let cloudLeft = 500
        let randomHeight = (Math.random()+1) * 460
        let cloudBottom = randomHeight
        const cloud = document.createElement('div')
        if (!isGameOver) {
            cloud.classList.add('cloud')
        }
        gameDisplay.appendChild(cloud)
        cloud.style.left = cloudLeft + 'px'
        cloud.style.bottom = cloudBottom + 'px'

        function moveCloud() {
            cloudLeft -= 1
            cloud.style.left = cloudLeft + 'px'
           
            if (cloudLeft === -140) {
                clearInterval(cloudTimerId)
                gameDisplay.removeChild(cloud)
            }
        }
        let cloudTimerId = setInterval(moveCloud, 20)
        if (!isGameOver) setTimeout(generateCloud, 4000)
    }
    generateCloud()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true 
        const finalScore = document.createElement('h1')
        finalScore.innerText = score
        gameDisplay.appendChild(finalScore)
        document.removeEventListener('keyup', control)
    }
})