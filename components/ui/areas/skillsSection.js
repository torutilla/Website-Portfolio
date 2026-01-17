const techstack = [
    "typescript", "javascript", "dart", "python", "html", 
    "css", "flutter", "react", "tailwind", "nodejs", "expressjs", 
    "godot", "flame", "git", "github", "mysql", "postgresql", 
    "firebase", "googlemapsapi", "vercel", "arduino",
];
export default function Skills(){
    const div = document.createElement('div');
    div.classList.add('skills-ui', 'section');
    const desktopIcons = techstack.map((stack)=> {
        return Icon({name: `${stack}.png`, src: `/assets/ui/icons/${stack}.png`});
    })
    div.append(...desktopIcons);
    return div;
}

function Icon({name, src}){
    const div = document.createElement('div');
    div.classList.add('skills-icon');
    const p = document.createElement('p');
    p.innerHTML = name;
    const img = document.createElement('img');
    img.src = src;
    div.append(img, p);
    return div;
}