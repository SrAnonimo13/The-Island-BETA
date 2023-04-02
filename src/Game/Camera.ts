import GameObjet from "./GameObject.js"

/**
 * Essencial para a renderização do jogo
 */
export default class Camera extends GameObjet {
    name: string;
    x: number;
    y: number;
    options?: {
        isLerp?: boolean;
        speed?: number;
    }

    target?: GameObjet;
    private final_x: number;
    private final_y: number;

    /**
     * Essa classe e usada para renderizar o jogo
     * @param {String} name - Nome da camera
     * @param {Number} x - Posição x da camera
     * @param {Number} y - Posição y da camera
     * @param {Object} [options] - Opções da camera
     * @param {Boolean} [options.isLerp] - Se verdadeira a camera ficara mais suave
     * @param {Number} [options.speed] - Velocidade do Lerp (Suavização da camera) [default:0.1]
     */
    constructor(name: string, x: number, y: number, options: { isLerp?: boolean; speed?: number; }) {
        super(name, x, y)
        this.options = options
        this.final_x = 0
        this.final_y = 0
        this.target = null;
    }

    /**
     * Essa função centraliza a camera em um objeto especifico
     * @param {GameObjet} object - Objeto de referencia
     */
    setTarget(object: GameObjet, smoothing: boolean = false) {
        if(smoothing == false)
            this.centerIn(object)
        
        this.target = object
    }

    centerIn(object: { x: number, y: number, width: number, height: number }) {
        this.x = (((this.width / 2) * -1) + object.width / 2) + object.x
        this.y = (((this.height / 2) * -1) + object.height / 2) + object.y
    }

    /**
     * Essa função muda as posições x e y da camera
     * @param {Number} x - Posição a ser adicionada no eixo x
     * @param {Number} y - Posição a ser adicionada no eixo y
     */
    move(x: number, y: number) {
        if (!this.options?.isLerp) {
            this.x += x
            this.y += y
        } else {
            this.final_x += x
            this.final_y += y
        }
    }

    /**
     * Essa função e usada para suaviza o movimento da camera
     * @param {Number} initial - A posição atual do objeto
     * @param {Number} final - A posição vinal do objeto
     * @param {Number} speed - Velocidade da suavização
     * @example
     * this.x = this.lerp(this.x, this.final_x, speed)
     * // > this.x = 0.001..
     * // > this.x = 0.003..
     * // > this.x = ...
     */
    lerp(initial: number, final: number, speed: number) {
        return (1 - speed) * initial + speed * final
    }

    update() {
        let x = this.x;
        let y = this.y;

        if (this.target) {
            x = (((this.width / 2) * -1) + this.target.width / 2) + this.target.x
            y = (((this.height / 2) * -1) + this.target.height / 2) + this.target.y
        }

        if (this.options?.isLerp) {
            this.final_x = x
            this.final_y = y
            let speed = this.options?.speed || 0.1
            this.x = this.lerp(this.x, this.final_x, speed)
            this.y = this.lerp(this.y, this.final_y, speed)
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
    isInCamera(x: number, y: number, width: number, height: number): boolean {
        return (
            x <= this.width + this.x &&
            x + width >= this.x &&
            y <= this.height + this.y &&
            y + height >= this.y
        )
    }
}