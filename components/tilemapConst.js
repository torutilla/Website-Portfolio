import Rect from "./math/rect.js";
import Vector2 from "./math/vector.js";

export const terrainTilemap = {
    src: '../assets/Terrain/nature-paltformer-tileset-16x16.png',
    size: new Vector2(32, 32),
    rect: new Rect(0, 0, 32, 32),
};

export const backgroundClouds = '../assets/parallax background/Background.png';
export const backgroundTrees = {
    l1: '../assets/parallax background/3.png',
    l2: '../assets/parallax background/2.png',
    l3: '../assets/parallax background/1.png',
}
