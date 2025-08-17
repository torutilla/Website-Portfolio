export default class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    subtract(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    normalize(){
        const magnitude = this.magnitude();
        if (magnitude === 0) return this;
        this.x /= magnitude;
        this.y /= magnitude;
        return this;
    }
    magnitude(){
        return Math.hypot(this.x, this.y); 
    }
    dot(vector){
        return this.x * vector.x + this.y * vector.y;
    }
}