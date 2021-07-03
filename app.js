
document.addEventListener("keydown", StartGame)

function StartGame() {
	document.removeEventListener("keydown", StartGame)
	const bird = document.querySelector('.bird')
	const gameDisplay = document.querySelector('.game-container')
	const ground = document.querySelector('.ground')
	var scoreDisplay = document.getElementById('score')

	let birdLeft = 220
	let birdBottom = 100
	let gravity = 2
	let isGameOver = false
	let gap = 430
	let score = 0

	function startGame() {
		if (birdBottom > 0)
			birdBottom -= gravity
		bird.style.bottom = birdBottom + 'px'
		bird.style.left = birdLeft + 'px'
	}

	let gameTimerId = setInterval(startGame, 20)

	function control(e) {
		if (e.keyCode === 32) {
			jump()
		}
	}
	
	function jump() {
		if (birdBottom < 500)
		 birdBottom += 50;
		bird.style.bottom = birdBottom + 'px'
	}
	document.addEventListener('keyup', control)

	function generateObstacle() {
		let obstacleLeft = 500
		let randomHeight = Math.random() * 100 
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
			if (birdBottom === 0 || obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
				(birdBottom < obstacleBottom + 152 || birdBottom > obstacleBottom + gap - 200)) {
				gameOver()
				clearInterval(timerId)
			}
		}

		let timerId = setInterval(moveObstacle, 20)

		if (!isGameOver) {
			setTimeout(generateObstacle, 3000)
			// document.getElementById("score").innerHTML = score
			scoreDisplay.innerHTML = score
			score += 1
		}

	}

	generateObstacle()

	function gameOver() {
		clearInterval(gameTimerId)
		console.log('game over')
		isGameOver = true
		document.removeEventListener('keyup', control)
	}	
}

