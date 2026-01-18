import AnimationPlayer from "../../animation/animation_player.js";
import Vector2 from "../../math/vector.js";
import SpriteImage from "../../options/sprite_options.js";
import Sprite from "../../type/sprite.js";
import { getUIScale } from "../../utils/utils.js";

export default function Education(){
    const div = document.createElement('div');
    div.classList.add('education-ui', 'section');
    
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas-book-ui')
    
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    
    const sourceSize = new Vector2(744, 648);
    const scale = Math.max(1, getUIScale());
    const baseSize = new Vector2(500, 500).scale(scale);
    
    canvas.width = baseSize.x;
    canvas.height = baseSize.y;
    canvas.style.width = `${sourceSize.x}px`;
    canvas.style.height = `${window.innerWidth < 768? 350 : sourceSize.y}px`;

    div.appendChild(canvas);
    
    const option = new SpriteImage({imageSource: "/assets/ui/book.png", 
        sx: 0, sy: 0,
        totalFrames: 11, sourceSize: sourceSize, 
        destinationSize: baseSize, 
        repeat: false, frameInterval: 100, offset: {x: 0, y: 50}})

    const book = new Sprite(option);
    const player = new AnimationPlayer(book, {loop: false,  })
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

    return div;
}
