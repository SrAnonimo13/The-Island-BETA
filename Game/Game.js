import Scene from "./Scene.js"

/**
 * Essa e a classe principal para a criação do jogo
 */
class Game {
    /**
     * @param {Object} [options] - Opções do Game
     * @param {String} [options.backgroundColor] - A cor de fundo do jogo 
     * @param {Boolean} [options.SmoothingEnabled=false]
     */
    constructor(options){
        this.options = options || {}
        this.elem = document.createElement('canvas');
        this.elem.style.backgroundColor = options?.backgroundColor
        this.ctx = this.elem.getContext('2d');
        this.ctx.imageSmoothingEnabled = options?.SmoothingEnabled || false
        this.currentScene = "";
        this.scenes = {};
    }

    /**
     * Essa função e utilizada para a adição de uma sena
     * @param {Scene} scene - Objeto da sena
     */
    addScene(scene){
        this.currentScene = scene.name;
        this.scenes[scene.name] = scene;
    }

    /**
     * @param {Object} options
     * @param {Boolean} [options.autoResize] - Se verdadeiro o canvas mudara de tamanho de se a resolução da tela for alterada
     * @param {Number} [options.width] - Largura da canvas
     * @param {Number} [options.height] - Altura da canvas
     * @param {Boolean} [options.fullSize] - Se verdadeiro ele ira deixar a canvas com o tamanho total da tela
     */
    resize(options){
        if(options?.fullSize){
            this.elem.width = innerWidth;
            this.elem.height = innerHeight;

            if(options?.autoResize){
                window.addEventListener('resize', e => {
                    this.elem.width = innerWidth;
                    this.elem.height = innerHeight;
                })
            }
        } else {
            this.elem.width = options.width;
            this.elem.height = options.height;
        }
    }

    /**
     * Essa função e usada para inicializar o jogo
     */
    init(){
        document.body.style.margin = "0";
        document.body.style.overflow = "hidden";
        document.body.appendChild(this.elem);
        this.update();
    }

    /**
     * Essa função e usada para lupar o jogo
     * @private
     */
    update(){
        let sena = this.scenes[this.currentScene]
        let camera = sena.cameras[sena.currentCamera]
        if(camera){
            this.ctx.clearRect(0, 0, camera.width, camera.height);
            for(let i in this.scenes){
                let scene = this.scenes[i];
                scene.update(this.ctx, this);
            }
            requestAnimationFrame(this.update.bind(this));
        } else {
            throw new Error('Camera não definida, adicione uma camera para a visualização do jogo')
        }
    }

    /**
     * Essa função retorna a sena atual do jogo
     * @param {String} [name] - Retorna a sena com o nome especificado (opcional)
     * @returns {Scene}
     */
    Scene(name){
        if(name){
            if(name in this.scenes){
                var retorno = name;
            }else{
                throw new Error('Essa sena não existe ou não foi adicionada!');
            }
        }

        return this.scenes[retorno || this.currentScene];
    }
}
export default Game