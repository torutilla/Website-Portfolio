import EventBus from "../event/eventBus.js";
import  AreaUIController from "./areaUIController.js";
import InteractionUI from "./interactionUI.js";
import MobileHUD from "./mobileHUD.js";
import InputManager from "../key_bindings/Input.js";
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

    /**@param {()=> void} onInteract */
    add_interaction_button(entity, onInteract, btnText = "INTERACT"){
        this.interactionController.addOption(entity, btnText);
        entity._onInteract = onInteract;
        this.interactionController.on('interact', entity._onInteract);
    }

    remove_interaction_button(entity){
        this.interactionController.removeOption(entity);
        if(entity._onInteract){
            this.interactionController.off('interact', entity._onInteract);
            delete entity._onInteract;
        }
    }

    showAreaUI(type, entity){
        this.mobileHud.hide();
        this.interactionController.off('interact', entity._onInteract)
        InputManager.pause_input = true;
        this.areaController.displayArea(type);
        const handleClose = () =>{
            this.mobileHud.display();
            InputManager.pause_input = false;
            this.interactionController.on('interact', entity._onInteract);
        }
        this.areaController.on('on_ui_close', handleClose)
    }

}