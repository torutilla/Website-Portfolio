import { world } from "./script.js";
import UserInterfaceController from "./components/systems/user_interface/uiController.js";
import { isDesktop } from "./components/utils/utils.js";
const uiController = new UserInterfaceController('main-ui');
export default function checkOrientation(){
    world.resizeWorld();
    if(isDesktop()){
        uiController.hideMobileHud();
    }else{
        uiController.showMobileHud();
    }
    
}

