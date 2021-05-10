export default class Game {
  startGame() {
    this.myGameArea.start();
  }

  myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = 480;
      this.canvas.height = 270;
      const context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
  };
}
