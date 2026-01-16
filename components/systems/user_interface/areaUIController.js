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
            "projects": Skills,
        }
    }
    display(){
        this.ui.style.display = 'flex';
    }
    hide(){
        this.ui.style.display = 'none';
    }

    displayArea(type) {
        const ui = this.areasUI[type]();
        const button = document.createElement('button');
        button.className = "close-button";
    
        const handleClose = () => {
            this.emit('on_ui_close');
            this.hide();
            this.ui.removeChild(button);
            this.ui.removeChild(ui);
            InputManager.pause_input = false;
            document.removeEventListener('keydown', this._escHandler);
        };
    
        this._escHandler = (e) => {
            if (e.key === "Escape") handleClose();
        };
    
        button.onclick = handleClose;
    
        InputManager.pause_input = true;
        this.display();
    
        document.addEventListener('keydown', this._escHandler);
    
        this.ui.append(button, ui);
    }
    
    
}