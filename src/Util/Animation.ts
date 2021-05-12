export default class MyAnimation {
    sprite: string;
    frameWidth: number;
    frameHeight: number;
    frameRate: number;
    frameSet: number[];
    count = 0;
    currentIndex = 0;

    constructor(s, fw, fh, fr, fs) {
        this.sprite = s;
        this.frameWidth = fw;
        this.frameHeight = fh;
        this.frameRate = fr;
        this.frameSet = fs;
    }
}