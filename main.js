import World from "./components/systems/game/world.js";
import Game from "./components/systems/game/game.js";
import Vector2 from "./components/math/vector.js";
import Player from "./components/player.js";
import InputManager from "./components/systems/key_bindings/Input.js";
import { Enemy } from "./components/systems/game/entities/enemy.js";

InputManager.init();
InputManager.add_action("move_left", ["a", "ArrowLeft"]);
InputManager.add_action("move_right", ["d", "ArrowRight"]);
InputManager.add_action("jump", [" ", "w", "ArrowUp"]);

const world = new World('game-canvas', new Vector2(window.innerWidth, window.innerHeight));
const player = new Player();
const masked_dude = new Enemy();
world.addEntity(player);
world.addEntity(masked_dude);
await world.init();
const game = new Game(world);
game.start();
