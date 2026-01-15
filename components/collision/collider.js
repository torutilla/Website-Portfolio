import Rect from "../math/rect.js";

export default class Collider{
    /**
     * 
     * @param {number[]} data 
     * @param {number} width 
     * @param {number} height
     * @returns Rect[]
     */
    getRectFromTiles(data, width, height){
        const rects = [];
        for(let row = 0; row < height; row++){
            let col = 0;
            while(col < width){
                const gid = data[row * width + col];
                if(gid > 0){
                    let start = col;
                    let currentGid =gid;
                    while(col < width && data[row * width + col] > 0 && data[row * width + col] === currentGid){
                        col++;
                    }
                    rects.push(new Rect(
                        start, row,
                        col - start, 1,
                        currentGid,
                    ));
                }else{
                    col++;
                }
            }
        }
        return this.mergeRects(rects);
    }
    /**
     * 
     * @param {Rect[]} rects
     * @returns Merged Rects[] 
     */
    mergeRects(rects){
        const merged = [];
        rects.sort((a, b)=> a.y - b.y || a.x - b.x);
        for(let rect of rects){
            const match = merged.find(r => 
                r.x === rect.x && 
                r.width === rect.width && 
                r.y + r.height === rect.y
            );
            if(match){
                match.height += rect.height;
            }else{
                merged.push(
                    new Rect(rect.x, rect.y, rect.width, rect.height, rect.gid));
            }
        }
        return merged;
    }
}