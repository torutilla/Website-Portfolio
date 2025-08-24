import Entity from "./entity.js";
import SpriteImage from "./options/sprite_options.js";
import CollisionShape from "./collision/collishionShape.js"
import Vector2 from "./math/vector.js";
import { player_state } from "./playerConst.js";
import Physics from "./physics.js";
import InputManager from "./Input.js";
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
        this.currentState = player_state.idle.name;
        this.collision_shape = new CollisionShape(this.position, this.sprite_option.destinationSize);
        this.currentKey = "";
        this.movementSpeed = 300;
        this.jumpForce = -400;
        this.physics = new Physics(this, 800);
        this.isGrounded = true;
        this.isJumping = false;
        
        // document.addEventListener('keypress', (event)=>{
            
        //     this.currentKey = event.key.toLowerCase();
        //     if(this.currentKey == ' ' && this.isGrounded){
        //         this.jump();
        //         this.isGrounded = false;
        //     }
            
            
        // });
        // document.addEventListener("keyup", (event) => {
        //     if (event.key === this.currentKey) this.currentKey = "";
        // });
        
    }
    move(){
        let dir = InputManager.get_action_strength('move_right') - InputManager.get_action_strength('move_left');
        if ( dir > 0){
            this.physics.velocity.x = this.movementSpeed;
        } else if (dir < 0){
            this.physics.velocity.x = -this.movementSpeed;
        }else{
            this.physics.velocity.x = 0;
        }
        // switch (this.currentKey) {
        //     case 'a':
        //         this.physics.velocity.x = -this.movementSpeed;
        //         // this.setAnimation('run');
        //         // this.position.x -=  this.movementSpeed * delta;
        //         break;
        //     case 'd':
        //         // this.setAnimation('run');
        //         this.physics.velocity.x = this.movementSpeed;
        //         break;
        //     default:
        //         this.physics.velocity.x = 0;
        //         break;
        // } 
    }
    jump(){
        this.physics.velocity.y = this.jumpForce;
    }
    physicsProcess(delta){
        this.move();
        // switch (this.currentState) {
        //     case "run":
        //         this.move();
        //         break;
        //     case "jump":
        //         if (this.isJumping) {
        //             this.jump();         
        //             this.isJumping = false; 
        //         }
        //         // this.setAnimation(this.currentState);
        //         break;
        //     case "idle":
        //         // this.setAnimation(this.currentState);
        //         break;
        //     default:
        //         break;
        // }
        // console.log(this.isGrounded);    
        this.physics.velocity.y += this.physics.gravity * delta;
        this.position.x += this.physics.velocity.x * delta;
        this.position.y += this.physics.velocity.y * delta; 
        
        const groundLevel = 250;
        if (this.position.y >= groundLevel) {
            this.position.y = groundLevel;
            this.physics.velocity.y = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
        
        // if (!this.isGrounded && this.physics.velocity.y > 0) {
        //     // console.log(this.currentState);
        //     this.currentState = player_state.fall.name;
            
        // }
        if(!this.isGrounded){
            this.currentState = this.physics.velocity.y > 0 ? player_state.fall.name : player_state.jump.name;
        }
        else{
            this.currentState = this.physics.velocity.x !== 0
                    ? player_state.run.name
                    : player_state.idle.name;
        }

        this.setAnimation(this.currentState);
        this.collision_shape.position = this.position;
    }
    setAnimation(name){
        this.sprite_option.image.src = player_state[name].src;
        this.sprite_option.totalFrames = player_state[name].totalFrames;
    }
}




