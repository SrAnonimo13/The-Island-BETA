/**
 * Matrix do jogo
 */
export default ((size, fundo) => {
    let matrix = [...Array(size)].map(e => Array(size).fill(fundo));
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            matrix[i][j] = Math.floor(Math.random() * 2)
        }
    }
    return matrix
})(50, -1)

// export default [
//     [0, 1, 0, 1, 0],
//     [1, 0, 1, 0, 1],
//     [0, 1, 0, 1, 0],
//     [1, 0, 1, 0, 1],
//     [0, 1, 0, 1, 0]
// ]