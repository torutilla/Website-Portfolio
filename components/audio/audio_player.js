export default class AudioPlayer {
    static context = new (window.AudioContext || window.webkitAudioContext)();
    
    /**
     * @typedef {{id: string, src: string, loopPoint: number|null}} AudioOptions
     * @param {AudioOptions}
     */
    constructor({id, src, loopPoint = null}) {
        this.id = id
        this.src = src;
        this.loopPoint = loopPoint;
        this.volume = 1;
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

        source.onended = () => {
            this._isPlaying = false;
            this.source = null;
        };

        source.start(0);
        this.source = source;
        this._isPlaying = true;
    }

    stop() {
        if (this.source) {
            this.source.stop();
            this.source.disconnect();
            this.source = null;
        }
        this._isPlaying = false;
    }

    mute(){
        this.gainNode.gain.setValueAtTime(0, AudioPlayer.context.currentTime)
    }

    setVolume(v = 1) {
        const vol = Math.max(0, Math.min(1, v));
        this.gainNode.gain.setValueAtTime(
            vol,
            AudioPlayer.context.currentTime
        );
        this.volume = vol;
    }

    isPlaying() {
        return this._isPlaying && AudioPlayer.context.state === "running";
    }
}
