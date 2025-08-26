import Vector2 from "../../math/vector.js";

export default class InputManager{
    static keys_pressed = {};
    static input_mappings = {};
    static init(){
        document.addEventListener('keydown', (event)=>{
            InputManager.keys_pressed[event.key.toLowerCase()] = true;
        });
        document.addEventListener('keyup', (event)=>{
            InputManager.keys_pressed[event.key.toLowerCase()] = false;
        });
    }

    static add_action(action_name, keys){
        this.input_mappings[action_name] = keys.map(e=> e.toLowerCase());
    }

    static get_action_strength(action_name){
        if(!this.input_mappings[action_name]) return 0;
        return this.input_mappings[action_name].some(key=> this.keys_pressed[key])? 1: 0;
    }

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