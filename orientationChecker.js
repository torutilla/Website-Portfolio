import { world } from "./script.js";
import UserInterfaceController from "./components/systems/user_interface/uiController.js";

const uiController = new UserInterfaceController('main-ui');
export default function checkOrientation(){
    world.resizeWorld();
    if(window.innerHeight > window.innerWidth){
        document.getElementById('orientation-blocker').style.display = 'flex';
    }else{
        document.getElementById('orientation-blocker').style.display = 'none';
    }

    if(window.innerWidth > 1024){
        uiController.hideMobileHud();
    }
}