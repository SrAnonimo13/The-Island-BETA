import Component from "./Component.js";

/**
 * Esse componente e usado para a criação de um movimento no objeto no qual ele foi adicionado
 */
export default class BasicMovement extends Component {
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
    constructor(name, speed, options) {
        super(name)
        this.speed = speed
        this.options = options
        this.keys = {}

        addEventListener('keydown', e => {
            let newKey = { isPressed: true, value: e.key }
            this.keys[e.key] = newKey
        })

        addEventListener('keyup', e => {
            delete this.keys[e.key]
        })
    }

    IsPressed(key){
        if (this.options.arrowsKeys[key] in this.keys && this.keys[this.options.arrowsKeys[key]].isPressed) {
            return true
        } else return false
    }

    IsMoreKeysPressed(){
        let i = 0
        for(let key in this.options.arrowsKeys){
            if(this.options.arrowsKeys[key].isPressed)
                i++
        }

        if(i > 0) return true; else return false
    }

    update(object) {
        if (this.IsPressed('Up')) {
            object.move(0, this.speed * -1)
        }
        
        if(this.IsPressed('Down')){
            object.move(0, this.speed)
        }

        if(this.IsPressed('Left')){
            object.move(this.speed * -1, 0)
        }

        if(this.IsPressed('Right')){
            object.move(this.speed, 0)
        }
    }
}