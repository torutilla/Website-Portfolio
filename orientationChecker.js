import { world } from "./script.js";

export default function checkOrientation(){
    world.resizeWorld();
    if(window.innerHeight > window.innerWidth){
        document.getElementById('orientation-blocker').style.display = 'flex';
    }else{
        document.getElementById('orientation-blocker').style.display = 'none';
    }
}