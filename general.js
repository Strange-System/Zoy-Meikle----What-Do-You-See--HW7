function draw() {
  drawBG()
  if (!gearslist[0].file) {return}
  positionGear();
  for (let i = 0; i < gearslist.length; i++) {
  gearslist[i].personalfc++
  if (mouseIsPressed && gearslist[i].position % 1 === 0) { // This ideally would have gone in temporary.js, but the only temporary part of it is tied to the rest. The temporary thing is clicking to make the gears turn. There will be another trigger later on.
    gearslist[i].position += (1 / 105)
    gearslist[i].rotanimcount = 0
  }
  if (gearslist[i].position % 1 !== 0) {
      gearslist[i].position += gearslist[i].rotanimcount / 105
    if (gearslist[i].rotanimcount === 10) {
      gearsMakeSound();
    }
      if (gearslist[i].rotanimcount === 14) {
        gearslist[i].position += 0.1
        gearslist[i].position = floor(gearslist[i].position);
        gearslist[i].rotanimcount = 0
      }
    gearslist[i].rotanimcount++
    }
    push();
    translate(gearslist[i].progx, gearslist[i].progy + (Hper * 0.5 * (sin((frameCount * 1.5)+(i*72)))));
    rotate((gearslist[i].position * 45) + sin((frameCount/2.1 + 90)+(i*72)));
  image(gearslist[i].file, 0, 0, gearslist[i].progdia, gearslist[i].progdia);
  pop();
  for (let j = 0; j < gearslist[i].slots.length; j++) {
    gearslist[i].slots[j].position = j + gearslist[i].position
    gearslist[i].slots[j].w = gearslist[i].progdia / 5
    gearslist[i].slots[j].h = gearslist[i].progdia*5.6 / 20
    gearslist[i].slots[j].x = (gearslist[i].progdia / 2) * cos((gearslist[i].slots[j].position * 45) + sin((frameCount/2.1 + 90)+(i*72))) + (gearslist[i].progx)
    gearslist[i].slots[j].y = (gearslist[i].progdia / 2) * sin((gearslist[i].slots[j].position * 45) + sin((frameCount/2.1 + 90)+(i*72))) + (gearslist[i].progy + (Hper * 0.5 * (sin((frameCount * 1.5)+(i*72)))))
    image(gearslist[i].slots[j].file, gearslist[i].slots[j].x, gearslist[i].slots[j].y, gearslist[i].slots[j].w, gearslist[i].slots[j].h);
  }
}
}

function drawBG() {
  push()
  noStroke()
  const BottomGray = color(11, 11, 11)
  const BottomRed = color(31, 0, 0)
  const TopPurple = color(24, 0, 31)
  const TopDark = color(10, 10, 24)
  const darkTweenFactor = sin((((frameCount % 2000) / 1000)-1)*180);
  let c1 = lerpColor(TopDark, TopPurple, darkTweenFactor);
  const lightTweenFactor = sin((((frameCount % 1200) / 600)-1)*180);
  let c2 = lerpColor(BottomGray, BottomRed, lightTweenFactor);
  const stripeHeight = 1;
  for (let y = 0; y < height; y += stripeHeight) {
    let inter = y / height;
    let c = lerpColor(c1, c2, inter);
    fill(c);
    rect(0, y, width, stripeHeight);
  }
  pop();  
}

function gearsMakeSound() {

  if (gsnd123 === 3) {
        GearSounds.turn1[GearSounds.idx1].play();
        GearSounds.idx1 = (GearSounds.idx1 + 1) % GearSounds.turn1.length;
        gsnd123 = floor(random(1,3));
      } else if (gsnd123 === 2) {
        GearSounds.turn2[GearSounds.idx2].play();
        GearSounds.turn2[GearSounds.idx2].jump(0.2);
        GearSounds.idx2 = (GearSounds.idx2 + 1) % GearSounds.turn2.length;
        gsnd123 = (2 * floor(random(1,3))) - 1;
      } else {
        GearSounds.turn3[GearSounds.idx3].play();
        GearSounds.idx3 = (GearSounds.idx3 + 1) % GearSounds.turn3.length;
        gsnd123 = floor(random(2,4));
      }
}

function positionGear() {
  for (let i = 0; i < gearslist.length; i++) {
  gearslist[i].dia = 95 * Wper / (gearslist.length + 2)
  gearslist[i].x = (100/(gearslist.length+1))*(i+1) * Wper
  if (gearslist[i].progdia < (gearslist[i].dia - (1 * Wper))) {
    gearslist[i].progdia += ((gearslist[i].dia - gearslist[i].progdia) / 10) + Wper / 2
  } else if (gearslist[i].progdia > (gearslist[i].dia + (1 * Wper))) {
    gearslist[i].progdia += ((gearslist[i].dia - gearslist[i].progdia) / 10) - Wper / 2
  } else {
    gearslist[i].progdia = gearslist[i].dia
  }

    if (gearslist[i].progx < (gearslist[i].x - (1 * Wper))) {
    gearslist[i].progx += ((gearslist[i].x - gearslist[i].progx) / 10) + Wper / 2
  } else if (gearslist[i].progx > (gearslist[i].x + (1 * Wper))) {
    gearslist[i].progx += ((gearslist[i].x - gearslist[i].progx) / 10) - Wper / 2
  } else {
    gearslist[i].progx = gearslist[i].x
  }
    
     if (gearslist[i].progy < (gearslist[i].y - (1 * Hper))) {
    gearslist[i].progy += ((gearslist[i].y - gearslist[i].progy) / 10) + Hper / 2
  } else if (gearslist[i].progy > (gearslist[i].y + (1 * Hper))) {
    gearslist[i].progy += ((gearslist[i].y - gearslist[i].progy) / 10) - Hper / 2
  } else {
    gearslist[i].progy = gearslist[i].y
  }
  }
}