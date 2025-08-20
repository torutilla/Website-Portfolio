export default class Game{
    constructor(world, physicsStep = 1000/ 60){
        this.world = world;
        this.lastTime = 0;
        this.physicsStep = physicsStep;
        this.accumulator = 0;
        
    }
    loop = (timestamp) => {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.accumulator += deltaTime;

        while (this.accumulator >= this.physicsStep) {
            this.world.physicsUpdate(this.physicsStep / 1000);
            this.accumulator -= this.physicsStep;
        }

        this.world.clear();
        this.world.update(deltaTime / 1000);
        this.world.draw();

        requestAnimationFrame(this.loop)
    }

    start(){
        requestAnimationFrame(this.loop)
    }
}