//Importando as classes do jogo
import Camera from './Game/Camera.js';
import Game from './Game/Game.js';
import Scene from './Game/Scene.js';
import Tile from './Game/Tile.js';
import TileManager from './Game/TileManager.js';
import TileMap from './Game/TileMap.js';

//Importando os scripts
import Matrix from './Scripts/JogoMatrix.js';
import Player from './Scripts/Player.js'

//Definindo Variáveis
let tileSize = 100
let game = new Game({backgroundColor: 'blue'});
let SenaPrincipal = new Scene('Game');
let matrix = new Matrix(500, tileSize)
let TilePrincipal = new TileManager(matrix.get(), new Tile(0, 'Images/Tiles/grama.jpg', tileSize), new Tile(1, 'Images/Tiles/sand.png', tileSize), new Tile(2, 'Images/Tiles/water1.jpg', tileSize))

//Configurando o jogo
game.addScene(SenaPrincipal);

SenaPrincipal.addCamera(new Camera('MainCamera', 0, 0, {isLerp:true}));
SenaPrincipal.addGameObject(new TileMap('MapPrincipal', TilePrincipal))
SenaPrincipal.addGameObject(new Player(SenaPrincipal.getCamera()))

//Inicialização do jogo
game.resize({fullSize:true, autoResize:true});
game.init();