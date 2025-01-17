const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Circle properties
const circle = {
    x: 150,
    y: canvas.height / 2,
    radius: 50,
    color: "gold",
};

// Arrow properties
const arrow = {
    x: canvas.width - 100,
    y: canvas.height / 2,
    width: 20,
    height: 10,
    color: "black",
    speed: 2,
    moving: false,
};

// Draw circle
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// Draw arrow with 180-degree rotation
function drawArrow() {
    ctx.save();
    ctx.translate(arrow.x, arrow.y);
    ctx.rotate(Math.PI);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrow.width, -arrow.height);
    ctx.lineTo(-arrow.width, arrow.height);
    ctx.closePath();
    ctx.fillStyle = arrow.color;
    ctx.fill();
    ctx.restore();
}

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawArrow();
}

function checkCollision() {
    const arrowTipX = arrow.x;
    const distance = Math.abs(arrowTipX - circle.x);
    if (distance <= circle.radius) {
        circle.color = "red"; // Change circle color to red on hit
        return true; // Collision detected
    }
    return false;
}

// Animate the arrow
function animateArrow() {
    if (arrow.moving) {
        arrow.x -= arrow.speed;
        if (checkCollision()) {
            arrow.moving = false;
        }
        draw();
        if (arrow.moving) {
            requestAnimationFrame(animateArrow);
        }
    }
}

// Reset the game
function reset() {
    arrow.x = canvas.width - 100;
    arrow.moving = false;
    circle.color = "gold";
    draw();
}

// Event listeners
document.getElementById("hitButton").addEventListener("click", () => {
    if (!arrow.moving) {
        arrow.moving = true;
        animateArrow();
    }
});

document.getElementById("resetButton").addEventListener("click", reset);

draw();
