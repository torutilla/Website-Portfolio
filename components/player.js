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
            imageSource: player_state.idle_down.src,
            sx: 0, sy: 0,
            sourceSize: {x: 32, y: 64},
            destinationSize: {x: 32, y: 64},
            totalFrames: player_state.idle_down.totalFrames, 
            offset: {x: 10, y: 10},
            
        }); 
        super(option);
        this.position = new Vector2(250, 250);
        this.currentState = player_state.idle_down.name;
        this.collision_shape.position = new Vector2(320, 100);
        this.movementSpeed = 120;
        this.area_position = this.collision_shape.shape.getCenter();
        this.sprite_option.offset.x = -this.sprite_option.dWidth + this.sprite_option.dWidth;
        this.sprite_option.frameInterval = 0.09
        this.collision_shape.shape.width = this.sprite_option.dWidth
        this.collision_shape.shape.height = this.sprite_option.dHeight /3;
        this.sprite_option.offset.y = this.sprite_option.dHeight /1.5;
        this.area = new Area2D(
            new CircleCollisionShape(
                new Circle(this.area_position, 80)
            )
        );
        this.uiController = new UserInterfaceController('main-ui');
        this.lastDir = new Vector2(0, 1); 
        this.facing = "down";
        this.area.attach_owner(this);
        this.area.on('body_entered', (body) => this.area_body_entered(body));
        this.area.on('body_exited', (body) => this.area_body_exited(body));
        // player_image.idle.src = player_state.idle_down.src;
        // player_image.run.src = player_state.run.src;
        // player_image.jump.src = player_state.jump.src;
        // player_image.fall.src = player_state.fall.src;
    }


    async init(){
        player_image.idle_down = await ImageLoader.load(player_state.idle_down.src);
        player_image.idle_up = await ImageLoader.load(player_state.idle_up.src);
        player_image.idle_side = await ImageLoader.load(player_state.idle_side.src);
        player_image.walk_side = await ImageLoader.load(player_state.walk_side.src);
        player_image.walk_up = await ImageLoader.load(player_state.walk_up.src);
        player_image.walk_down = await ImageLoader.load(player_state.walk_down.src);
    }
    
    
    move(){
        const dir = InputManager.get_vector('move_left', 'move_right', 'move_up', 'move_down');
        
        if (dir.magnitude() > 0) {
            dir.normalizeSelf();
        }
    
        this.physics.velocity.x = dir.x * this.movementSpeed;
        this.physics.velocity.y = dir.y * this.movementSpeed;
    
      
        // if (dir.x > 0) this.flipX = false;
        // else this.flipX = true;
    
        this.lastDir = dir.clone();
        
    }
    
    physicsProcess(delta){
        
        this.move(); 
        
        this.collision_shape.position.x += this.physics.velocity.x * delta;
        this.collision_shape.position.y += this.physics.velocity.y * delta;
        
        this.position = this.collision_shape.position;
        this.area.collisionShape.updatePosition(this.collision_shape.shape.getCenter());

    }

    updateAnimation(){
    const vx = this.lastDir.x;
    const vy = this.lastDir.y;
    
    const moving = vx !== 0 || vy !== 0;
    const base = moving ? "walk" : "idle";
    if(moving){
        if (Math.abs(vy) > Math.abs(vx)) {
            this.facing = vy < 0 ? "up" : "down";
        } else {
            this.facing = "side";
            this.flipX = vx < 0;
        }
    }
    const newState = player_state[`${base}_${this.facing}`].name;

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
        const onClick = ()=>{
            this.uiController.hideUI();
        }
        this.uiController.add_interaction_button(body, onClick);
    }

    area_body_exited(body){
        console.log('exited', body);
        this.uiController.remove_interaction_button(body);
        this.uiController.displayUI();
    }
}




