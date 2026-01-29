export default class AudioPlayer {
    /**@type {AudioPlayer[]} */
    static audioList = [];
    /** @type {{ [src: string]: number }} */
    static volumes = {};
    static stopAll() {
        for (const audio of this.audioList) {
            audio.stop();
        }
    }
    static muteAll() {
        for (const audio of this.audioList) {
            audio.gainNode.gain.setValueAtTime(
                0,
                AudioPlayer.context.currentTime
            );
        }
    }
    static restoreVolumes() {
        for (const audio of this.audioList) {
            const v = this.volumes[audio.src] ?? 1;
            audio.setVolume(v);
        }
    }
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
        AudioPlayer.audioList.push(this);
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

    setVolume(v = 1) {
        const vol = Math.max(0, Math.min(1, v));
        this.gainNode.gain.setValueAtTime(
            vol,
            AudioPlayer.context.currentTime
        );
        AudioPlayer.volumes[this.src] = vol
    }

    isPlaying() {
        return this._isPlaying && AudioPlayer.context.state === "running";
    }
}
