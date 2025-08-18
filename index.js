import Entity from "./components/entity.js";
import SpriteOption from "./components/options/sprite_options.js";
import SpriteImage from "./components/type/spriteImage.js";
import World from "./components/world.js";
import Game from "./components/game.js";
import Vector2 from "./components/math/vector.js";

const player_actions = {
    idle: './assets/Virtual Guy/Idle (32x32).png',
    run: './assets/Virtual Guy/Run (32x32).png',
    jump: './assets/Virtual Guy/Jump (32x32).png',
};
const img = new SpriteImage(player_actions.idle);

const option = new SpriteOption({
    image: img,
    sx: 0, sy: 0,
    sWidth: 32, sHeight: 32,
    dx: 0, dy: 0,
    dWidth: 64, dHeight: 64, 
    totalFrames: 11, frameWidth: 32
});

const world = new World('canvas', new Vector2(window.innerWidth, window.innerHeight));
const player = new Entity(option);
world.addEntity(player);
console.log(world.entities);
const game = new Game(world);
game.start();


