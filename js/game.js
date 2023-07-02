var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

var numRows = 3; // Number of rows
var numCols = 9; // Number of columns
var boxHeight = 100; // Height of each box
var boxWidth = 150; // Width of each box
var horizontalSpacing = (canvas.width - (numCols * boxWidth)) / (numCols + 1); // Horizontal spacing between boxes
var verticalSpacing = (canvas.height - (numRows * boxHeight)) / (numRows + 1); // Vertical spacing between boxes
var boxColor = "red"; // Initial color of the boxes

// Create an array to hold the boxes
var boxes = [];

// Create the boxes
for (var row = 0; row < numRows; row++) {
  for (var col = 0; col < numCols; col++) {
    var x = (col + 1) * horizontalSpacing + col * boxWidth; // Calculate the x-coordinate for each box
    var y = (row + 1) * verticalSpacing + row * boxHeight; // Calculate the y-coordinate for each box

    // Generate random color for each box
    var randomColor = getRandomColor();

    // Generate box name (A to Z)
    var boxName = String.fromCharCode(65 + (row * numCols + col)); // Convert ASCII code to character

    // Create a new box object
    var newBox = {
  x: x,
  y: y,
  width: boxWidth,
  height: boxHeight,
  color: randomColor,
  name: boxName,
  velocityX: 1  // Set the initial velocity as 1
};

    // Add the new box to the array
    boxes.push(newBox);
  }
}

// Draw the boxes on the canvas
function drawBoxes() {
  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the boxes
  for (var i = 0; i < boxes.length; i++) {
    var currentBox = boxes[i];
    context.fillStyle = currentBox.color;
    context.fillRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
    context.fillStyle = "white";
    context.font = "14px Arial";
    context.textAlign = "center";
    context.fillText(currentBox.name, currentBox.x + currentBox.width / 2, currentBox.y + currentBox.height / 2);
  }
}


// Function to generate a random color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Call the drawBoxes function to draw the initial state of the boxes
drawBoxes();

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  var keyCode = event.keyCode || event.which;
  var keyName = event.key;

  var keyNameElement = document.getElementById("keyName");
  keyNameElement.textContent = "Key Name: " + keyName;

  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    if (keyCode === 65 + i || keyCode === 97 + i) {
      changeColor(box);
      removeBox(box);
    }
  }
  console.log("keyCode->>",keyCode)
  console.log("keyName->>",keyName)
}

function changeColor(box) {
  var randomColor = "blue";
  box.color = randomColor;
}

function removeBox(box) {
  setTimeout(function() {
    context.clearRect(box.x, box.y, box.width, box.height);
    
    // Check if the box is reaching the left or right edge
    if (box.x <= 0 || box.x + box.width >= canvas.width) {
      // Reverse the direction by multiplying the box's velocity by -1
      box.velocityX *= -1;
    }
    
    // Update the box's position based on its velocity
    box.x += box.velocityX;
    
    // Redraw the box at its new position
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.width, box.height);
    context.fillStyle = "white";
    context.font = "14px Arial";
    context.textAlign = "center";
    context.fillText(box.name, box.x + box.width / 2, box.y + box.height / 2);
  }, 200);
}