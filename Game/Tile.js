import GameObjet from "./GameObject.js";
import Sprite from "./Sprite.js";

export default class Tile extends GameObjet {
    /**
     * Esse objeto e usado para adicionar imagens a sua sena
     * @param {String | Number} name - Nome ou o id do tile
     * @param {String} url - Local aonde a imagens esta localizada
     * @param {Number} size - Tamanho dos tiles
     * @param {HTMLImageElement} [image] - Imagem já carregada para poupar processamento
     * @param {number} [columns]
     * @param {number} [lines]
     */
    constructor(name, url, size, image, columns, lines) {
        super('', 0, 0, size, size)
        this.columns = columns
        this.lines = lines
        this.sprite = new Sprite(url)
        if (!image)
            this.sprite.loadImage()
        else
            this.sprite.image = image

        if (typeof name == "string") {
            this.name = name
            this.id = -1
        } else {
            this.name = "Tile genérico"
            this.id = name
        }
        this.url = url
        this.currentFrame = 0
        this.currentAnimation = 0
        this.spriteX = this.sprite.image.width / this.columns
        this.spriteY = this.sprite.image.height / this.lines
        this.magro = 5
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */

    update(ctx, camera) {
        // @ts-ignore
        if(this.sprite.image.loading){
            if (this.columns && this.lines) {
                ctx.drawImage(this.sprite.image, this.spriteX * this.currentAnimation, this.spriteY * this.currentFrame, this.spriteX, this.spriteY, (this.x + camera.x * -1), this.y + camera.y * -1, this.width - this.magro, this.height)
            } else {
                ctx.drawImage(this.sprite.image, this.x + camera.x * -1, this.y + camera.y * -1, this.width, this.height)
            }
        }else {
            console.log('oi')
            this.sprite = this.sprite.loadImage()
        }
    }
}