export default class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(vector){
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }
    addSelf(vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    sub(vector){
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }
    subSelf(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    scale(s){
        return new Vector2(this.x * s, this.y * s);
    }
    scaleSelf(s){
        this.x *= s.x;
        this.y *= s.y;
        return this;
    }
    div(s){
        return new Vector2(this.x /s, this.y/s);
    }
    divSelf(s){
        this.x /= s.x;
        this.y /= s.y;
        return this;
    }
    normalize(){
        const magnitude = this.magnitude();
        return magnitude === 0? new Vector(0, 0) : this.div(magnitude);
    }
    magnitude(){
        return Math.hypot(this.x, this.y); 
    }
    dot(vector){
        return this.x * vector.x + this.y * vector.y;
    }
    cross(vector){
        return this.x * vector.y - this.y * vector.x;
    }
    clone(){
        return new Vector2(this.x, this.y);
    }
    angle(){
        return Math.atan2(this.y, this.x);
    }
    distance(vector) {
        return Math.hypot(this.x - vector.x, this.y - vector.y);
    }
    distanceSq(vector){
        const dx = this.x - vector.x, dy = this.y - vector.y;
        return dx*dx + dy*dy;
    }
    set(x, y){
        this.x = x;
        this.y = y;
    }
    lerp(vector, factor){
        return new Vector2(
            this.x + (vector.x - this.x) * factor,
            this.y + (vector.y - this.y) * factor,
        );
    }
}
Vector2.ZERO = new Vector2(0, 0);
Vector2.ONE = new Vector2(1, 1);
Vector2.UP = new Vector2(0, -1);
Vector2.DOWN = new Vector2(0, 1);
Vector2.LEFT = new Vector2(-1, 0);
Vector2.RIGHT = new Vector2(1, 0);