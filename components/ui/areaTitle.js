export default class AreaTitleHandler{
    constructor(){
        this.textBox = document.getElementById('title-box');
        this.removeTimer = null;
    }
    /**@param {string} text */
    async addTitleText(text, stayMs = 2000){
        if (this.removeTimer) {
            clearTimeout(this.removeTimer);
            this.removeTimer = null;
        }

        await this.removeCurrentChild();    

        const div = document.createElement('div');
        div.id = text;
        const p = document.createElement('p');
        p.innerHTML = text.toUpperCase();
        div.appendChild(p);
        this.textBox.appendChild(div);
        p.classList.add('area-title', 'slide-in');

        p.addEventListener('animationend', ()=>{
            this.removeTimer = setTimeout(()=> this.removeText(text), stayMs);
        })
        
    }
    removeCurrentChild(){
        const current = this.textBox.firstElementChild;
        if(!current) return Promise.resolve();

        return new Promise(resolve =>{
            const p = current.children[0];
            p.classList.add('slide-out');

            p.addEventListener('animationend', () => {
            current.remove();
            resolve();
            }, { once: true });
        });
    }
    
    removeText(text){
        const div = document.getElementById(text);
        if (!div) return;

        if (div === this.textBox.firstElementChild) {
            return this.removeCurrentChild();
        }

        div.remove();
        
    }
}