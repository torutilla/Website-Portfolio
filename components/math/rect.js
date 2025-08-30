import Vector2 from "./vector.js";

export default class Rect{
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getArea(){
        return this.width * this.height;
    }
    getCenter(){
        return new Vector2(this.x + this.width / 2, this.y + this.height /2);
    }
    contains(px, py) {
        return (
            px >= this.x &&
            px <= this.x + this.width &&
            py >= this.y &&
            py <= this.y + this.height
        );
    }
    intersects(other) {
        return !(
            other.x > this.x + this.width ||
            other.x + other.width < this.x ||
            other.y > this.y + this.height ||
            other.y + other.height < this.y
        );
    }
    draw(ctx, color = "red") {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}