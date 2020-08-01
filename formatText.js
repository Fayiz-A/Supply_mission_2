function displayText(information, color, coordinateX, coordinateY) {
    //this function makes the formatting of text possible in just one line
    fill(color);
    textStyle(BOLD);
    textFont("cursive");
    textSize(25);
    text(information, coordinateX, coordinateY);
  }