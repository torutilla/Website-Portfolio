import Vector2 from "../math/vector.js";
const BASE_WIDTH = 480;
const BASE_HEIGHT = 270;
export function getUIScale() {
    return Math.floor(Math.min(
        window.innerWidth / BASE_WIDTH,
        window.innerHeight / BASE_HEIGHT
    ));
}

export function fitSize(source, maxWidth, maxHeight) {
    const ratio = Math.min(
        maxWidth / source.x,
        maxHeight / source.y
    );

    return new Vector2(
        Math.floor(source.x * ratio),
        Math.floor(source.y * ratio)
    );
}

export function isDesktop() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return !isTouch && window.innerWidth >= 1280;
}
