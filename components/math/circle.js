import Vector2 from "./vector.js";

export default class Circle{
    constructor(x, y, radius){
        this.center = new Vector2(x, y);
        this.radius = radius;
    }

    

    /**@param {Rect} rect  */
    instersectsRect(rect){

        const closestX = Math.max(rect.x, Math.min(this.center.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(this.center.y, rect.y + rect.height));

        const dx = this.center.x - closestX;
        const dy = this.center.y - closestY;

        return dx * dx + dy * dy <= this.radius * this.radius;
    }

    /**@param {Circle} other  */
    intersectsCircle(other){
        const dx = other.center.x - this.center.x;
        const dy = other.center.y - this.center.y;
        const rSum = this.radius + other.radius;

        return dx * dx + dy * dy <= rSum * rSum; 
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    
}