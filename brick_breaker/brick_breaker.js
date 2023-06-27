document.addEventListener("DOMContentLoaded", () =>  {
    /* Main variables*/
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let gameRequestId;
let level = 1; // Initial level
let score = 0;
let isPaused = true;
let isGameOver;

function updateScoreDisplay() {
	const scoreDisplay = document.getElementById("scoreDisplay");
	scoreDisplay.textContent = score;
}

// Paddle object
const paddle = {
	width: 100,
	height: 10,
	x: canvas.width / 2 - 50, // Initial x position
	y: canvas.height - 20,
	isMovingLeft: false,
	isMovingRight: false,
	dx: 10,

	// Methods for paddle movement
	moveLeft() {
		this.isMovingLeft = true;
		this.isMovingRight = false;
	},
	moveRight() {
		this.isMovingLeft = false;
		this.isMovingRight = true;
	},
	stopMoving() {
		this.isMovingLeft = false;
		this.isMovingRight = false;
	},
	update() {
		// Adjust the x position to move left
		if (this.isMovingLeft) this.x -= this.dx;

		// Adjust the x position to move right
		if (this.isMovingRight) this.x += this.dx;

		// Boundaries within canvas
		if (this.x < 0) {
			this.x = 0;
		} else if (this.x + this.width > canvas.width) {
			this.x = canvas.width - this.width;
		}
	},

	reset() {
		this.x = canvas.width / 2 - 50; // Initial x position
		this.y = canvas.height - 20;
		this.isMovingLeft = false;
		this.isMovingRight = false;
	}
};

// Ball object
const ball = {
	x: canvas.width / 2, // Initial x position
	y: canvas.height - 30, // Initial y position
	radius: 10,
	dx: 2, // Initial horizontal velocity
	dy: -2, // Initial vertical velocity
	velocityIncrement: level * 0.001, // Amount to increment the velocity over time

	// Method to update the ball's position
	update() {
		this.x += this.dx; // Update the x position based on the horizontal velocity
		this.y += this.dy; // Update the y position based on the vertical velocity

		// Bouncing off walls conditions
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx; // Reverse the horizontal velocity to bounce off the wall
			// Increase velocity with collisions
			if (this.dx > 0) {
				this.dx += this.velocityIncrement;
			} else {
				this.dx -= this.velocityIncrement;
			}

			if (this.dy > 0) {
				this.dy += this.velocityIncrement;
			} else {
				this.dy -= this.velocityIncrement;
			}
		}
		if (this.y - this.radius < 0) {
			this.dy = -this.dy;
			// Increase velocity with collisions
			if (this.dx > 0) {
				this.dx += this.velocityIncrement;
			} else {
				this.dx -= this.velocityIncrement;
			}

			if (this.dy > 0) {
				this.dy += this.velocityIncrement;
			} else {
				this.dy -= this.velocityIncrement;
			}
		} // Reverse the vertical velocity to bounce off the ceiling

		// Bouncing off paddle conditions
		if (
			this.y + this.radius > paddle.y &&
			this.x + this.radius > paddle.x - 1 &&
			this.x - this.radius < paddle.x + paddle.width - 2
		) {
			this.dy = -this.dy; // Reverse the vertical velocity to bounce off the paddle
			// Increase velocity with collisions
			if (this.dx > 0) {
				this.dx += this.velocityIncrement;
			} else {
				this.dx -= this.velocityIncrement;
			}

			if (this.dy > 0) {
				this.dy += this.velocityIncrement;
			} else {
				this.dy -= this.velocityIncrement;
			}
		}
		// Breaking bricks conditions
		bricks.list.forEach((brick) => {
			if (brick.status === 1) {
				// Calculate the center coordinates of the brick
				const brickCenterX = brick.x + bricks.width / 2;
				const brickCenterY = brick.y + bricks.height / 2;

				// Calculate the distance between the ball and the brick's center
				const dx = this.x - brickCenterX;
				const dy = this.y - brickCenterY;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Check if the distance is less than the sum of the ball's radius and the brick's width/height
				if (distance < this.radius + bricks.width / 2) {
					this.dy = -this.dy; // Reverse the vertical velocity

					brick.status = 0; // Set the brick's status to 0 to mark it as "removed"

					const brickScore = (bricks.rows - brick.row) * level;
					score += brickScore;
					updateScoreDisplay();

					// Increase velocity with collisions
					if (this.dx > 0) {
						this.dx += this.velocityIncrement;
					} else {
						this.dx -= this.velocityIncrement;
					}

					if (this.dy > 0) {
						this.dy += this.velocityIncrement;
					} else {
						this.dy -= this.velocityIncrement;
					}
				}
			}
		});

		// Game over conditions
		if (this.y + this.radius > canvas.height) isGameOver = true;
	},

	reset() {
		this.x = canvas.width / 2; // Initial x position
		this.y = canvas.height - 30; // Initial y position
		this.dx = 2; // Initial horizontal velocity
		this.dy = -2; // Initial vertical velocity
	}
};

// Bricks object
const bricks = {
	rows: 10,
	columns: 10,
	width: 69,
	height: 20,
	padding: 2,
	colors: ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9"],

	respawn() {
		this.list = [];
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				const brickX = col * (this.width + this.padding);
				const brickY = row * (this.height + this.padding);
				const colorIndex = (this.rows - row) % this.colors.length; // Increment the color index and wrap around if necessary
				const brickColor = this.colors[colorIndex]; // Get the current color
				this.list.push({
					x: brickX,
					y: brickY,
					status: 1,
					color: brickColor,
					row: row
				}); // Create a brick object with position, status, and color properties
			}
		}
	},

	checkRespawn() {
		// Check if all bricks have status 0
		if (this.list.every((brick) => brick.status === 0)) {
			console.log("YESSS");
			level++; // Increment the level
			this.respawn(); // Respawn the bricks
		}
	},

	draw() {
		this.list.forEach((brick) => {
			if (brick.status === 1) {
				ctx.fillStyle = brick.color; // Set the fill color for the brick
				ctx.fillRect(brick.x, brick.y, this.width, this.height); // Draw the brick as a filled rectangle
			}
		});
	}
};

