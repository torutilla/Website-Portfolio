import Entity from "./entity.js";
import SpriteImage from "./options/sprite_options.js";
import CollisionShape from "./collision/collishionShape.js"
import Vector2 from "./math/vector.js";
export default class Player extends Entity {
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
            image: player_actions.idle.src,
            sx: 0, sy: 0,
            sourceSize: {x: 32, y: 32},
            destinationSize: {x: 32, y:32},
            totalFrames: player_actions.idle.totalFrames, 
        });

        super(option);
        this.position = new Vector2(20, 20);
        document.addEventListener('keypress', (event)=>{
            this.move(event.key);
            this.currentKey = event.key;
        });
        document.addEventListener('keyup', (event)=>{
            this.currentKey = '';
        })
        this.collision_shape = new CollisionShape(this.position, this.sprite_option.destinationSize);
        this.currentKey = "";
        this.movementSpeed = 300;
    }
    move(key){
        console.log(key);
        
    }
    physicsProcess(delta){
        switch (this.currentKey.toLowerCase()) {
            case 'a':
                this.position.x -=  this.movementSpeed * delta;
                break;
            case 'd':
                this.position.x +=  this.movementSpeed * delta;
                break;
            default:
                // this.position = Vector2.ZERO
                break;
        }
        this.collision_shape.position = this.position;
    }
    
}




