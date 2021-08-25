import Component from "./Component.js";
import KeyEvent from "./KeyEvent.js";
import Tile from "./Tile.js";

export default class Animator extends Component {
    constructor(speed, keys, target, name="Animation"){
        super(name)
        this.target = target
        this.speed = speed
        this.keys = keys
        this.keyEvent = new KeyEvent(keys)
        this.contador = 0
    }

    /**
     * @param {Tile} tile
     */
    update(tile){
        let target = this.target ? this.target : tile
        if(this.keyEvent.IsPressed("Down")){
            target.currentFrame = 0
        }else if(this.keyEvent.IsPressed("Up")){
            target.currentFrame = 1
        }

        if(this.keyEvent.IsPressed("Left")){
            target.currentFrame = 2
        }else if(this.keyEvent.IsPressed("Right")){
            target.currentFrame = 3
        }

        if(this.keyEvent.IsPressed(0)){
            this.contador++
            let value = Math.floor(this.contador / (this.speed * 2))
            if(target.columns <= value) this.contador = 0
            target.currentAnimation = value
        }else{
            this.contador = 0
            target.currentAnimation = 0
        }
    }
}