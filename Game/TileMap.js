import Camera from "./Camera.js";
import GameObjet from "./GameObject.js";
import TileManager from "./TileManager.js";

/**
 * Objeto utilizado para criação de senários
 */
export default class TileMap extends GameObjet{
    /**
     * Essa classe e utilizada para a criação de imagens do senário
     * @param {String} name - Nome no Objeto
     * @param {TileManager} tileManager - Gerenciador de tiles
     */
    constructor(name, tileManager){
        super(name, 0, 0, 0, 0)
        this.manager = tileManager
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - Contexto de renderização
     * @param {Camera} camera - Camera da sena
     */
    update(ctx, camera){
        this.camera = camera
        this.setSize(camera.width, camera.height)
        this.manager.Matrix2dForeach((value, _i_, _j_, array) => {
            if(camera.isInCamera(value.tx, value.ty, value.width, value.height)){
                camera.moveCamera(0.05, 0.05)
                value.update(ctx, camera)
            }
        })
    }
}