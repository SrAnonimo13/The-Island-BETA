import GameObjet from "./GameObject.js";
import Sprite from "./Sprite.js";

export default class Tile extends GameObjet {
    sprite: Sprite;
    columns?: number;
    lines?: number;

    currentFrame: number;
    currentAnimation: number;
    spriteX: number;
    spriteY: number;

    /**
     * Esse objeto e usado para adicionar imagens a sua sena
     * @param {String | Number} name - Nome ou o id do tile
     * @param {String} url - Local aonde a imagens esta localizada
     * @param {Number} size - Tamanho dos tiles
     * @param {HTMLImageElement} [sprite] - Imagem já carregada para poupar processamento
     * @param {Number} [columns]
     * @param {Number} [lines]
     */
    constructor(name: string, size: number, sprite: Sprite, columns?: number, lines?: number) {
        super(name ?? 'TileGenerico', 0, 0, size, size)
        this.columns = columns
        this.lines = lines
        this.sprite = sprite;
        this.currentFrame = this.currentAnimation = 0
        this.spriteX = this.spriteY = 0
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */

    update(ctx: CanvasRenderingContext2D, camera) {
        if (this.columns && this.lines) {
            if(this.spriteX || this.spriteY){
                ctx.drawImage(this.sprite.image, this.spriteX * this.currentAnimation, this.spriteY * this.currentFrame, this.spriteX, this.spriteY, (this.x + camera.x * -1), this.y + camera.y * -1, this.width - 5, this.height)
            }else{
                this.spriteX = this.sprite.image.width / this.columns
                this.spriteY = this.sprite.image.height / this.lines
            }
        } else {
            ctx.drawImage(this.sprite.image, this.x + camera.x * -1, this.y + camera.y * -1, this.width, this.height)
        }
    }

    
}