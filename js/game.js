var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// Set initial position and speed of the box
var x = 50;
var y = canvas.height / 2;
var dy = 2; // vertical speed
var boxHeight = 50;
var boxWidth = 50;
var boxColor = "red"; // Initial color of the box

function drawBox() {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw box
  context.fillStyle = boxColor;
  context.fillRect(x, y, boxWidth, boxHeight);

  // Update position
  y -= dy;

  // Reverse direction if reaching the canvas edges
  if (y < -boxHeight) {
    y = canvas.height;
  } else if (y + boxHeight > canvas.height) {
    dy = Math.abs(dy);
  }

  // Request next animation frame
  requestAnimationFrame(drawBox);
}

// Start the animation
drawBox();

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  var keyCode = event.keyCode || event.which;
  var keyName = event.key;

  // Display the key name on the frontend
  var keyNameElement = document.getElementById("keyName");
  keyNameElement.textContent = "Key Name: " + keyName;

  // Check if the keyCode matches the key code for "A" (65)
  if (keyCode === 65) {
    changeColor();
    removeBox();
  }
  if (keyCode === 82) {
    changeColor();
    removeBox();
  }

  console.log("keyCode-->>",keyCode)
}

function changeColor() {
  // Generate random color
  var randomColor = "blue"
  // Update box color
  boxColor = randomColor;
}
function removeBox() {
  // Clear canvas after 2 seconds
  setTimeout(function () {
    context.clearRect(x, y, boxWidth, boxHeight);
    x = -boxWidth;
  }, 200);
}