/* Draw */
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Background
	ctx.fillStyle = "#444654";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw the paddle
	ctx.fillStyle = "#9b683b"; // Set the fill color
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height); // Draw a filled rectangle

	// Draw the ball
	ctx.beginPath(); // Begin drawing a path
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Draw a circle
	ctx.fillStyle = "#fbb732"; // Set the fill color
	ctx.fill(); // Fill the circle with the chosen color
	ctx.closePath(); // Close the path

	// Draw the bricks
	bricks.draw();

	if (isGameOver) {
		gameOverDraw();
	}
}

function gameOverDraw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Background
	ctx.fillStyle = "#444654";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Text
	ctx.font = "65px sans-serif";
	ctx.fillStyle = "#9cdd0a";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("GAME OVER", 350, 200);
}

/* Update the loop*/
function update() {
	paddle.update();
	ball.update();
	bricks.checkRespawn();
	// checkCollisions();
	// checkWinCondition();
	// checkLossCondition();
}

// Game loop
function gameLoop() {
	update();
	draw();

	if (!isGameOver && !isPaused) {
		gameRequestId = requestAnimationFrame(gameLoop);
	}
}

/* Handle keys */

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
	if (event.keyCode === 37) {
		paddle.moveLeft();
	} else if (event.keyCode === 39) {
		paddle.moveRight();
	}
}

function handleKeyUp(event) {
	if (event.keyCode === 37 || event.keyCode === 39) {
		// Stop moving the paddle when the arrow keys are released
		paddle.stopMoving();
	}
}

/*Start game*/
function startGame() {
	if (!isPaused) return;
	isGameOver = false;
	isPaused = false;
	// bricks.init();
	gameRequestId = requestAnimationFrame(gameLoop);
}

document.getElementById("startButton").addEventListener("click", startGame);

/*Pause game*/
function pauseGame() {
	isPaused = true;
}
document.getElementById("pauseButton").addEventListener("click", pauseGame);

/*Reset game*/
function resetGame() {
	cancelAnimationFrame(gameRequestId);
	paddle.reset();
	ball.reset();
	bricks.respawn();
	score = 0;
	updateScoreDisplay();
	level = 1;
	isGameOver = false;
	isPaused = false;
	gameRequestId = requestAnimationFrame(gameLoop);
}
document.getElementById("resetButton").addEventListener("click", resetGame);

resetGame();
isPaused = true;

});