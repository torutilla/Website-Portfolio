import World from "./components/world.js";
import Game from "./components/game.js";
import Vector2 from "./components/math/vector.js";
import Player from "./components/player.js";

const world = new World('canvas', new Vector2(window.innerWidth, window.innerHeight));
const player = new Player();
world.addEntity(player);
console.log(world.entities);
const game = new Game(world);
game.start();


