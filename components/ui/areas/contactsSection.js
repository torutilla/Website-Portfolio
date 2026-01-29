
/**@typedef {{icon: string, description: string}} ContactInfo */

/**@type {ContactInfo[]} */
const info = [
    {
        icon: "",
        description: "+63 969 491 8492",
    },
    {
        icon: "",
        description: "github.com/torutilla",
    },
    {
        icon: "",
        description: "christiantorres0418@gmail.com",
    },
]

export default function Contacts(){
    const div = document.createElement('div');
    div.classList.add('contact-container');

    const paper = document.createElement('img');
    paper.src = "/assets/ui/contactpaper.png";
    paper.classList.add('contact-paper');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('contact-content-container');
    
    const name = document.createElement('h3');
    const pic = document.createElement('img');
    
    const contactInfoContainer = document.createElement('div');
    for(let i of info){
        const img = document.createElement('img');
        img.src = i.icon;
        const p = document.createElement('p');
        p.innerText = i.description;
        contactInfoContainer.append(img, p);
    }

    contentContainer.append(name, pic, contactInfoContainer)
    div.append(paper, contentContainer);
    
    return div;
}