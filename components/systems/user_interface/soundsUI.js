import BaseUI from "./baseUI.js";
import AudioManager from "../../audio/audioManager.js";
export default class SoundsUI extends BaseUI{
    constructor(){
        const id = "lobby-music-player";
        super(id);
        let active = false;
        this.ui.addEventListener('click', ()=>{
            if(!active){
                this.ui.classList.add('off');
                AudioManager.muteAll()
            }  else {
                this.ui.classList.remove('off');
                AudioManager.restoreVolumes();
            }
            active = !active;
        })
    }
}