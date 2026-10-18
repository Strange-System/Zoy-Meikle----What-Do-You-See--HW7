let Wper;
let Hper;
let gsnd123;
let GEARIMAGE;
let EMPTYSLOT;
const gearslist = [];

let GearSounds = {
  turn1: [],
  turn2: [],
  turn3: [],
  idx1: 0,
  idx2: 0,
  idx3: 0,
}

async function setup() {
  if (windowWidth * 9 / 16 < windowHeight) {
    createCanvas(windowWidth, windowWidth * 9 / 16);
  } else {
    createCanvas(windowHeight * 16 / 9, windowHeight);
  }
  noLoop();
  angleMode(DEGREES);
  imageMode(CENTER);
  Wper = width / 100;
  Hper = height / 100;
  GEARIMAGE = await loadImage("./assets/Gear.png");
  EMPTYSLOT = await loadImage("./assets/Cards/Layout.png");

  gsnd123 = floor(random(1,4));

  
// Tried to do this stuff with a for loop,
// but use of loading things in a for loop makes it return an error
// because it thinks it's an infinite loop
// Well, in js p5 web, it did. I'll come back to this and see if that's not a problem anymore for github and vscode.
  let t1_a = await loadSound("./assets/Sounds/Gearturn1.mp3");
  let t1_b = await loadSound("./assets/Sounds/Gearturn1.mp3");
  let t1_c = await loadSound("./assets/Sounds/Gearturn1.mp3");
// Loading three copies to prevent cutting to repeat
  let t2_a = await loadSound("./assets/Sounds/Gearturn2.mp3");
  let t2_b = await loadSound("./assets/Sounds/Gearturn2.mp3");
  let t2_c = await loadSound("./assets/Sounds/Gearturn2.mp3");

  let t3_a = await loadSound("./assets/Sounds/Gearturn3.mp3");
  let t3_b = await loadSound("./assets/Sounds/Gearturn3.mp3");
  let t3_c = await loadSound("./assets/Sounds/Gearturn3.mp3");
    
  t1_a.amp(0.4); t1_b.amp(0.4); t1_c.amp(0.4);
  t2_a.amp(0.55); t2_b.amp(0.55); t2_c.amp(0.55);
  t3_a.amp(0.45); t3_b.amp(0.45); t3_c.amp(0.45);
  
  GearSounds.turn1 = [t1_a, t1_b, t1_c];
  GearSounds.turn2 = [t2_a, t2_b, t2_c];
  GearSounds.turn3 = [t3_a, t3_b, t3_c];

  initGear();

  loop();
  }