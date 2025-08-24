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
}