
export default class Game{
    constructor(scene, physicsStep = 1000/ 60){
        this.scene = scene;
        this.lastTime = 0;
        this.physicsStep = physicsStep;
        this.accumulator = 0;
        
    }
    loop = (timestamp) => {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.accumulator += deltaTime;

        while (this.accumulator >= this.physicsStep) {
            this.scene.physicsUpdate(this.physicsStep / 1000);
            this.accumulator -= this.physicsStep;
        }

        this.scene.clear();
        this.scene.update(deltaTime / 1000);
        this.scene.draw();
        
        requestAnimationFrame(this.loop)
    }

    start(){
        requestAnimationFrame(this.loop)
    }
}