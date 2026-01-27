import SpriteImage from "../../options/sprite_options.js";
import Vector2 from "../../math/vector.js"
import AnimationPlayer from "../../animation/animation_player.js";
import Sprite from "../../type/sprite.js";
import { uiRenderer } from "../../systems/game/ui_renderer.js";
import BaseArea from "./baseArea.js";

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
// export default function Projects(){
//     const desk = document.createElement('div');
//     desk.classList.add('desk-ui');
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     ctx.imageSmoothingEnabled = false;
//     const canvasContainer = document.createElement('div');
//     canvasContainer.classList.add('desk-content');
    
//     const contentContainer = document.createElement('div');
//     contentContainer.classList.add('desk-content-container');
    
//     let section = SectionCreator({title: "Game Development", content: projects.game});

//     contentContainer.append(...section);
    
//     const baseSize = new Vector2(224, 224);
//     canvas.width = baseSize.x
//     canvas.height = baseSize.y

//     const option = new SpriteImage({
//         imageSource: '/assets/ui/sheet.png',
//         sourceSize: new Vector2(224, 224),
//         destinationSize: baseSize,
//         sx: 0, sy: 0,
//         totalFrames: 1,
//         frameInterval: 60
//     });
//     const sprite = new Sprite(option);
//     const player = new AnimationPlayer(sprite, {loop: false});
    
//     option.image.onload = () => {
//         uiRenderer.addDrawable(()=>{
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             player.draw(ctx, new Vector2(0, 0));
//         })

//         uiRenderer.addUpdatable(()=>{
//             player.update(delta);
//         })
    
//     };
//     canvasContainer.append(canvas, contentContainer);
//     desk.append(canvasContainer);
    
//     return desk;
// }



export default class Projects extends BaseArea{
    constructor() {
        super();
        const baseSize = new Vector2(224, 224);
        const option = new SpriteImage({
            imageSource: '/assets/ui/sheet.png',
            sourceSize: new Vector2(224, 224),
            destinationSize: baseSize,
            sx: 0, sy: 0,
            totalFrames: 1,
            frameInterval: 60
        });
        const sprite = new Sprite(option);
        this.player = new AnimationPlayer(sprite, {loop: false});
        option.image.onload = () => {
            uiRenderer.addDrawable(this)
            uiRenderer.addUpdatable(this)
        };
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = baseSize.x
        this.canvas.height = baseSize.y
    }
    render(){
        const desk = document.createElement('div');
        desk.classList.add('desk-ui');
        
        const canvasContainer = document.createElement('div');
        canvasContainer.classList.add('desk-content');
        
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('desk-content-container');
        
        let section = this.sectionCreator({title: "Game Development", content: projects.game});

        contentContainer.append(...section);
        
        canvasContainer.append(this.canvas, contentContainer);
        desk.append(canvasContainer);
        
        return desk;
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx, new Vector2(0, 0));
    }
    update(delta){
        this.player.update(delta);
    }

    /**@param {{title: string, content: Info[]}}  */
    sectionCreator({title, content}){
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
}