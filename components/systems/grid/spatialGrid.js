import CollisionShape from "../../collision/collishionShape.js";

export default class SpatialGrid{
    /**
     * @param {number} cellSize 
     */
    constructor(cellSize){
        this.cellSize = cellSize;
        /** @type {Map<string, CollisionShape[]>}*/
        this.cells = new Map();
    }

    _key(x, y){return `${x}, ${y}`;}

    /**
     * @param {CollisionShape} obj 
     * @param {(x:number, y:number) => void} fn 
    */
    #getCoveredCells(obj, fn){
        const aabb = obj.getAABB();
        const {minX, minY, maxX, maxY} = this.getCells(aabb);
        for(let y = minY; y<= maxY; y++){
            for(let x = minX; x<= maxX; x++){
                fn(x, y);
            }
        }
    }

    getCells(aabb){
        const minX = Math.floor(aabb.x / this.cellSize);
        const minY = Math.floor(aabb.y / this.cellSize);
        const maxX = Math.floor((aabb.x + aabb.w) / this.cellSize);
        const maxY = Math.floor((aabb.y + aabb.h) / this.cellSize);
        return {minX: minX, minY: minY, maxX: maxX, maxY: maxY};
    }
    
    add(obj){
        this.#getCoveredCells(obj, (x, y)=>{
            const key = this._key(x,y);
            const bucket = new Set();
            if(!this.cells.has(key)) this.cells.set(key, bucket);
            this.cells.get(key).add(obj);
        });
        obj.gridCells = this.getCells(obj);
        console.log(this.cells);
    }

    update(obj){
        const newCells = this.getCells(obj.getAABB());
        if(obj.gridCells){
            const {minX, maxX, minY, maxY} = obj.gridCells;
            if(minX === newCells.minX && minY === newCells.minY && maxX === newCells.maxX && maxY === newCells.maxY){
                return;
            }
        }
        this.remove(obj);
        this.add(obj);
        obj.gridCells = newCells;
        console.log(newCells);
    }

    remove(obj){
        if(!obj.gridCells) return;
        for(let key in obj.gridCells){
            /** @type {Set<CollisionShape>}*/
            const bucket= this.cells.get(key);
            if(bucket){
                bucket.delete(obj);
                if(bucket.size === 0) this.cells.delete(key);
            }
        }
        delete obj.gridCells;
    }
    
    getNearby(obj){
        /** @type {CollisionShape[]} */
        const neighbors = []
        this.#getCoveredCells(obj, (x, y)=>{
            const cell = this._key(x, y);
            const bucket = this.cells.get(cell);
            if(bucket){
                neighbors.push(...bucket);
            }
        });
        
        return neighbors;
    }
}