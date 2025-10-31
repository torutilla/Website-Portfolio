export default class UserInterfaceController{
    constructor(id){
        this.ui = document.getElementById(id);
    }

    hideMobileHud(id){
        document.getElementById(id).style.display = 'none';
    }
}