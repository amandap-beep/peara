let room = "main";
let trash = [];
let goo = [];
let trees = [];
let trashCollected = 0;
let gooCleaned = 0;

// Image variables
let oceanBackground, desertBackground, forestBackground;
let trashImage, gooImage, treeImage;

function preload() {
  // Load your images here, for example:
  oceanBackground = loadImage('2.png');
  desertBackground = loadImage('3.png');
  forestBackground = loadImage('4.png');
  
  trashImage = loadImage('trash.png');
  gooImage = loadImage('goo.jpeg');
  treeImage = loadImage('tree.png');
}

function setup() {
  createCanvas(700, 700);
  initializeTrash();
  initializeGoo();
}

function draw() {
  background(220);
  if (room === "main") {
    drawMainRoom();
  } else if (room === "ocean") {
    drawOcean();
  } else if (room === "desert") {
    drawDesert();
  } else if (room === "forest") {
    drawForest();
  }
}

function drawMainRoom() {
  fill(0);
  textSize(20);
  text("       Welcome to Eco Explorer! \n           Press 1,2, or 3 key to \n    save the different environments:", 200, 200);
  text("1: Ocean", 300, 300);
  text("2: Desert", 300, 350);
  text("3: Forest", 300, 400);
}

function keyPressed() {
  if (key === '1') {
    room = "ocean";
    trashCollected = 0;
    initializeTrash();
  } else if (key === '2') {
    room = "desert";
    gooCleaned = 0;
    initializeGoo();
  } else if (key === '3') {
    room = "forest";
    trees = [];
  } else if (key === ' ' && (trashCollected >= 5 || gooCleaned >= 3)) {
    room = "main";
  }
}

function drawOcean() {
  image(oceanBackground, 0, 0, width, height); // Draw ocean background image
  
  textSize(20);
  fill("white");
  text("Quick! Click on the trash to", 220, 60);

  // Draw trash images
  for (let i = trash.length - 1; i >= 0; i--) {
    let t = trash[i];
    image(trashImage, t.x - 10, t.y - 10, 20, 20); // Adjust position to center trash image
  }

  if (trashCollected >= 5) {
    textSize(24);
    text("    You saved them! \n Press SPACE to save \n   another environment", 220, height / 2);
  }
}

function mousePressed() {
  if (room === "ocean") {
    for (let i = trash.length - 1; i >= 0; i--) {
      let t = trash[i];
      if (dist(mouseX, mouseY, t.x, t.y) < 15) {
        trash.splice(i, 1);
        trashCollected++;
      }
    }
  } else if (room === "desert") {
    for (let i = goo.length - 1; i >= 0; i--) {
      let g = goo[i];
      if (dist(mouseX, mouseY, g.x, g.y) < 25) {
        goo.splice(i, 1);
        gooCleaned++;
      }
    }
  } else if (room === "forest") {
    trees.push({ x: mouseX, y: mouseY });
  }
}

function drawDesert() {
  image(desertBackground, 0, 0, width, height); // Draw desert background image
  
  textSize(30);
  fill("purple");
  text("Your mouse is a sponge! Click to clean the nuclear waste", 100, 30);
  
  for (let g of goo) {
    image(gooImage, g.x - 15, g.y - 15, 30, 30); // Adjust position to center goo image
  }
  
  if (gooCleaned >= 3) {
    textSize(24);
    fill(0);
    text("You cleaned it! Press SPACE to return", 130, height / 2);
  }
}

function drawForest() {
  image(forestBackground, 0, 0, width, height); // Draw forest background image
  
  textSize(20);
  fill("green");
  text("Click to plant trees", 300, 200);
  
  for (let t of trees) {
    image(treeImage, t.x - 5, t.y - 20, 200, 300); // Adjust position for tree image
  }
}

function initializeTrash() {
  trash = [];
  for (let i = 0; i < 5; i++) {
    trash.push({ x: random(50, width - 50), y: random(50, height - 50) });
  }
}

function initializeGoo() {
  goo = [];
  for (let i = 0; i < 3; i++) {
    goo.push({ x: random(50, width - 50), y: random(50, height - 50) });
  }
}
