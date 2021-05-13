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
    ChangeFrame() {
        this.count = 0;
        this.currentIndex += 1;
        this.currentIndex >= this.frameSet.length
        ? (this.currentIndex = 0)
        : true;
    }
}