import AudioManager from "../../audio/audioManager.js";
import InputManager from "../key_bindings/Input.js";
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
                bgm.play();
                InputManager.pause_input = false;
                this.ui.removeEventListener('click', handler);
            }, {once: true})
        }
        this.ui.addEventListener('click', handler)
    }
}