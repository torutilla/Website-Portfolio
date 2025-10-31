import Vector2 from "../../math/vector.js";

export default class InputManager{
    static keys_pressed = {};
    static input_mappings = {};
    static init(){
        const mobileHud = document.getElementById('mobile-hud');

        mobileHud.addEventListener('pointerdown', (event)=>{
            if(event.target.classList.contains('directional-button')){
                const direction = event.target.dataset.direction;
                if(direction) InputManager.keys_pressed[direction.toLowerCase()] = true;
            }
        });
        mobileHud.addEventListener('pointerup', (event)=>{
            const direction = event.target.dataset.direction;
            if(direction) InputManager.keys_pressed[direction.toLowerCase()] = false;
        });
        document.addEventListener('keydown', (event)=>{
            InputManager.keys_pressed[event.key.toLowerCase()] = true;
        });
        document.addEventListener('keyup', (event)=>{
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
     * @returns number
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
     * @returns Vector2
     */
    static get_vector(left, right, up){
        const x = InputManager.get_action_strength(right) - InputManager.get_action_strength(left);
        const y = 0 - InputManager.get_action_strength(up);
        const vector = new Vector2(x, y);
        const length = vector.magnitude();
        if(length > 1){
            vector.divSelf(length);
        }
        return vector;
    }
}