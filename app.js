
var menuGone = false

window.onload=function() {
	var element = document.getElementById("play")

	document.addEventListener('click', function( event ) {
		if (element === event.target && element.contains(event.target)) {    
		document.getElementById("menu").style.display = "none"
		menuGone = true
		}
	  })
}


document.addEventListener("keydown", detectSpace)

function detectSpace(e) {
	if (e.keyCode === 32) {
		if (menuGone) {
			StartGame()
			document.removeEventListener("keydown", detectSpace)
		}
	}
}

function StartGame() {
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

	function getRandomInt(min, max) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	function generateObstacle() {
		let obstacleLeft = 500
		let randomHeight = Math.random() * 100 
		let obstacleBottom = randomHeight
		const obstacle = document.createElement('div')
		const topObstacle = document.createElement('div')
		var numer = getRandomInt(0, 5)
		const obstakle = ["url('img/hp.png')", "url('img/jck.png')", "url('img/wlodek.png')", "url('img/fedzio.png')", "url('img/dburak.png')", "url('img/crwiow.png')"]
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		obstacle.style.backgroundImage = obstakle[numer]
		topObstacle.style.backgroundImage = obstakle[numer]


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
			scoreDisplay.innerHTML = 'ECTS: ' + score
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

