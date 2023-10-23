import { BombedMazeGame } from "./bombeb-maze-game";
import { MazeGame } from "./maze-game";

class Client {
  main() {
    const mazeGame = new MazeGame()
    const maze = mazeGame.createMaze();

    const mazeGameBombed = new BombedMazeGame();
    mazeGameBombed.createMaze();
  }
}