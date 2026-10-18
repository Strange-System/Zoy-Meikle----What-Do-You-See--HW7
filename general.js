/*

This utilizes your baseplate for the recursive tree, but the differences
are meaningful enough that I think you'll still see that I am demonstrating
understanding.

*/
const DEPTH_LIMIT = 10; // don't exceed 12 or so, it blows up!
const BRANCH_COLOR = "#1d0d16";
const NODE_COLOR = "#ff0381f3";
const NODE_SIZE = 5;
const LEAF_COLOR = "#ff3d9ef3";
const SNOW_COLOR = "#ffffff";
const LEAF_WIDTH = 18;
const LEAF_HEIGHT = 18;
const DRAW_BERRIES = false;
const BERRY_COLOR = "#ff3d9ef3";
const BERRY_SIZE = 9;

const INITIAL_LENGTH = 130;
const UPDATE_RATE_SECONDS = 5;
const DRAW_UPPER = true;
const DRAW_LOWER = false;
const DRAW_TUFT = true;

const GROUND_COLOR = "#8bc0a5";

function setup() {
  createCanvas(windowWidth, windowHeight);


}

function draw() {
  // only draw the scene once very few seconds, but be sure to draw
  // it on the first attempt as well.
  if (frameCount % (UPDATE_RATE_SECONDS * 60) && frameCount !== 1) {
    return;
  }
  push();
  angleMode(DEGREES);
  background("#444444");
  stroke(BRANCH_COLOR);
  noFill();
  if (DRAW_LOWER && DRAW_UPPER) {
    // move the coordinate system to the middle of the canvas
    translate(width / 2, height / 2);
  } else if (DRAW_LOWER) {
    translate(width / 2, height * 0.2);
  } else {
    translate(width / 2, height - height * 0.2);
  }
  if (DRAW_LOWER) {
    // draw the upside-down branch
    branch(0, INITIAL_LENGTH, 0, 0);
  }
  if (DRAW_UPPER) {
    noStroke();
    fill (GROUND_COLOR);
    rect (-(windowWidth/2)-10, 0, windowWidth+20, windowHeight);
    // flip to right side up
    rotate(180);
    // draw the right-side up branch
    branch(0, INITIAL_LENGTH, 0, 0);
  }
  pop();
}

function drawNode() {
  push();
  fill(NODE_COLOR);
  noStroke();
  ellipse(0, 0, NODE_SIZE, NODE_SIZE);
  pop();
} 

function drawBranch(depth, len, type) {
  push();
  stroke(BRANCH_COLOR);
  strokeWeight(DEPTH_LIMIT - depth);
  line(0, 0, 0, len);

  pop();
}

function drawLeaf(len) {
  push();
  const thisleafcolor = lerpColor(color(SNOW_COLOR), color(LEAF_COLOR), random(0,1));
  fill(thisleafcolor);
  noStroke();
  ellipse(0, len, LEAF_WIDTH, LEAF_HEIGHT);
  pop();
}

function drawBerry(len) {

  const x = randomGaussian() * len;
  const y = randomGaussian() * len / 4;
  push();
  fill(BERRY_COLOR);
  ellipse(x, y, BERRY_SIZE, BERRY_SIZE);
  pop();
}

function drawBerries(len) {
  // 10% chance of having 1 berry
  // 2% chance of having 2 berries
  const r = random();
  if (r > 0.98) {
    drawBerry(len);
    drawBerry(len);
  } else if (r > 0.9) {
    drawBerry(len);
  }
}

function branch(depth, len, type, rot) {
  if (depth > DEPTH_LIMIT) {
    drawNode();
    return;
  }
  drawBranch(depth, len, type);

  if (depth === DEPTH_LIMIT) {
    drawLeaf(len);
  }


  // pick points along the length of the branch using randomness
  const p1 = len * random(...[0.7, 0.9]);
  const p2 = len * random(...[0.7, 0.9]);
  
  if (DRAW_BERRIES === true) {
    drawBerries(len);
  }

    // making a central tuft
  if ((DRAW_TUFT && (depth === 0 || type === 3))) {
    push();
    translate(0, len);
    const rotval = random(-5, 5);
    rotate(rotval);
    branch(depth + 1, len * 0.8, 3, rot + rotval);
    pop();
  };

  // now we get into the recursive calls. To prevent side-effects,
  // surround all of this with push/pop pairs.
  if (type === 0 || type === 1 || type === 2 || (DRAW_TUFT && (depth === 0 || type === 3)) && depth >= DEPTH_LIMIT*0.4) {
  push();
  translate(0, p1); // make (0, p1) the new origin
  const rotval = random(40-rot/2, 20-rot/4);
  rotate(rotval); // turn left a random-ish amount
  branch(depth + 1, (len * (0.85 - (0.1 * abs(cos(rot +rotval))))), 1, rot + rotval); // recurse! increment depth
  pop();
  };

  // this is like the above block of code, except we move to a
  // different point and rotate slightly right this time.
  if (type === 0 || type === 1 || type === 2 || (DRAW_TUFT && (depth === 0 || type === 3)) && depth >= DEPTH_LIMIT*0.4) {
  push();
  translate(0, p2);
  const rotval = random(-40-rot/2, -20-rot/4);
  rotate(rotval);
  branch(depth + 1, (len * (0.85 - (0.1 * abs(cos(rot +rotval))))), 2, rot + rotval); // branches get 20% shorter per dive
  pop();
  };



  if ((type === 4 && depth === DEPTH_LIMIT - 1)) {
    push();
    translate(0, len);
    const rotval = random(-5-depth, 5+depth);
    rotate(rotval);
    branch(DEPTH_LIMIT, 0, 3, rot + rotval);
    pop();
  };

    twigs(depth, len, type, rot);
}

function twigs(depth, len, type, rot) {
  if ((random(0, 1) < depth / DEPTH_LIMIT && depth < DEPTH_LIMIT - 1 && type !== 4) || (random(0, 1) < depth / DEPTH_LIMIT && depth < DEPTH_LIMIT - 1 && type !== 4)) {
    push();
    translate(0, random(0,len));
    const rotval = random(-25, 25);
    rotate(rotval);
    branch(DEPTH_LIMIT-1, len * 0.8, 4, rot + rotval);
    pop();
    twigs(depth, len, type, rot);
  } else {return;}
}