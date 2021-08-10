/**
 * Classe de criação de imagens
 */
export default class Sprite {
    /**
     * Essa class e usada para criar imagens para objetos (Como o Tile)
     */
    constructor(url){
        this.url = url
        this.image = undefined
    }
    
    /**
     * Essa função retorna a classe sprite com a imagem carregada
     * @returns {Sprite} 
     */
    loadImage(){
        this.image = new Image()
        this.image.src = this.url
        return this
    }

    onLoadImg(fc){
        this.image.onload = () => fc(this.image)
    }
}