/**
 * Classe de criação de imagens
 */
export default class Sprite {
    /**
     * Essa class e usada para criar imagens para objetos (Como o Tile)
     */
    constructor(url, width, height){
        this.url = url
        this.width = width
        this.height = height
        this.image = undefined
    }
    
    
    loadImage(){
        this.image = new Image(this.width, this.height)
        this.image.src = this.url
        return this
    }
}