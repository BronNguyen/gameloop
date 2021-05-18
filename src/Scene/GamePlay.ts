// import update from "../InferiorPhaser/Update";
// import render from "../InferiorPhaser/Render";
// import State from "../InferiorPhaser/State";

// export default class GamePlay {
//   lastTime: number;
//    state: State;
//   constructor() {
//     this.lastTime = window.performance.now();
//     this.state = new State();
//   }

//   conductGamePlay( state: State) {
//     const loop = () => {
//       const time = window.performance.now();
//       const delta = time - this.lastTime;

//       update(time, delta, state);

//       render(state);

//       this.lastTime = time;

//       requestAnimationFrame(loop);
//     };
//     requestAnimationFrame(loop);
//   }
// }
