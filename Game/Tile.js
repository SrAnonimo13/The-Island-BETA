import GameObjet from "./GameObject.js";
import Sprite from "./Sprite.js";

export default class Tile extends GameObjet{
    /**
     * Esse objeto e usado para adicionar imagens a sua sena
     * @param {String|Number} name - Nome ou o id do tile
     * @param {String} url - Local aonde a imagens esta localizada
     * @param {Number} size - Tamanho dos tiles
     * @param {HTMLImageElement} [image] - Imagem já carregada para poupar processamento
     */
    constructor(name, url, size, image){
        super('', 0, 0, size, size)
        this.sprite = new Sprite(url, size, size)
        if(!image)
            this.sprite.loadImage()
        else
            this.sprite.image = image

        if(typeof name == "string"){
            this.name = name
            this.id = -1
        } else {
            this.name = "Tile genérico"
            this.id = name
        }
        this.url = url
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */

    update(ctx, camera){
        ctx.drawImage(this.sprite.image, this.x + camera.x * -1, this.y + camera.y * -1, this.width, this.height)
    }
}