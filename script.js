import World from "./components/systems/game/world.js";
import Game from "./components/systems/game/game.js";
import Vector2 from "./components/math/vector.js";
import Player from "./components/player.js";
import InputManager from "./components/systems/key_bindings/Input.js";
import ImageLoader from "./components/type/imageLoader.js";
import { player_state } from "./components/playerConst.js";
import CustomFont from "./components/type/fonts.js";
import checkOrientation from "./orientationChecker.js";
import AudioPlayer from "./components/audio/audio_player.js";


InputManager.init();
InputManager.add_action("move_left", ["a", "ArrowLeft"]);
InputManager.add_action("move_right", ["d", "ArrowRight"]);
InputManager.add_action("move_up", ["w", "ArrowUp"]);
InputManager.add_action("move_down", ["s", "ArrowDown"]);
InputManager.add_action("interact", ["f"]);

await ImageLoader.preloadAll([
    player_state.idle_down.src, 
    player_state.idle_up.src, 
    player_state.idle_side.src, 
    player_state.walk_side.src,
    player_state.walk_up.src,
    player_state.walk_down.src,
    "/assets/ui/book.png",
    "/assets/ui/exclamation-7x8.png",
]);

await CustomFont.preload([{
        name: "PixelFont",
        link: "/assets/fonts/editundo.ttf",
    },
]);

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

export const world = new World(
    'game-canvas', 
    new Vector2(window.innerWidth, window.innerHeight)
);


const player = new Player();

world.addEntity(player);
await world.init();

const game = new Game(world);
game.start();

const audio = new AudioPlayer("/assets/audio/Littleroot Town.wav", 1.63);
audio.setVolume(0.4);
document.addEventListener('keydown', () => {
    audio.play();
}, { once: true });

const btn = document.getElementById("lobby-music-player")
let active = false;
btn.addEventListener('click', ()=>{
    if(!active){
        AudioPlayer.muteAll()
    }  else {
        AudioPlayer.restoreVolumes();
    }
    active = !active;
})