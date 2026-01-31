import { world } from "./script.js";
import UserInterfaceController from "./components/systems/user_interface/uiController.js";
import { isDesktop } from "./components/utils/utils.js";
export default function checkOrientation(){
    const uiController = new UserInterfaceController('main-ui');
    world.resizeWorld();
    if(isDesktop()){
        uiController.hideMobileHud();
    }else{
        uiController.showMobileHud();
    }
    
}

