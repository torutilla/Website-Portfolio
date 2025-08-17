import Player, { Sprite } from "./components/player.js";
import SpriteOption from "./components/options/sprite_options.js";
import AnimationPlayer from "./components/animation/animation_player.js";
import SpriteImage from "./components/type/spriteImage.js";
import InputBindings from "./key_bindings/bindings.js"
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player_action_sources = {
    idle: './assets/Virtual Guy/Idle (32x32).png',
    run: './assets/Virtual Guy/Run (32x32).png',
    jump: './assets/Virtual Guy/Jump (32x32).png',
};
const img = new SpriteImage(player_action_sources.idle);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const option = new SpriteOption({
    image: img,
    sx: 0, sy: 0,
    sWidth: 32, sHeight: 32,
    dx: 100, dy: 100,
    dWidth: 64, dHeight: 64, 
    totalFrames: 11, frameWidth: 32
});


var player = new Player({sprite_option: option});
var anim_player = new AnimationPlayer({sprite: player, ctx: ctx});
requestAnimationFrame(anim_player.playAnimation);
