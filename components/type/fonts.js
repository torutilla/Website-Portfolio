export default class CustomFont{
    static async preload(fonts){
        for(let font of fonts){
            const f = new FontFace(`${font.name}`, `url(${font.link})`)
            await f.load();
            document.fonts.add(f);
        }
    }
}