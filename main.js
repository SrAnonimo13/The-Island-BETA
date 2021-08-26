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
let tileSize = 110
let game = new Game({ backgroundColor: 'blue' });
let SenaPrincipal = new Scene('Game');
let camera = new Camera('MainCamera', 0, 0, { isLerp: true })
let matrix = new Matrix(100, tileSize);
let TilePrincipal = new TileManager(matrix.get(), new Tile(0, 'Images/Tiles/grama.jpg', tileSize), new Tile(1, 'Images/Tiles/sand.png', tileSize), new Tile(2, 'Images/Tiles/water1.jpg', tileSize))
let treesMap = new TileManager(matrix.getTree(), new Tile(0, 'Images/Tiles/tree0.png', tileSize), new Tile(1, 'Images/Tiles/tree1.png', tileSize))

//Configurando o jogo
game.addScene(SenaPrincipal);

SenaPrincipal.addCamera(camera);
SenaPrincipal.addGameObject(new TileMap('MapPrincipal', TilePrincipal, treesMap))
SenaPrincipal.addGameObject(new Player(SenaPrincipal.getCamera(), tileSize, SenaPrincipal.getGameObject('MapPrincipal')))

//Inicialização do jogo
game.resize({ fullSize: true, autoResize: true });
game.init();