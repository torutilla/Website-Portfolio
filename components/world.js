export default class World {
    constructor(canvasId, size){
        this.world = document.getElementById(canvasId);
        this.ctx = this.world.getContext('2d');
        
        this.world.width = size.x;
        this.world.height = size.y;
        
        this.entities = [];
        
    }
    addEntity(entity){
        this.entities.push(entity);
    }
    clear(){
        this.ctx.clearRect(0, 0, this.world.width, this.world.height);
    }
    draw(){
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx); 
        }
    }
    update(deltaTime) {
        for (let entity of this.entities) {
            if (entity.play){
                entity.play(deltaTime);
                entity.physicsProcess(deltaTime);
            } 
        }
    }
}