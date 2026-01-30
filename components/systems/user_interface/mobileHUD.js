import BaseUI from "./baseUI.js";

export default class MobileHUD extends BaseUI{
    constructor(id){
        super(id);
    }
    hide(){
        this.ui.classList.add('no-display')
    }
    display(){
        this.ui.classList.remove('no-display')
    }
}