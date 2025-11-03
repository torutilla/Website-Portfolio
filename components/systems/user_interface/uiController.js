import EventBus from "../event/eventBus.js";

export default class UserInterfaceController extends EventBus{
    constructor(id){
        super();
        this.ui = document.getElementById(id);
        this.#scroll_fade();
    }

    hideMobileHud(id){
        document.getElementById(id).style.display = 'none';
    }
    showMobileHud(id){
        document.getElementById(id).style.display = 'flex';
    }

    #scroll_fade(){
        const box = document.getElementById('dialouge-box');
        box.addEventListener('scroll', ()=>{
            const scrollTop = box.scrollTop;
            const scrollHeight = box.scrollHeight;
            const clientHeight = box.clientHeight;
    
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
            let gradient = '';
            if(atTop){
                gradient = 'linear-gradient(to bottom, black 80%, transparent 100%)';
            }else if( atBottom){
                gradient = 'linear-gradient(to top, black 80%, transparent 100%)';
            }else{
                gradient = 'linear-gradient(to bottom, transparent 5%, black 20%, black 85%, transparent 100%)';
            }
    
            box.style.maskImage = gradient;
        })
    }
}