import AudioPlayer from "./audio_player.js"

export default class AudioManager{
    /**@typedef {{id: string, src: string, loopPoint: number, volume: number}} Audio */

    /**@type {{[str:string]: AudioPlayer}} */
    static audioList = {}
    /**@param {Audio[]} audios */
    static add(...audios){
        for(const audio of audios){
            const audioPlayer = new AudioPlayer({id: audio.id, src: audio.src, loopPoint: audio.loopPoint})
            audioPlayer.setVolume(audio.volume ?? 1);
            AudioManager.audioList[audio.id] = audioPlayer;
        }
    }
    /**@param {string} str  */
    static get(str){
        return AudioManager.audioList[str];
    }
    static stopAll(){
        for (const value of Object.values(AudioManager.audioList)) {
            value.stop();
        }
    }
    static muteAll(){
        for (const value of Object.values(AudioManager.audioList)) {
            value.mute();
        }
    }
    static restoreVolumes() {
        for (const audio of Object.values(AudioManager.audioList)) {
            const v = audio.volume;
            audio.setVolume(v);
        }
    }
}