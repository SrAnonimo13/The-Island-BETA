import BasicMovement from "../Game/BasicMovement.js";
import GameObjet from "../Game/GameObject.js";
import Tile from "../Game/Tile.js";

export default class Player extends GameObjet{
    constructor(camera){
        super('Player', 0, 0)
        this.tile = new Tile('sla', '../Images/Entities/player.png', 80, undefined, 3, 4)
        this.teclas = {Up: 'w', Down:'s', Left:'a', Right:"d"}
        this.camera = camera
        this.BasicMove = new BasicMovement('PlayerMovement', 5, {arrowsKeys: this.teclas})
        this.addComponent(this.BasicMove)
        camera.setTarget(this)
        this.width = this.tile.width
        this.height = this.tile.height
    }

    update(ctx, camera){
        this.tile.setPosition(this.x, this.y)
        this.tile.update(ctx, camera)
    }
}