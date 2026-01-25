import AnimationPlayer from "../../animation/animation_player.js";
import AudioPlayer from "../../audio/audio_player.js";
import Vector2 from "../../math/vector.js";
import SpriteImage from "../../options/sprite_options.js";
import Sprite from "../../type/sprite.js";


/** 
 * @type {{
 *   education: { name: string; course?: string; date: string }[];
 *   experience: { name: string; position: string; date: string }[];
 * }}
 */
const info = {
    education:[
        {
            name: "City College of Tagaytay",
            details: "BS Information Technology",
            date: "2021 - 2025",
        },
        {
            name: "Francisco P. Tolentino Integrated High School",
            details: "Accountancy, Business Management",
            date: "2018 - 2020",
        },
        {
            name: "Francisco P. Tolentino Integrated High School",
            date: "2018 - 2020",
        },
    ],
    experience:[
        {
            name: "eClerx Philippines",
            details: "Graphic Artist",
            date: "2025",
        },
        {
            name: "GoCrayons Digital Inc.",
            details: "Intern (Game Development & Website Auditing)",
            date: "2025",
        },
    ]
}
const audio = new AudioPlayer('/assets/audio/book-turn.mp3');
export default function Education(){
    audio.play()
    const div = document.createElement('div');
    div.classList.add('education-ui', 'section');
    
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('canvas-book-container')

    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas-book-ui')
    
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    
    const sourceSize = new Vector2(744, 648);
    const baseSize = new Vector2(500, 500);
    
    canvas.width = baseSize.x;
    canvas.height = baseSize.y;
    canvas.style.width = `100%`;
    canvas.style.height = `100%`;

    canvasContainer.appendChild(canvas);
    div.appendChild(canvasContainer);
    
    const option = new SpriteImage({imageSource: "/assets/ui/book.png", 
        sx: 0, sy: 0,
        totalFrames: 11, sourceSize: sourceSize, 
        destinationSize: baseSize, 
        repeat: false, frameInterval: 100, offset: {x: 0, y: 50}})

    const book = new Sprite(option);
    const player = new AnimationPlayer(book, {loop: false,  })
    option.image.onload = () => {
        let lastTime = performance.now();

        function animate(now) {
            const delta = now - lastTime;
            lastTime = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.update(delta);
            player.draw(ctx, new Vector2(0, 0));

            requestAnimationFrame(animate);
        }

        animate(lastTime);
    };

    const content = Content();
    player.on('animation_finished', ()=>{
        canvasContainer.appendChild(content);
    })
    
    return div;
}


function Content(){
    const div = document.createElement('div');
    div.classList.add('canvas-book-content');
    const educ = EducationColumn();
    const exp = ExperienceColumn();
    div.append(exp, educ);
    return div;
}

function ExperienceColumn(){
    return ColumnCreator("Experience", info.experience);
}
function EducationColumn(){
    return ColumnCreator("Education", info.education);
}

function ColumnCreator(sectionTitle, info){
    const div = document.createElement('div');
    const p = document.createElement('h3');
    p.innerText = sectionTitle;

    const sectionContainer = document.createElement('div');
    sectionContainer.classList.add('canvas-book-content-details');
    div.append(p, sectionContainer);
    for(let ex of info){
        const container = document.createElement('div');
        container.classList.add('content-container');
        const n = document.createElement('p');
        n.innerText = ex.name;
        n.classList.add('content-heading');
        
        const d = document.createElement('p');
        d.innerText = ex.date;

        if(ex.details){
            const p = document.createElement('p');
            p.innerText = ex.details;
            container.append(n, p, d);
        }else{
            container.append(n, d);
        }
        sectionContainer.append(container);
    }
    return div;
}