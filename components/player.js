import Entity from "./entity.js";
import SpriteImage from "./type/spriteImage.js";
import SpriteOption from "./options/sprite_options.js";
export default class Player extends Entity{
    constructor(){
        const player_actions = {
            idle: './assets/Virtual Guy/Idle (32x32).png',
            run: './assets/Virtual Guy/Run (32x32).png',
            jump: './assets/Virtual Guy/Jump (32x32).png',
        };
        const img = new SpriteImage(player_actions.idle);
        const option = new SpriteOption({
            image: img,
            sx: 0, sy: 0,
            sWidth: 32, sHeight: 32,
            dx: 0, dy: 0,
            dWidth: 64, dHeight: 64, 
            totalFrames: 11, frameWidth: 32
        });
        super(option);
        document.addEventListener('keypress', (event)=>{
         this.move(event.key);
        });
    }
    move(key){
        switch (key.toLowerCase()) {
            case 'a':
                this.sprite_option.dx -= 10;
                break;
            case 'd':
                this.sprite_option.dx += 10
            default:
                break;
        }
    }
    
}




