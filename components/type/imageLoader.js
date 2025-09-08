export default class ImageLoader{
    static images = new Map();

    static load(url){
        if (this.images.has(url)) return this.images.get(url);

        const promise = new Promise((resolve, reject)=>{
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => reject();
        });
        this.images.set(url, promise)
        return promise;
    }
    
    /**@param {string[]} urls  */
    static async preloadAll(urls){
        return await Promise.all(urls.map(url=> this.load(url)));
    }
}