import EventBus from "../event/eventBus.js";
import InputManager from "../key_bindings/Input.js";

export default class UserInterfaceController extends EventBus{
    static interact_key_available = false;
    constructor(id){
        super();
        this.ui = document.getElementById(id);
        this.dialouge_box = document.getElementById('dialouge-box');
        this.#scroll_fade();
        this.dialouge_mappings = new Map();
        this.interaction_keys = InputManager.get_action_keys('interact');
    }
    static update(){
        if(UserInterfaceController.interact_key_available && InputManager.get_action_strength('interact') == 1){
            console.log('interacted');
        }
    }
    hideMobileHud(id){
        document.getElementById(id).style.display = 'none';
    }
    showMobileHud(id){
        document.getElementById(id).style.display = 'flex';
    }

    #scroll_fade(){
        const box = this.dialouge_box;
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

    add_interaction_button(entity){
        const button = document.createElement('button');
        button.className = 'dialouge-option';
        button.id = entity.id;

        const key = document.createElement('div');
        key.className = 'interaction-key';
        key.innerHTML = this.interaction_keys[0].toUpperCase();

        const option = document.createElement('div');
        option.className = 'interact-option';
        option.innerHTML = "INTERACT";

        button.appendChild(key);
        button.appendChild(option);
        button.addEventListener('pointerdown', ()=>{
            console.log('interacted');
        });
        button.addEventListener('keydown', ()=>{
            console.log('interacted');
        });
        this.dialouge_box.appendChild(button);
        requestAnimationFrame(() => button.classList.add("show"));
        UserInterfaceController.interact_key_available = true;
    }

    remove_interaction_button(entity){
        UserInterfaceController.interact_key_available = false;
        const button = document.getElementById(entity.id);
        button.classList.remove('show');
        requestAnimationFrame(() => button.classList.add("hide"));
        button.addEventListener("transitionend", ()=> button.remove(), {once: true});
    }
}