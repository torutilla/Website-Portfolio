import Entity from "./entity.js";
import SpriteImage from "./options/sprite_options.js";
import CollisionShape from "./collision/collishionShape.js"
import Vector2 from "./math/vector.js";
import { player_state } from "./playerConst.js";
import Physics from "./physics.js";
export default class Player extends Entity {
    constructor(){
        const option = new SpriteImage({
            image: player_state.idle.src,
            sx: 0, sy: 0,
            sourceSize: {x: 32, y: 32},
            destinationSize: {x: 64, y:64},
            totalFrames: player_state.idle.totalFrames, 
        }); 
        super(option);
        this.position = new Vector2(20, 250);
        document.addEventListener('keypress', (event)=>{
            this.currentKey = event.key.toLowerCase();
            if(this.currentKey == 'a' || this.currentKey == 'd'){
                this.currentState = player_state.run.name;
            } else if (this.currentKey == ' ') {
                this.currentState =  player_state.jump.name;
            } 
        });
        document.addEventListener('keyup', (event)=>{
            if(event.key == " "){
                this.currentState = player_state.fall.name;
            }else{
                this.currentState = player_state.idle.name;
            }
            this.currentKey = '';
        });
        this.collision_shape = new CollisionShape(this.position, this.sprite_option.destinationSize);
        this.currentKey = "";
        this.movementSpeed = 300;
        this.jumpForce = -200;
        this.currentState = player_state.idle.name;
        this.physics = new Physics(this, 800);
    }
    move(delta){
        switch (this.currentKey) {
            case 'a':
                // this.setAnimation('run');
                this.physics.velocity.x = -this.movementSpeed;
                // this.position.x -=  this.movementSpeed * delta;
                break;
            case 'd':
                // this.setAnimation('run');
                this.physics.velocity.x = this.movementSpeed;
                break;
            default:
                break;
        } 
    }
    jump(delta){
        this.physics.velocity.y = this.jumpForce;
    }
    physicsProcess(delta){
        this.setAnimation(this.currentState);
        this.physics.velocity.y += this.physics.gravity * delta;
        this.position.x += this.physics.velocity.x * delta;
        this.position.y += this.physics.velocity.y * delta;
        switch (this.currentState) {
            case "run":
                this.move(delta);
                break;
            case "jump":
                this.jump(delta);
                // this.setAnimation(this.currentState);
                break;
            case "idle":
                // this.setAnimation(this.currentState);
                break;
            default:
                break;
        }
        this.collision_shape.position = this.position;
    }
    setAnimation(name){
        this.sprite_option.image.src = player_state[name].src;
        this.sprite_option.totalFrames = player_state[name].totalFrames;
    }
}




