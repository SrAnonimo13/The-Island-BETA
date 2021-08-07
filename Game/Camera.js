import GameObjet from "./GameObject.js"

/**
 * Essencial para a renderização do jogo
 */
export default class Camera extends GameObjet {
    /**
     * Essa classe e usada para renderizar o jogo
     * @param {String} name - Nome da camera
     * @param {Number} x - Posição x da camera
     * @param {Number} y - Posição y da camera
     */
    constructor(name, x, y) {
        super(name, x, y)
        this.camera_x = 0
        this.camera_y = 0
        this.renderDistance = 1
    }

    /**@private */
    setRenderDistance(render){
        this.renderDistance = render
    }

    /**
     * Essa função muda as posições x e y da camera
     * @param {Number} x - Posição a ser adicionada no eixo x
     * @param {Number} y - Posição a ser adicionada no eixo y
     */
    move(x, y) {
        this.x += x
        this.y += y
    }

    /**
     * Essa função retorna se um GameObject esta no campo de visão da camera
     * @param {Number} x - Posição x do objeto
     * @param {Number} y - Posição y do objeto
     * @param {Number} width - Largura do objeto
     * @param {Number} height - Altura do objeto
     * @returns {Boolean}
     */
    isInCamera(x, y, width, height) {
        let retorno = false
        if(x <= this.x + this.width && this.x <= x + width && y <= this.y + this.height && this.y <= y + height){
            retorno = true
        }
        return retorno
    }
}