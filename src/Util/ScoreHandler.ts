export default class ScoreHandler {
  constructor() {}

  scoreToText(score: number):string {
    const scoreText = Array.from(String(score), Number);
    for (let i = 0; i < 5 - String(score).length; i++) {
      scoreText.unshift(0);
    }
    return scoreText.join("");
  }
}
