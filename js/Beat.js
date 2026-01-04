class BeatManager {
    constructor(bpm, audioContext) {
        this.bpm = bpm; // 每分鐘節拍數
        this.beatInterval = 60000 / bpm; // 毫秒為單位的節拍間隔
        this.audioContext = audioContext;
        this.startTime = 0;
        this.currentBeat = 0;
    }

    start() {
        this.startTime = this.audioContext.currentTime;
    }

    getCurrentBeat() {
        const elapsed = (this.audioContext.currentTime - this.startTime) * 1000;
        return Math.floor(elapsed / this.beatInterval);
    }

    getTimeToBeat(beatNumber) {
        return (beatNumber * this.beatInterval) -
            ((this.audioContext.currentTime - this.startTime) * 1000);
    }

    // 檢查當前時間是否接近某個節拍
    isNearBeat(beatNumber, toleranceMs = 100) {
        const timeToBeat = Math.abs(this.getTimeToBeat(beatNumber));
        return timeToBeat <= toleranceMs;
    }
}

export { BeatManager };
