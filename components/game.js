export default class Game{
    constructor(world){
        this.world = world;
        this.lastTime = 0;
    }
    loop = (timestamp) => {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.world.clear();
        this.world.update(deltaTime);
        this.world.draw();

        requestAnimationFrame(this.loop)
    }

    start(){
        requestAnimationFrame(this.loop)
    }
}