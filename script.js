const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

let hearts = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = Math.random();
    this.color = `rgba(255, ${100 + Math.random() * 100}, ${150 + Math.random() * 100}, ${this.opacity})`;
  }

  draw() {
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    ctx.bezierCurveTo(
      this.x, this.y,
      this.x - this.size / 2, this.y,
      this.x - this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x, this.y + (this.size + topCurveHeight) / 1.5,
      this.x + this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y,
      this.x, this.y,
      this.x, this.y + topCurveHeight
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.size < 0) {
      this.y = canvas.height + Math.random() * 100;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

// Create hearts
function initHearts() {
  for (let i = 0; i < 50; i++) {
    hearts.push(new Heart(Math.random() * canvas.width, Math.random() * canvas.height, 15 + Math.random() * 10, 0.5 + Math.random() * 1.5));
  }
}
initHearts();

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animate);
}
animate();

// Adjust canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Button to spawn more hearts
document.getElementById("btnLove").addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    hearts.push(new Heart(Math.random() * canvas.width, canvas.height, 10 + Math.random() * 15, 1 + Math.random()));
  }
});
