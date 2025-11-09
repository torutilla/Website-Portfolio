import Vector2 from "../../math/vector.js";
export default class Camera2D {
    /**@param {HTMLCanvasElement} canvas */
    constructor(x = 0, y = 0, zoom = 1, canvas) {
        this.x = x;          
        this.y = y;         
        this.zoom = zoom;   
        this.canvas = canvas;
    }

    focusOn(entity) {
        this.x = entity.position.x - this.canvas.width / (2 * this.zoom);
        this.y = entity.position.y - this.canvas.height / (2 * this.zoom);
    }

    getOffset() {
        return new Vector2(
            this.x,
            this.y
        );
    }

    worldToScreen(wx, wy) {
        return {
            x: (wx - this.x) * this.zoom,
            y: (wy - this.y) * this.zoom
        };
    }
    screenToWorld(sx, sy) {
        return {
            x: sx / this.zoom + this.x,
            y: sy / this.zoom + this.y
        };
    }
    
    begin(ctx) {
        ctx.save();
        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-this.x, -this.y);
    }

    end(ctx) {
        ctx.restore();
    }
}
