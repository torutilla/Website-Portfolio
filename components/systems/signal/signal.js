export default class Signal{
    constructor(){
        /**@type {Function[]} */
        this.listeners = [];
    }
    /**@param {Function} event  */
    connect(event){
        this.listeners.push(event);
    }
    /**@param {Function} event  */
    disconnect(event){
        this.listeners = this.listeners.filter(fn => fn !== event);
    }
    emit(...args){
        for(let fn of this.listeners){
            fn(...args);
        }
    }
}   