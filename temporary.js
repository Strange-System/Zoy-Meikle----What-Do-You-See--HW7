// this is where files that are temporary in order to allow the testing of concepts will reside.

function keyPressed() {
  if (key === 'r') {
    // This is to add more gears, which will be added as a function later on. I don't intend on them interlinking, but rather, being separate units.
    initGear();
    // I might make them interlink with other decorative gears down the line but these gears being made are designed to be like, board spaces independently moving, so these ones can't interlink for purposes of the game's planned design.
  }
}