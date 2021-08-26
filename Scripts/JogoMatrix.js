import Camera from '../Game/Camera.js'
import perlin from '../Game/Perlin.js'
let noise = perlin()
/**
 * Matrix do jogo
 */
export default class Matrix{
    /**
     * @param {Number} size - máximo do jogo
     * @param {Number} tileSize - tamanho do tile
     * @param {Number} [scale] - escala do perlin 
     */
    constructor(size, tileSize, scale=0.04){
        this.size = size
        this.scale = scale
        this.tileSIze = tileSize
        this.matrix = [...Array(size)].map(e => Array(size).fill(-1));
        this.start()
        noise.seed(123)
        for(let y = 0; y < size; y++){
            for(let x = 0; x < size; x++){
                let id = this.getId(x, y)
                this.matrix[y][x] = id
            }
        }
    }

    /**@private*/
    getId(x, y){
        let value = noise.perlin2(x * this.scale, y * this.scale)
        if(value < 0){
            return 0
        } else if(value < 0.18) {
            return 1
        } else {
            return 2
        }
    }

    /**@private */
    start(){
        for(let y = 0; y < this.size; y++){
            for(let x = 0; x < this.size; x++){
                let id = this.getId(x, y)
                this.matrix[y][x] = id
            }
        }
    }

    getTree(){
        let matrix = [...Array(this.size)].map(e => Array(this.size).fill(-1));
        for(let y = 0; y < this.size; y++){
            for(let x = 0; x < this.size; x++){
                let id = this.getId(x, y)
                matrix[y][x] = !Math.floor(Math.random() * 2) ? id : -1
            }
        }
        return matrix
    }

    get(){
        return this.matrix
    }
}