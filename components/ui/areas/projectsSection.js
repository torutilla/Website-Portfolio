import SpriteImage from "../../options/sprite_options.js";
import Vector2 from "../../math/vector.js"
import AnimationPlayer from "../../animation/animation_player.js";
import Sprite from "../../type/sprite.js";
import { uiRenderer } from "../../systems/game/ui_renderer.js";

/**@typedef {{title: string, stack: string[], description?: string}} Info */

/** @type {{ [key: string]: Info[] }} */
const projects = {
    game: [
        {
            title: "Bow & Arrow Recreation",
            stack: ["Godot Engine"]
        },
        {
            title: "Interactive Resume",
            stack: ["JavaScript", "HTML", "CSS"]
        },
        {
            title: "Action RPG",
            stack: ["Godot Engine"]
        },
    ],
    mobile: [
        {
            title: "Mobile Booking / Taxi App for Trike Vehicle",
            stack: ["Flutter", "Dart", "Firebase", "Google Maps API"]
        },
    ],
    web: [
        {
            title: "Interactive Resume",
            stack: ["JavaScript", "HTML", "CSS"]
        },
        {
            title: "Web Portfolio",
            stack: ["TypeScript", "React", "Tailwind CSS"]
        },
    ],
    graphic:[
        {
            title: "",
            stack: []
        },
    ]
}
export default function Projects(){
    let currentIndex = 0;
    const projectList = [
        {title: "Game Development", content: projects.game}, 
        {title: "Mobile Development", content: projects.mobile}, 
        {title: "Web Development", content: projects.web}, 
        {title: "Graphic Design", content: projects.graphic}, 
    ];
    const desk = document.createElement('div');
    desk.classList.add('desk-ui');

    const lbtn = document.createElement('button');
    const rbtn = document.createElement('button');
    lbtn.dataset.direction= '-1'
    rbtn.dataset.direction = '1'
    lbtn.classList.add('desk-left-btn');
    rbtn.classList.add('desk-right-btn');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('desk-content');
    
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('desk-content-container');
    
    let section = SectionCreator(projectList[currentIndex]);

    contentContainer.append(...section);
    
    const baseSize = new Vector2(224, 224);
    canvas.width = baseSize.x
    canvas.height = baseSize.y

    const option = new SpriteImage({
        imageSource: '/assets/ui/sheet.png',
        sourceSize: new Vector2(224, 224),
        destinationSize: baseSize,
        sx: 0, sy: 0,
        totalFrames: 24,
        frameInterval: 60
    });
    const sprite = new Sprite(option);
    const player = new AnimationPlayer(sprite, {loop: false, autoPlay:false});
    const deskUI = {
        update(dt) {
            player.update(dt);
        },
        draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.draw(ctx, new Vector2(0, 0));
        }
    };
    option.image.onload = () => {
        uiRenderer.addDrawable(deskUI)
        uiRenderer.addUpdatable(deskUI)
    
    };
    canvasContainer.append(canvas);
    player.on('animation_finished', ()=>{
        if (!canvasContainer.contains(contentContainer)) {
        canvasContainer.append(contentContainer);
    }
    })
    canvasContainer.append(contentContainer);
    desk.append(canvasContainer, lbtn, rbtn);

    const handleBtnClick= (e)=>{
        const direction = Number(e.currentTarget.dataset.direction);

        currentIndex =
        (currentIndex + direction + projectList.length) %
        projectList.length;

        canvasContainer.removeChild(contentContainer);

        player.stop();
        player.play();
        updateContent();
    }

    const updateContent = () => {
        contentContainer.replaceChildren(
            ...SectionCreator(projectList[currentIndex])
        );
    };

    lbtn.addEventListener('click', handleBtnClick)
    rbtn.addEventListener('click', handleBtnClick)
    return desk;
}

/**@param {{title: string, content: Info[]}}  */
function SectionCreator({title, content}){
    /**@type {HTMLElement[]} */
    let children = [];
    const holder = document.createElement('div');
    const img = document.createElement('img');
    img.src = "/assets/ui/header.png";
    holder.classList.add('desk-title-container');
    const h1 = document.createElement('h1');
    h1.innerText = "Projects";
    const p = document.createElement('p');
    p.innerText = title;
    holder.append(img, h1, p)

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('project-content-container');
    
    for(let i of content){
        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');
        
        const projectTitle = document.createElement('h3');
        projectTitle.innerText = i.title;

        const stackContainer = document.createElement('div');
        stackContainer.classList.add('tech-stack-container');
        for(let stack of i.stack){
            const p = document.createElement('p');
            p.innerText = stack;
            stackContainer.appendChild(p);
        }
        
        projectContent.appendChild(projectTitle)
        if(i.description){
            const projectDescription = document.createElement('p');
            projectDescription.innerText = i.description;
            projectContent.appendChild(projectDescription);
        }
        projectContent.appendChild(stackContainer)
        contentDiv.appendChild(projectContent);
    }
    children.push(holder, contentDiv);
    
    return children;
}

