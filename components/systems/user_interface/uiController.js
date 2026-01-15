import EventBus from "../event/eventBus.js";
import  AreaUIController from "./areaUIController.js";
import InteractionUI from "./interactionUI.js";
import MobileHUD from "./mobileHUD.js";

export default class UserInterfaceController extends EventBus{
    constructor(id){
        super(id);
        this.interactionController = new InteractionUI('interaction-box');
        this.areaController = new AreaUIController('modal-container');
        this.mobileHud = new MobileHUD('mobile-hud');
    }
    
    hideDialougeBox(){
        this.dialouge_box.classList.add('hide');
    }

    hideMobileHud(){
        this.mobileHud.hide();
    }
    showMobileHud(){
        this.mobileHud.display();
    }
    static update(){

    }

    /**@param {()=> void} onInteract */
    add_interaction_button(entity, onInteract, btnText = "INTERACT"){
        this.interactionController.addOption(entity, btnText);
        this.interactionController.on('interact', onInteract);
    }

    remove_interaction_button(entity){
        this.interactionController.removeOption(entity);
    }

    showAreaUI(type){
        
    }

}