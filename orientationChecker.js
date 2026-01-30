import { world } from "./script.js";
import UserInterfaceController from "./components/systems/user_interface/uiController.js";

const uiController = new UserInterfaceController('main-ui');
export default function checkOrientation(){
    world.resizeWorld();
    if(isDesktop()){
        uiController.hideMobileHud();
    }else{
        uiController.showMobileHud();
    }
    
}

export function isDesktop() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return !isTouch && window.innerWidth >= 1280;
}