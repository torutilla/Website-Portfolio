import AnimationPlayer from "../../animation/animation_player.js";
import Vector2 from "../../math/vector.js";
import SpriteImage from "../../options/sprite_options.js";
import Sprite from "../../type/sprite.js";

export default function Education(){
    const div = document.createElement('div');
    div.classList.add('education-ui', 'section')
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    div.appendChild(canvas);
    
    const option = new SpriteImage({imageSource: "/assets/ui/book.png", 
        sx: 0, sy: 0,
        totalFrames: 11, sourceSize: new Vector2(744, 636), 
        destinationSize: new Vector2(744, 636), 
        repeat: false, frameInterval: 100})

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
