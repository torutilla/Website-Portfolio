import EventBus from "../event/eventBus.js";

export default class BaseUI extends EventBus{
    constructor(id){
        super();
        this.ui = document.getElementById(id);
    }
    hide(){
        this.ui.classList.add('hide');
    }
    display(){
        this.ui.classList.remove('hide');
    }
}