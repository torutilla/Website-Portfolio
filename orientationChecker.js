export default function checkOrientation(){
    if(window.innerHeight > window.innerWidth){
        document.getElementById('orientation-blocker').style.display = 'flex';
    }else{
        document.getElementById('orientation-blocker').style.display = 'none';
    }
}