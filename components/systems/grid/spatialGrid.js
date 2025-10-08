import Collision from "../../collision/collision.js";
import RectCollisionShape from "../../collision/rectCollisionShape.js";

export default class SpatialGrid{
    /**
     * @param {number} cellSize 
     */
    constructor(cellSize){
        this.cellSize = cellSize;
        /** @type {Map<string, RectCollisionShape[]>}*/
        this.cells = new Map();
    }

    _key(x, y){return `${x}, ${y}`;}

    /**
     * @param {RectCollisionShape} obj 
     * @param {(x:number, y:number) => void} fn 
    */
    #getCoveredCells(obj, fn){
        const aabb = obj.getAABB();
        const {minX, minY, maxX, maxY} = this.getCells(aabb);
        for(let y = minY; y<= maxY; y++){
            for(let x = minX; x<= maxX; x++){
                fn(this._key(x,y));
            }
        }
    }

    getCells(aabb){
        const minX = Math.floor(aabb.x / this.cellSize);
        const minY = Math.floor(aabb.y / this.cellSize);
        const maxX = Math.floor((aabb.x + aabb.width) / this.cellSize);
        const maxY = Math.floor((aabb.y + aabb.height) / this.cellSize);
        return {minX: minX, minY: minY, maxX: maxX, maxY: maxY};
    }
    
    add(obj){
        this.#getCoveredCells(obj, (key)=>{
            if(!this.cells.has(key)) {
                this.cells.set(key, new Set());
            }
            this.cells.get(key).add(obj);
        });
        obj.gridCells = this.getCells(obj.getAABB());
        // console.log(this.cells);
    }

    update(obj){
        const newCells = this.getCells(obj.getAABB());
        if(obj.gridCells){
            const {minX, maxX, minY, maxY} = obj.gridCells;
            if(minX === newCells.minX && minY === newCells.minY && maxX === newCells.maxX && maxY === newCells.maxY){
                return;
            }
            this.remove(obj);
        }
        this.add(obj);
    }

    remove(obj){
        if(!obj.gridCells) return;
        const { minX, minY, maxX, maxY } = obj.gridCells;
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const key = this._key(x, y);
                const bucket = this.cells.get(key);
                if (bucket) {
                    bucket.delete(obj);
                    if (bucket.size === 0) this.cells.delete(key);
                }
            }
        }
        delete obj.gridCells;
    }
    
    getNearby(obj){
        /** @type {Collision[]} */
        const neighbors = []
        this.#getCoveredCells(obj, (key)=>{
            const bucket = this.cells.get(key);
            if(bucket){
                neighbors.push(...bucket);
            }
        });
        
        return neighbors;
    }
    /**@param {CanvasRenderingContext2D} ctx  */
    debugDraw(ctx) {
        ctx.save();
        ctx.lineWidth = 1;
    
        for (let [key, bucket] of this.cells.entries()) {
            const [cellX, cellY] = key.split(",").map(v => parseInt(v));
            const x = cellX * this.cellSize;
            const y = cellY * this.cellSize;
    
            ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
            ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    
            for (let obj of bucket) {
                const aabb = obj.getAABB();
                ctx.strokeStyle = "rgba(0, 81, 255, 0.7)";
                ctx.strokeRect(aabb.x, aabb.y, aabb.width, aabb.height);
            }
        }
    
        ctx.restore();
    }
}