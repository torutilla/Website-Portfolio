import SpriteImage from "../../options/sprite_options.js";
import Vector2 from "../../math/vector.js"
import AnimationPlayer from "../../animation/animation_player.js";
import Sprite from "../../type/sprite.js";
export default function Projects(){
    const desk = document.createElement('div');
    desk.classList.add('desk-ui');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('desk-content');
    
    const contentContainer = document.createElement('div');
    const title = document.createElement('p');
    title.innerText = "Projects";
    contentContainer.appendChild(title);

    const baseSize = new Vector2(224, 224);
    canvas.width = baseSize.x
    canvas.height = baseSize.y

    const option = new SpriteImage({
        imageSource: '/assets/ui/sheet.png',
        sourceSize: new Vector2(224, 224),
        destinationSize: baseSize,
        sx: 0, sy: 0,
        totalFrames: 1,
        frameInterval: 60
    });
    const sprite = new Sprite(option);
    const player = new AnimationPlayer(sprite, {loop: false});
    
    option.image.onload = () => {
        let lastTime = performance.now();
        
        function animate(now) {
            const delta = now - lastTime;
            lastTime = now;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.update(delta);
            player.draw(ctx, new Vector2(0, 0));
            
            requestAnimationFrame(animate);
        }
        
        animate(lastTime);
    };
    canvasContainer.append(canvas, contentContainer);
    desk.append(canvasContainer);
    
    return desk;
}