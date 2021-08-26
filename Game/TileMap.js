import Camera from "./Camera.js";
import GameObjet from "./GameObject.js";
import Tile from "./Tile.js";
import TileManager from "./TileManager.js";

/**
 * Objeto utilizado para criação de senários
 */
export default class TileMap extends GameObjet{
    /**
     * Essa classe e utilizada para a criação de imagens do senário
     * @param {String} name - Nome no Objeto
     * @param {...TileManager} tileManagers - Gerenciador de tiles
     */
    constructor(name, ...tileManagers){
        super(name, 0, 0, 0, 0)
        this.managers = tileManagers
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - Contexto de renderização
     * @param {Camera} camera - Camera da sena
     */
    update(ctx, camera){
        this.camera = camera
        this.setSize(camera.width, camera.height)
        this.managers.forEach( manager => {
            manager.x = this.x
            manager.y = this.y
            manager.generate(camera)
            manager.Matrix2dForeach(value => {
                if(value instanceof Tile) {
                    value.update(ctx, camera)
                }
            })

        })
    }
}