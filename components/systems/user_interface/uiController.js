import EventBus from "../event/eventBus.js";
import  AreaUIController from "./areaUIController.js";
import InteractionUI from "./interactionUI.js";
import MobileHUD from "./mobileHUD.js";
import InputManager from "../key_bindings/Input.js";
import AudioPlayer from "../../audio/audio_player.js";
import { isDesktop } from "../../utils/utils.js";
export default class UserInterfaceController extends EventBus{
    constructor(id){
        super(id);
        this.interactionController = new InteractionUI('interaction-box');
        this.areaController = new AreaUIController('modal-container');
        this.mobileHud = new MobileHUD('mobile-hud');
        this.close_audio = new AudioPlayer('/assets/audio/ui-click.mp3');
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
        this.interactionController.addOption(entity, btnText, true);
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

    showAreaUI(type){
        this.mobileHud.hide();
        InputManager.pause_input = true;
        this.areaController.displayArea(type);
        const handleClose = () =>{
            this.interactionController.handleOnClose();
            if(!isDesktop()) this.mobileHud.display();
            InputManager.pause_input = false;
            this.close_audio.stop();
            this.close_audio.play();
        }
        this.areaController.on('on_ui_close', handleClose)
    }

}