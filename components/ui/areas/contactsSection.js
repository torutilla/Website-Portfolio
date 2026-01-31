
/**@typedef {{icon: string, description: string, onclick?: ()=> void}} ContactInfo */

/**@type {ContactInfo[]} */
const info = [
    {
        icon: "/assets/ui/icons/phone.png",
        description: "+63 969 491 8492",
        onclick: () => {
            window.location.href = "tel:+639694918492";
        }
    },
    {
        icon: "/assets/ui/icons/github.png",
        description: "github.com/torutilla",
        onclick: () => {
            window.open("https://github.com/torutilla", "_blank", "noopener");
        }
    },
    {
        icon: "/assets/ui/icons/envelope.png",
        description: "christiantorres0418@gmail.com",
        onclick: () => {
            window.location.href = "mailto:christiantorres0418@gmail.com";
        }
    },
];

const profile = {
    name: "Christian John R. Torres",
    pic: "/assets/me/IMG_20250414_165942_535.jpg"
}

export default function Contacts(){
    const div = document.createElement('div');
    div.classList.add('contact-container');

    const paper = document.createElement('img');
    paper.src = "/assets/ui/contactpaper.png";
    paper.classList.add('contact-paper');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('contact-content-container');
    
    const profileContainer = document.createElement('div');
    profileContainer.classList.add('flex', 'align-center');
    const name = document.createElement('h3');
    name.innerText = profile.name;
    
    const picContainer = document.createElement('div');
    picContainer.classList.add('profile-pic');
    const pic = document.createElement('img');
    pic.src = profile.pic;
    pic.classList.add('avatar')
    picContainer.appendChild(pic);

    profileContainer.append(picContainer, name);

    const contactInfoContainer = document.createElement('div');
    contactInfoContainer.classList.add('contact-info');
    for(let i of info){
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('flex', 'contact', 'align-center');
        infoContainer.onclick = i.onclick;
        const img = document.createElement('img');
        img.src = i.icon;
        const p = document.createElement('p');
        p.innerText = i.description;
        infoContainer.append(img, p);
        contactInfoContainer.append(infoContainer);
    }

    contentContainer.append(profileContainer, contactInfoContainer)
    div.append(paper, contentContainer);
    
    return div;
}