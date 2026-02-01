import World from "./components/systems/game/world.js";
import Game from "./components/systems/game/game.js";
import Vector2 from "./components/math/vector.js";
import Player from "./components/player.js";
import InputManager from "./components/systems/key_bindings/Input.js";
import ImageLoader from "./components/type/imageLoader.js";
import { player_state } from "./components/playerConst.js";
import CustomFont from "./components/type/fonts.js";
import checkOrientation from "./orientationChecker.js";
import AudioManager from "./components/audio/audioManager.js";
import HomeScreen from "./components/systems/user_interface/homeScreen.js";
AudioManager.add(
    {   id: "bgm",
        src: "/assets/audio/Littleroot Town.wav", 
        loopPoint: 1.63,
        volume: 0.4,
    },
    {   id: "ui_close",
        src: "/assets/audio/ui-click.mp3",
    },
    {
        id: "ui_confirm",
        src: "/assets/audio/confirm-tap.mp3",
    },
    {
        id: "paperflip",
        src: "/assets/audio/paperflip_1.mp3",
    },
    {
        id: "book_turn",
        src: "/assets/audio/book-turn.mp3",
    },
    {
        id: "windows_xp",
        src: "/assets/audio/windows-xp-login.wav",
    }
);

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

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);
export const world = new World(
    'game-canvas', 
    new Vector2(window.innerWidth, window.innerHeight)
);

await world.init();
const game = new Game(world);
game.start();

const homescreen = new HomeScreen();
homescreen.start();


