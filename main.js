import World from "./components/systems/game/world.js";
import Game from "./components/systems/game/game.js";
import Vector2 from "./components/math/vector.js";
import Player from "./components/player.js";
import InputManager from "./components/systems/key_bindings/Input.js";
import { Enemy } from "./components/systems/game/entities/enemy.js";
import ImageLoader from "./components/type/imageLoader.js";
import { player_state } from "./components/playerConst.js";
import { terrainTilemap } from "./components/tilemapConst.js";

InputManager.init();
InputManager.add_action("move_left", ["a", "ArrowLeft"]);
InputManager.add_action("move_right", ["d", "ArrowRight"]);
InputManager.add_action("jump", [" ", "w", "ArrowUp"]);

await ImageLoader.preloadAll([
    player_state.idle.src, 
    player_state.run.src, 
    player_state.jump.src, 
    player_state.fall.src,
    terrainTilemap,
]);

const world = new World('game-canvas', new Vector2(window.innerWidth, window.innerHeight));
const player = new Player();

world.addEntity(player);

await world.init();
const game = new Game(world);
game.start();
