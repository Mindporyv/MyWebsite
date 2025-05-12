const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {
  left: false,
  right: false,
  up: false
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
  if (e.key === "ArrowUp") keys.up = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "ArrowUp") keys.up = false;
});

const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  color: "cyan",
  dx: 0,
  dy: 0,
  onGround: false
};

const gravity = 0.5;
const friction = 0.8;
const platforms = [
  { x: 0, y: 370, width: 800, height: 30 },
  { x: 200, y: 300, width: 100, height: 10 },
  { x: 400, y: 250, width: 150, height: 10 },
  { x: 650, y: 200, width: 100, height: 10 }
];

function drawRect(obj) {
  ctx.fillStyle = obj.color || "#fff";
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function checkCollision(player, platform) {
  return (
    player.x < platform.x + platform.width &&
    player.x + player.width > platform.x &&
    player.y < platform.y + platform.height &&
    player.y + player.height > platform.y
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movement
  if (keys.left) player.dx = -3;
  else if (keys.right) player.dx = 3;
  else player.dx *= friction;

  player.dy += gravity;
  player.onGround = false;

  // Platform collision
  for (let p of platforms) {
    if (checkCollision(player, p)) {
      if (player.dy > 0 && player.y + player.height - player.dy <= p.y) {
        player.y = p.y - player.height;
        player.dy = 0;
        player.onGround = true;
      }
    }
    drawRect(p);
  }

  // Jump
  if (keys.up && player.onGround) {
    player.dy = -10;
    player.onGround = false;
  }

  player.x += player.dx;
  player.y += player.dy;

  drawRect(player);

  requestAnimationFrame(update);
}

update();
