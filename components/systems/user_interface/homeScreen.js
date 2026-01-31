import AudioManager from "../../audio/audioManager.js";
import BaseUI from "./baseUI.js";

export default class HomeScreen extends BaseUI{
    constructor(){
        const id = "home-screen";
        super(id);
    }
    start(){
        const audio = AudioManager.get("ui_confirm");
        const bgm = AudioManager.get('bgm');
        const handler =()=>{
            audio.play();
            this.ui.classList.add('fade-out');
            this.ui.addEventListener('animationend', ()=>{
                this.ui.style.display = 'none';
                bgm.setVolume(0.4)
                bgm.play();
                document.removeEventListener('click', handler);
            }, {once: true})
        }
        document.addEventListener('click', handler)
    }
}