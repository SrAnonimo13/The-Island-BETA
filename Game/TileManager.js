import Tile from "./Tile.js";

export default class TileManager {
    /**
     * Essa classe e usada para criação de grides no cenário
     * @param {Array<Array<Number>>} matrix - Uma Matrix 2d para a criação dos tiles
     * @param  {...Tile} tiles - Tiles
     */
    constructor(matrix, ...tiles) {
        this.matrix = matrix
        this.tiles = tiles
        this.tileMatrix = [...Array(matrix.length)].map(e => Array(matrix[0].length).fill(-1));
        this.x = 0
        this.y = 0
    }

    /**
     * Essa função cria uma matrix 2d de tiles
     */
    generate(camera) {
        this.matrix.forEach((_value_, i) => this.matrix[i].forEach((_value_, j) => {
            this.tiles.every((tile) => {
                if(camera.isInCamera(tile.width * i, tile.height * j, tile.width, tile.height) && this.tileMatrix[i][j] == -1){
                    if (tile.id < 0) throw new Error('So e permitido números acima de 0, id indicado:' + tile.id)
                    if (this.matrix[i][j] == tile.id) {
                        this.tileMatrix[i][j] = new Tile(tile.id, tile.sprite.url, tile.height, tile.sprite.image)
                        this.tileMatrix[i][j].x = (tile.width * i) + this.x
                        this.tileMatrix[i][j].y = (tile.height * j) + this.y
                    }
                    return true
                }else{
                    return false
                }
            })
        }))
    }

    /**
     * @param {MatrixCallback} fc
     * @callback MatrixCallback
     * @param {Tile} value - Valor em tile ou em numero
     * @param {Number} [i] - Index da linha
     * @param {Number} [j] - Index da coluna
     * @param {Array<Array<Tile|Number>>} [array] - Array 2d padrão
     */
    Matrix2dForeach(fc) {
        this.tileMatrix.forEach((__value, i) => __value.forEach((value, j) => fc(value, i, j, this.tileMatrix)))
    }
}