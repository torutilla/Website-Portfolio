import Entity from "./systems/game/entities/entity.js";
import SpriteImage from "./options/sprite_options.js";
import Vector2 from "./math/vector.js";
import { player_state, player_image } from "./playerConst.js";
import InputManager from "./systems/key_bindings/Input.js";
import ImageLoader from "./type/imageLoader.js";
import Area2D from "./collision/area2d.js";
import CircleCollisionShape from "./collision/circleCollisionShape.js";
import Circle from "./math/circle.js";
import UserInterfaceController from "./systems/user_interface/uiController.js";

export default class Player extends Entity {
    constructor(){
        const option = new SpriteImage({
            imageSource: player_state.idle.src,
            sx: 0, sy: 0,
            sourceSize: {x: 64, y: 64},
            destinationSize: {x: 48, y: 48},
            totalFrames: player_state.idle.totalFrames, 
            offset: {x: 10, y: 10}
        }); 
        super(option);
        this.position = new Vector2(250, 250);
        this.currentState = player_state.idle.name;
        this.collision_shape.position = new Vector2(320, 100);
        this.movementSpeed = 150;
        this.jumpForce = -350;
        this.area_position = this.collision_shape.shape.getCenter();
        this.area = new Area2D(
            new CircleCollisionShape(
                new Circle(this.area_position, 70)
            )
        );
        
        this.area.attach_owner(this);
        this.area.on('body_entered', this.area_body_entered);
        this.area.on('body_exited', this.area_body_exited);
        // player_image.idle.src = player_state.idle.src;
        // player_image.run.src = player_state.run.src;
        // player_image.jump.src = player_state.jump.src;
        // player_image.fall.src = player_state.fall.src;
    }


    async init(){
        player_image.idle = await ImageLoader.load(player_state.idle.src);
        player_image.run = await ImageLoader.load(player_state.run.src);
        player_image.jump = await ImageLoader.load(player_state.jump.src);
        player_image.fall = await ImageLoader.load(player_state.fall.src);
    }
    
    move(){
        let dir = InputManager.get_vector('move_left', 'move_right', 'jump');
        if (dir.x > 0){
            this.flipX = false;
            this.physics.velocity.x = this.movementSpeed;
        } else if (dir.x < 0){
            this.flipX = true;
            this.physics.velocity.x = -this.movementSpeed;
        }else{
            this.physics.velocity.x = 0;
        }
        this.jump(dir.y);
    }
    jump(direction){
        if(direction < 0 && this.isGrounded){
            this.physics.velocity.y = this.jumpForce;
        }
    }
    physicsProcess(delta){
        
        this.move(); 
        this.physics.velocity.y += this.physics.gravity * delta;
        this.collision_shape.position.x += this.physics.velocity.x * delta;
        this.collision_shape.position.y += this.physics.velocity.y * delta;
        
        this.position = this.collision_shape.position;
        this.area.collisionShape.updatePosition(this.collision_shape.shape.getCenter());
        this.isGrounded = false;
    }

    updateAnimation(){
        let newState;
        if(!this.isGrounded){
            newState = this.physics.velocity.y > 0 ? player_state.fall.name : player_state.jump.name;
        }
        else{
            newState = this.physics.velocity.x != 0
                    ? player_state.run.name
                    : player_state.idle.name;
        }
        this.setAnimation(newState);
    }

    setAnimation(name){
        if(this.currentState != name){
        this.currentState = name;
        this.sprite_option.image = player_image[name];
        this.sprite_option.totalFrames = player_state[name].totalFrames;
            this.currentFrame = 0;
            this.frameTimer = 0;
        }
    }
    
    area_body_entered(body){
        console.log('entered', body);
        const ui = new UserInterfaceController('main-ui');
        ui.add_interaction_button(body);
    }

    area_body_exited(body){
        console.log('exited', body);
        const ui = new UserInterfaceController('main-ui');
        ui.remove_interaction_button(body);
    }
}




