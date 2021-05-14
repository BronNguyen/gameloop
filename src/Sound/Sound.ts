class Sound {
    sound = document.createElement("audio");
    constructor(src) {
        this.sound.src = src;
        this.sound.setAttribute("preload","auto");
        this.sound.setAttribute("controls","none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    playSound() {
        this.sound.play();
    }
}

export const hitSound = new Sound("./assets/hit.m4a");

export const reachSound = new Sound("./assets/reach.m4a");

export const jumpSound = new Sound("./assets/jump.m4a");