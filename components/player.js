import Entity from "./entity.js";
import SpriteImage from "./options/sprite_options.js";
import CollisionShape from "./collision/collishionShape.js"
import Vector2 from "./math/vector.js";
export default class Player extends Entity{
    constructor(){
        const player_actions = {
            idle: {
                src: './assets/Virtual Guy/Idle (32x32).png',
                totalFrames: 11,
            },
            run: {
                src: './assets/Virtual Guy/Run (32x32).png',
                totalFrames: 12,
            },
            jump: {
                src: './assets/Virtual Guy/Jump (32x32).png',
                totalFrames: 1,
            },
            fall: {
                src: './assets/Virtual Guy/Fall (32x32).png',
                totalFrames: 1,
            }
        };
        
        const option = new SpriteImage({
            image: player_actions.run.src,
            sx: 0, sy: 0,
            sWidth: 32, sHeight: 32,
            dx: 0, dy: 0,
            dWidth: 32, dHeight: 32, 
            totalFrames: player_actions.run.totalFrames, 
        });
        super(option);
        document.addEventListener('keypress', (event)=>{
            this.move(event.key);
        });
        this.initial_position = new Vector2(0,0);
        this.size = new Vector2(32, 32)
        this.collision = new CollisionShape(this.initial_position, this.size);
    }
    move(key){
        console.log(key);
        // switch (key.toLowerCase()) {
        //     case 'a':
        //         this.sprite_option.dx -= 10;
        //         break;
        //     case 'd':
        //         this.sprite_option.dx += 10
        //         break;
        //     default:
        //         break;
        // }
    }
    physicsProcess(delta){
        
    }
    
}




