export default class SpritePlayer {
    constructor(animations) {
        this.animations = animations;
    }
    play(animation_name){
        const curr = this.animations[animation_name];
    }
}
