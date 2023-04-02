import Component from "./Component.js";
import GameObjet from "./GameObject";
import KeyEvent from "./KeyEvent.js";

/**
 * Esse componente e usado para a criação de um movimento no objeto no qual ele foi adicionado
 */
export default class BasicMovement extends Component {
    speed: number;
    diagonalSpeed: number;
    options: {
        arrowsKeys: {[key: string]: string},
        isLerp: boolean,
        LerpSpeed: number
    };
    keyEvent: KeyEvent;
    direction: string;
    
    /**
     * Esse componente e usado para movimentar um objeto usando as o teclado
     * @param {String} name - Nome do componente
     * @param {Number} speed - Velocidade da camera
     * @param {Object} options - Opções do componente
     * @param {Object} options.arrowsKeys - Indica as teclas para se movimentar
     * @param {Boolean} [options.isLerp] - Se verdadeiro o movimento do objeto sera suave
     * @param {Number} [options.LerpSpeed] - Velocidade do lerp (so funciona se o "isLerp" for "true") 
     */
    constructor(name: string, speed: number, options: {
        arrowsKeys: {[key: string]: string},
        isLerp: boolean,
        LerpSpeed: number
    }) {
        super(name)
        this.speed = speed
        this.diagonalSpeed = Math.sqrt(speed)
        this.options = options
        this.keyEvent = new KeyEvent(options.arrowsKeys)
        this.direction = ''
    }

    /**
     * Essa função e usada para identificar se ouve um movimento diagonal
     * @returns {Boolean}
     */
    IsDiagonal(): boolean {
        return (this.keyEvent.IsPressed('Up') || this.keyEvent.IsPressed('Down')) && (this.keyEvent.IsPressed('Left') || this.keyEvent.IsPressed('Right'))
    }

    update(object: GameObjet) {
        if (this.keyEvent.IsPressed('Up')) {
            if(this.IsDiagonal()){
                object.move(0, this.diagonalSpeed * -1)
            }else{
                object.move(0, this.speed * -1)
            }
        }

        if (this.keyEvent.IsPressed('Down')) {
            if(this.IsDiagonal()){
                object.move(0, this.diagonalSpeed)
            }else{
                object.move(0, this.speed)
            }
        }

        if (this.keyEvent.IsPressed('Left')) {
            object.move(this.speed * -1, 0)
        }

        if (this.keyEvent.IsPressed('Right')) {
            object.move(this.speed, 0)
        }

    }
}