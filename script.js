import World from "./components/systems/game/world.js";
import Game from "./components/systems/game/game.js";
import Vector2 from "./components/math/vector.js";
import Player from "./components/player.js";
import InputManager from "./components/systems/key_bindings/Input.js";
import ImageLoader from "./components/type/imageLoader.js";
import { player_state } from "./components/playerConst.js";
import { backgroundClouds, backgroundTrees, terrainTilemap } from "./components/tilemapConst.js";
import CustomFont from "./components/type/fonts.js";
import checkOrientation from "./orientationChecker.js";
import { npcs } from "./components/npcConst.js";
import { Me } from "./components/systems/game/entities/me.js";

InputManager.init();
InputManager.add_action("move_left", ["a", "ArrowLeft"]);
InputManager.add_action("move_right", ["d", "ArrowRight"]);
InputManager.add_action("jump", [" ", "w", "ArrowUp"]);

await ImageLoader.preloadAll([
    player_state.idle.src, 
    player_state.run.src, 
    player_state.jump.src, 
    player_state.fall.src,
    terrainTilemap.src,
    backgroundClouds,
    npcs.me.idle.src,
    backgroundTrees.l1,
    backgroundTrees.l2,
    backgroundTrees.l3,
    backgroundTrees.l4,
    backgroundTrees.l5,
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

const player = new Player();
const me = new Me();
world.addEntity(player);
world.addEntity(me);
await world.init();
const game = new Game(world);
game.start();
