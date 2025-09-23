import Signal from "../signal/signal.js";

class EventBus{
    constructor(){
        /**@type {Object<string, Signal>} */
        this.signals = {};
    }
    /**
     * @param {string} event 
     * @param {Function} callback 
     */
    on(event, callback){
        if(!this.signals[event]) this.signals[event] = new Signal();
        this.signals[event].connect(callback);
    }
    off(event, callback){
        const s = this.signals[event];
        if(s) s.disconnect(callback);
    }
    emit(event, ...args){
        const s = this.signals[event];
        if (s) s.emit(...args);
    }
}

export const GlobalBus = new EventBus();