export default class CustomFont{
    static async preload(fonts){
        for(let font of fonts){
            const f = new FontFace(`${font.name}`, `url(${font.link})`)
            await f.load();
            document.fonts.add(f);
        }
    }
    /**@param {CanvasRenderingContext2D} ctx  */
    draw(ctx, text){
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; 
        ctx.shadowOffsetX = 2; 
        ctx.shadowOffsetY = 1; 
        ctx.shadowBlur = 3; 
        ctx.font = `${text.properties[1].value}px "PixelFont"`;
        ctx.fillStyle = text.properties[0].value;
        ctx.fillText(text.name.toUpperCase(), text.x, text.y)
    }
}