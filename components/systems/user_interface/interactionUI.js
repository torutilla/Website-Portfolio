import BaseUI from "./baseUI.js";
import InputManager from "../key_bindings/Input.js";
export default class InteractionUI extends BaseUI{
    constructor(id){
        super(id);
        this.#scroll_fade();
        this.interaction_keys = InputManager.get_action_keys('interact');
        
    }
    hide(){
        this.ui.style.display = 'none';
    }
    #scroll_fade(){
        const box = this.ui;
        box.addEventListener('scroll', ()=>{
            const scrollTop = box.scrollTop;
            const scrollHeight = box.scrollHeight;
            const clientHeight = box.clientHeight;
    
            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
            let gradient = '';
            if(atTop){
                gradient = 'linear-gradient(to bottom, black 80%, transparent 100%)';
            }else if(atBottom){
                gradient = 'linear-gradient(to top, black 80%, transparent 100%)';
            }else{
                gradient = 'linear-gradient(to bottom, transparent 5%, black 20%, black 85%, transparent 100%)';
            }
    
            box.style.maskImage = gradient;
        })
    }
    addOption(entity, btnText = "INTERACT"){
        const pastBtn = document.getElementById(entity.id)
        if(pastBtn){
            this.ui.removeChild(pastBtn);
        } 
        const button = document.createElement('button');
        button.classList.add('interact-option')
        button.id = entity.id;
        
        const key = document.createElement('div');
        key.classList.add('interaction-key')
        key.innerHTML = this.interaction_keys[0].toUpperCase();
        
        const option = document.createElement('div');
        option.classList.add('interact-option-text')
        option.innerHTML = btnText;

        button.appendChild(key);
        button.appendChild(option);

        button._handler = (event)=>{
            if(event.type == "pointerdown" || this.interaction_keys.includes(event.key?.toLowerCase())){
                this.emit('interact');
            }
        }
        
        button.addEventListener('pointerdown', button._handler);
        document.addEventListener('keydown', button._handler);

        this.ui.appendChild(button);
        requestAnimationFrame(() => button.classList.add("show"));
    }

    removeOption(entity){
        const button = document.getElementById(entity.id);
        if(!button) return;
        document.removeEventListener('keydown', button._handler);
        button.addEventListener('transitionend', () => {
            if (button.parentNode === this.ui) {
                this.ui.removeChild(button);
                console.log('removed interact option');
                if(!this.ui.children) this.hide();
            }
        }, { once: true });
    
        requestAnimationFrame(()=> {
            button.classList.remove('show');
            button.classList.add("hide")

        });
    }
}
