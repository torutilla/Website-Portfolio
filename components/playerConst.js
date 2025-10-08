

export const player_state = {
    idle: {
        name: "idle",
        src: './assets/Virtual Guy/Idle (32x32).png',
        totalFrames: 11,
    },
    run: {
        name: "run",
        src: './assets/Virtual Guy/Run (32x32).png',
        totalFrames: 12,
    },
    jump: {
        name: "jump",
        src: './assets/Virtual Guy/Jump (32x32).png',
        totalFrames: 1,
    },
    fall: {
        name: "fall",
        src: './assets/Virtual Guy/Fall (32x32).png',
        totalFrames: 1,
    }
}

export const player_image = {
    idle: new Image(),
    run: new Image(),
    jump: new Image(),
    fall: new Image(),
}

