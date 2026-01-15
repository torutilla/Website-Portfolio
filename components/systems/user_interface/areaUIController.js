import BaseUI from "./baseUI.js";
import Skills from "../../ui/areas/skillsSection.js";
import InputManager from "../key_bindings/Input.js";
export default class AreaUIController extends BaseUI{
    constructor(id){
        super(id);
        this.areasUI = {
            "about": Skills,
            "education":Skills,
            "contact": Skills,
            "skills": Skills,
            "experience":Skills,
            "projects": Skills,
        }
    }

    display(type){
        InputManager.pause_input = !InputManager.pause_input;
        document.addEventListener('keydown', (e)=>{
            if(e.key.toLowerCase() =="escape"){
                this.emit('on_ui_close');
            }
        })
        const area = this.areasUI[type];
        const ui = area();
    }
    
}