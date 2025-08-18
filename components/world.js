class World {
    constructor(size){
        this.world = document.getElementById('canvas');
        this.ctx = world.getContext('2d');
        this.ctx.width = size.x;
        this.ctx.height = size.y;
    }
    
}