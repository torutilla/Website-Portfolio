import Vector2 from "../../math/vector.js";

export default class InputManager{
    static keys_pressed = {};
    static input_mappings = {};
    static pause_input = false;
    static init(){
        const mobileHud = document.getElementById('mobile-hud');

        mobileHud.addEventListener('pointerdown', (event)=>{
            event.preventDefault();
            if(event.target.classList.contains('directional-button')){
                if(InputManager.pause_input) return;
                const direction = event.target.dataset.direction;
                if(direction) InputManager.keys_pressed[direction.toLowerCase()] = true;
            }
        });
        mobileHud.addEventListener('pointerup', (event)=>{
            if (InputManager.pause_input) return;
            const direction = event.target.dataset.direction;
            if(direction) InputManager.keys_pressed[direction.toLowerCase()] = false;
        });
        document.addEventListener('keydown', (event)=>{
            if(InputManager.pause_input) return;
            InputManager.keys_pressed[event.key.toLowerCase()] = true;
            
        });
        document.addEventListener('keyup', (event)=>{
            if (InputManager.pause_input) return;
            InputManager.keys_pressed[event.key.toLowerCase()] = false;
        });
    }   

    /** 
     * @param {string} action_name 
     * @param {string[]} keys 
     */
    static add_action(action_name, keys){
        this.input_mappings[action_name] = keys.map(e=> e.toLowerCase());
    }
    /**
     * 
     * @param {string} action_name 
     * @returns {number}
     */
    static get_action_strength(action_name){
        if(!this.input_mappings[action_name]) return 0;
        return this.input_mappings[action_name].some(key=> this.keys_pressed[key])? 1: 0;
    }
    /**
     * 
     * @param {string} left 
     * @param {string} right 
     * @param {string} up 
     * @param {string} down
     * @returns Vector2
     */
    static get_vector(left, right, up, down){
        const x = InputManager.get_action_strength(right) - InputManager.get_action_strength(left);
        const y = InputManager.get_action_strength(down) - InputManager.get_action_strength(up);
        const vector = new Vector2(x, y);
        const length = vector.magnitude();
        if(length > 1){
            vector.divSelf(length);
        }
        return vector;
    }
    
    static get_action_keys(key){
        return InputManager.input_mappings[key];
    }
}