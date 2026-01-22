export default function Projects(){
    const div = document.createElement('div');
    const desk = document.createElement('img');
    const paper = document.createElement('canvas');


    div.append(desk, paper);
    return div;
}