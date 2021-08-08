import perlin from '../Game/Perlin.js'
let noise = perlin()
/**
 * Matrix do jogo
 */
export default class Matrix{
    constructor(size, tileSize, scale=0.04){
        this.size = size
        this.scale = scale
        this.tileSIze = tileSize
        this.matrix = [...Array(size)].map(e => Array(size).fill(-1));
        this.start()
        noise.seed('123')
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
        if(value < 0.1){
            return 0
        } else if(value < 0.18) {
            return 1
        } else {
            return 2
        }
    }

    /**@private */
    start(){
        
    }

    get(){
        return this.matrix
    }
}

// export default [
//     [0, 1, 0, 1, 0],
//     [1, 0, 1, 0, 1],
//     [0, 1, 0, 1, 0],
//     [1, 0, 1, 0, 1],
//     [0, 1, 0, 1, 0]
// ]