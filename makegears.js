function initGear() {
  gearslist.push(makeGear());
}

function makeGear() {
  const gear = {
    file: GEARIMAGE,
    dia: 0,
    x: 0,
    y: 0,
    position: 0,
    rotanimcount: 0,
    personalfc: 0,
    progx: 0,
    progy: 0,
    progdia: 0,
    slots: [],
};
  gear.y = 50 * Hper
  gear.progy = gear.y
  if (gearslist.length === 0) {
  gear.dia = 35 * Wper
  gear.x = 50 * Wper
  gear.progdia = gear.dia
  gear.progx = gear.x
  } else {
    gear.progdia = gearslist[gearslist.length - 1].dia
    gear.progx = gearslist[gearslist.length - 1].progx
    gear.progy = (100 * Hper) + (20 * Wper)
  }
  for (let i = 0; i < 8; i++) {
    gear.slots.push(makeSlot(i));
  }
  return gear;
}

function makeSlot(i) {
  const slot = {
    file: EMPTYSLOT,
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    pos: i,
};
  return slot;
}