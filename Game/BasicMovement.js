import Component from "./Component.js";

/**
 * Esse componente e usado para a criação de um movimento no objeto no qual ele foi adicionado
 */
export default class BasicMovement extends Component{
    /**
     * Esse componente e usado para movimentar um objeto usando as o teclado
     * @param {String} name - Nome do componente
     * @param {Number} speed - Velocidade da camera
     * @param {Object} options - Opções do componente
     * @param {Object} options.arrowsKeys - Indica as teclas para se movimentar
     * @param {String} options.arrowsKeys.Up - Movimento para cima
     * @param {String} options.arrowsKeys.Down - Movimento para Baixo
     * @param {String} options.arrowsKeys.Left - Movimento para Esquerda
     * @param {String} options.arrowsKeys.Right - Movimento para Direita
     * @param {Boolean} [options.isLerp] - Se verdadeiro o movimento do objeto sera suave
     * @param {Number} [options.LerpSpeed] - Velocidade do lerp (so funciona se o "isLerp" for "true") 
     */
    constructor(name, speed, options){
        super(name)
        this.speed = speed
        this.options = options
        this.keyboard = {
            isPressed: false,
            key: ''
        }

        addEventListener('keydown', e => {
            this.keyboard.isPressed = true
            this.keyboard.key = e.key
        })

        addEventListener('keyup', e => {
            this.keyboard.isPressed = false
        })
    }

    update(gameObject){
        if(this.keyboard.isPressed){
            
        }
    }
}