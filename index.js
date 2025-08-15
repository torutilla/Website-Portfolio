import Player from "./components/player.js";
import Vector2 from "./components/vector.js";
import SpriteOption from "./components/options/sprite_options.js";
import AnimationPlayer from "./components/animation/animation_player.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const imgSize = new Vector2(352, 32);
const spriteSize = new Vector2(32, 32);
const img = new Image();
const player_img_src = './assets/Virtual Guy/Idle (32x32).png';
img.src = player_img_src;
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
    