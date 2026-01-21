export default class AudioPlayer {
    static context = new (window.AudioContext || window.webkitAudioContext)();

    /**
     * @param {string} src
     * @param {number|null} loopPoint seconds
     */
    constructor(src, loopPoint = null) {
        this.src = src;
        this.loopPoint = loopPoint;

        this.buffer = null;
        this.source = null;

        this.gainNode = AudioPlayer.context.createGain();
        this.gainNode.connect(AudioPlayer.context.destination);

        this._loadAudio(src);
    }

    async _loadAudio(src) {
        const res = await fetch(src);
        const buf = await res.arrayBuffer();
        this.buffer = await AudioPlayer.context.decodeAudioData(buf);
    }

    play() {
        if (!this.buffer) return;

        this.stop();

        const source = AudioPlayer.context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.gainNode);
        if (this.loopPoint !== null) {
            source.loop = true;
            source.loopStart = this.loopPoint;
            source.loopEnd = this.buffer.duration;
        }

        source.start(0);
        this.source = source;
    }

    stop() {
        if (this.source) {
            this.source.stop();
            this.source.disconnect();
            this.source = null;
        }
    }

    setVolume(v = 1) {
        this.gainNode.gain.setValueAtTime(
            Math.max(0, Math.min(1, v)),
            AudioPlayer.context.currentTime
        );
    }
}
