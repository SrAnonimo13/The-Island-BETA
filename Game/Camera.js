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
     * @param {Object} [options] - Opções da camera
     * @param {Boolean} [options.isLerp] - Se verdadeira a camera ficara mais suave
     * @param {Number} [options.speed] - Velocidade do Lerp (Suavização da camera) [default:0.1]
     * @param {Boolean} [options.smartScreen] - Permite a camera não visualizar o final do mundo
     */
    constructor(name, x, y, options) {
        super(name, x, y)
        this.options = options
        this.final_x = 0
        this.final_y = 0
        this.target = undefined;
    }

    /**
     * Essa função centraliza a camera em um objeto especifico
     * @param {GameObjet} object - Objeto de referencia
     */
    setTarget(object){
        this.target = object
    }

    /**
     * Essa função muda as posições x e y da camera
     * @param {Number} x - Posição a ser adicionada no eixo x
     * @param {Number} y - Posição a ser adicionada no eixo y
     */
    move(x, y) {
        if(!this.options?.isLerp){
            this.x += x
            this.y += y
        }else{
            this.final_x += x
            this.final_y += y
        }
    }

    /**
     * Essa função e usada para suaviza o movimento da camera
     * @param {Number} ip - A posição atual do objeto
     * @param {Number} fp - A posição vinal do objeto
     * @param {Number} speed - Velocidade da suavização
     * @example
     * this.x = this.lerp(this.x, this.final_x, speed)
     * // > this.x = 0.001..
     * // > this.x = 0.003..
     * // > this.x = ...
     */
    lerp(ip, fp, speed){
        return (1-speed) * ip + speed * fp
    }

    update(){
        // console.log(this.x)
        let x = (((this.width / 2) * -1) + this.target.width / 2) + this.target.x
        let y = (((this.height / 2) * -1) + this.target.height / 2) + this.target.y
        
        if(this.options?.isLerp){
            if(this.target){
                this.final_x = x
                this.final_y = y
            }
            let speed = this.options?.speed || 0.1
            this.x = this.lerp(this.x, this.final_x, speed)
            this.y = this.lerp(this.y, this.final_y, speed)
        }else{
            if(this.target){
                this.x = x
                this.y = y
            }
        }
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
        if(x <= this.x + this.width && this.x <= x + width && y <= this.y + this.height && this.y <= y + height){
            return true
        }
        return false
    }
}