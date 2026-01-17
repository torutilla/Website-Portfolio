import BaseUI from "./baseUI.js";
import Skills from "../../ui/areas/skillsSection.js";
import AboutMe from "../../ui/areas/aboutMeSection.js";
import Education from "../../ui/areas/educationSection.js";
import Contacts from "../../ui/areas/contactsSection.js";
import Projects from "../../ui/areas/projectsSection.js";
import LeaveAreaSection from "../../ui/areas/leaveSection.js";
export default class AreaUIController extends BaseUI{
    constructor(id){
        super(id);
        this.areasUI = {
            "about": ()=> AboutMe(),
            "education":()=> Education(),
            "contact": ()=> Contacts(),
            "skills": ()=> Skills(),
            "projects": ()=> Projects(),
            "leave": ()=> LeaveAreaSection(),
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
        button.classList.add('close-button');
    
        const handleClose = () => {
            this.emit('on_ui_close');
            this.hide();
            this.ui.innerHTML = "";
            document.removeEventListener('keydown', this._escHandler);
        };
    
        this._escHandler = (e) => {
            if (e.key === "Escape") handleClose();
        };
    
        button.onclick = handleClose;
    
        this.display();
    
        document.addEventListener('keydown', this._escHandler);
    
        this.ui.append(button, ui);
    }
    
    
}