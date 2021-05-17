class GameplayScene extends Scene {
    dino: Dino
    birds: [Bird]
  
    create() {
  
    }
  
    update() {
      this.dino.update()
      this.birds.forEach(bird.update())    
    }
  };